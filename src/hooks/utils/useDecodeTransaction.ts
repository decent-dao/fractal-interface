import axios from 'axios';
import { useCallback, useRef } from 'react';
import { useNetworkConfg } from '../../providers/NetworkConfig/NetworkConfigProvider';
import { DecodedTransaction, DecodedTxParam, MetaTransaction } from '../../types';
import { buildGnosisApiUrl, parseMultiSendTransactions } from '../../utils';

export const useDecodeTransaction = () => {
  const { safeBaseURL } = useNetworkConfg();
  const metaDataMapping = useRef<Map<string, DecodedTransaction[]>>(new Map());

  const decodeTransactions = useCallback(
    async (proposalId: string, transactions: MetaTransaction[]) => {
      const apiUrl = buildGnosisApiUrl(safeBaseURL, '/data-decoder/');
      const cachedTransactions = metaDataMapping.current.get(proposalId.toString());

      if (!cachedTransactions) {
        const decodedTransactions = await Promise.all(
          transactions.map(async tx => {
            try {
              if (!tx.data || tx.data.length <= 2) {
                return {
                  target: tx.to,
                  value: tx.value.toString(),
                  function: 'unknown',
                  parameterTypes: [],
                  parameterValues: [],
                  decodingFailed: true,
                };
              }
              const decodedData = (
                await axios.post(apiUrl, {
                  to: tx.to,
                  data: tx.data,
                })
              ).data;

              if (decodedData.parameters && decodedData.method === 'multiSend') {
                const internalTransactionsMap = new Map<number, DecodedTransaction>();
                parseMultiSendTransactions(internalTransactionsMap, decodedData.parameters);
                return [...internalTransactionsMap.values()];
              }
              const transaction: DecodedTransaction = {
                target: tx.to,
                value: tx.value.toString(),
                function: decodedData.method,
                parameterTypes: decodedData.parameters.map((param: DecodedTxParam) => param.type),
                parameterValues: decodedData.parameters.map((param: DecodedTxParam) => param.value),
              };

              return transaction;
            } catch (e) {
              const transaction: DecodedTransaction = {
                target: tx.to,
                value: tx.value.toString(),
                function: 'unknown',
                parameterTypes: [],
                parameterValues: [],
                decodingFailed: true,
              };

              return transaction;
            }
          })
        );
        metaDataMapping.current.set(proposalId.toString(), decodedTransactions.flat());
        return decodedTransactions.flat();
      }

      return cachedTransactions;
    },
    [safeBaseURL]
  );
  return decodeTransactions;
};
