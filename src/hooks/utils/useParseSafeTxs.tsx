import {
  SafeMultisigTransactionWithTransfersResponse,
  EthereumTxWithTransfersResponse,
  AllTransactionsListResponse,
  SafeInfoResponse,
} from '@gnosis.pm/safe-service-client';
import { format } from 'date-fns';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { ActivityEventType, TxProposalState, Activity } from '../../providers/Fractal/types';
import { totalsReducer } from '../../providers/Fractal/utils';
import { formatWeiToValue } from '../../utils';
import { DEFAULT_DATE_FORMAT } from '../../utils/numberFormats';

export function useParseSafeTxs(
  transactions: AllTransactionsListResponse,
  safe: Partial<SafeInfoResponse>
) {
  const parsedActivities = useMemo(() => {
    if (!transactions.results.length) {
      return [];
    }

    return transactions.results.map((transaction, _, transactionArr) => {
      const isMultiSigTransaction = transaction.txType === 'MULTISIG_TRANSACTION';
      const multiSigTransaction = transaction as SafeMultisigTransactionWithTransfersResponse;
      const ethereumTransaction = transaction as EthereumTxWithTransfersResponse;

      // @note for ethereum transactions event these are the execution date
      const eventDate = format(
        new Date(multiSigTransaction.submissionDate || ethereumTransaction.executionDate),
        DEFAULT_DATE_FORMAT
      );

      // @note it can be assumed that if there is no transfers it a receiving event
      const isDeposit = transaction.transfers.length
        ? transaction.transfers.every(t => t.to.toLowerCase() === safe.address!.toLowerCase())
        : false;

      // returns mapping of Asset -> Asset Total Value by getting the total of each asset transfered
      const transferAmountTotalsMap = transaction.transfers.reduce(totalsReducer, new Map());

      // formats totals array into readable string with Symbol ie 1 ETHER
      const transferAmountTotals = Array.from(transferAmountTotalsMap.values()).map(token => {
        const totalAmount = formatWeiToValue(token.bn, token.decimals);
        const symbol = token.symbol;
        return `${totalAmount} ${symbol}`;
      });

      // maps address for each transfer
      const transferAddresses = transaction.transfers.map(transfer =>
        transfer.to.toLowerCase() === safe.address!.toLowerCase() ? transfer.from : transfer.to
      );

      // @note this indentifies transaction a simple ETH transfer
      const isEthSend =
        isMultiSigTransaction &&
        !multiSigTransaction.data &&
        !multiSigTransaction.isExecuted &&
        !BigNumber.from(multiSigTransaction.value).isZero();

      if (isEthSend) {
        transferAmountTotals.push(`${formatWeiToValue(multiSigTransaction.value, 18)} ETHER`);
        transferAddresses.push(multiSigTransaction.to);
      }

      const mappedTxHashes = transaction.transfers.map(transfer => transfer.transactionHash);

      const txHashes =
        isMultiSigTransaction && mappedTxHashes.length
          ? mappedTxHashes
          : isMultiSigTransaction
          ? [multiSigTransaction.transactionHash]
          : mappedTxHashes.length
          ? mappedTxHashes
          : [ethereumTransaction.txHash];

      const eventSafeTxHash = multiSigTransaction.safeTxHash;

      const eventType = isMultiSigTransaction
        ? ActivityEventType.Governance
        : ActivityEventType.Treasury;

      const eventNonce = multiSigTransaction.nonce;

      // @note identifies transactions with same nonce. this can be used to identify rejected transactions
      const noncePair = transactionArr.find(tx => {
        const multiSigTx = tx as SafeMultisigTransactionWithTransfersResponse;
        return (
          multiSigTx.nonce === eventNonce &&
          multiSigTx.safeTxHash !== multiSigTransaction.safeTxHash
        );
      });

      const isMultisigRejectionTx =
        isMultiSigTransaction &&
        !multiSigTransaction.data &&
        multiSigTransaction.to === multiSigTransaction.safe &&
        noncePair &&
        BigNumber.from(multiSigTransaction.value).isZero();

      const isRejected =
        isMultiSigTransaction &&
        transactionArr.find(tx => {
          const multiSigTx = tx as SafeMultisigTransactionWithTransfersResponse;
          return (
            multiSigTx.nonce === eventNonce &&
            multiSigTx.safeTxHash !== multiSigTransaction.safeTxHash &&
            multiSigTx.isExecuted
          );
        });

      const isPending =
        multiSigTransaction.confirmations?.length !== multiSigTransaction.confirmationsRequired;

      const state = isRejected
        ? TxProposalState.Rejected
        : isPending
        ? TxProposalState.Pending
        : !multiSigTransaction.isExecuted
        ? TxProposalState.Active
        : multiSigTransaction.isSuccessful && multiSigTransaction.isExecuted
        ? TxProposalState.Executed
        : TxProposalState.Pending;

      const activity: Activity = {
        transaction,
        transferAddresses,
        transferAmountTotals,
        isDeposit,
        eventDate,
        eventType,
        multisigRejectedProposalNumber:
          isMultisigRejectionTx && !!noncePair
            ? (noncePair as SafeMultisigTransactionWithTransfersResponse).safeTxHash
            : undefined,
        proposalNumber: eventSafeTxHash,
        targets: [transaction.to],
        txHashes,
        state,
      };
      return activity;
    });
  }, [safe.address, transactions]);

  return parsedActivities;
}
