import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Azorius, GnosisSafe__factory } from '@fractal-framework/fractal-contracts';
import axios from 'axios';
import { BigNumber, Signer, utils } from 'ethers';
import { getAddress, isAddress } from 'ethers/lib/utils';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useProvider, useSigner } from 'wagmi';
import { ADDRESS_MULTISIG_METADATA } from '../../../constants/common';
import { buildSafeAPIPost, encodeMultiSend } from '../../../helpers';
import { logError } from '../../../helpers/errorLogging';
import { useFractal } from '../../../providers/App/AppProvider';
import useIPFSClient from '../../../providers/App/hooks/useIPFSClient';
import { useNetworkConfig } from '../../../providers/NetworkConfig/NetworkConfigProvider';
import {
  FractalModuleType,
  MetaTransaction,
  ProposalExecuteData,
  GovernanceSelectionType,
  ProposalMetadata,
} from '../../../types';
import { buildSafeApiUrl } from '../../../utils';
import { useFractalModules } from '../loaders/useFractalModules';
import { useDAOProposals } from '../loaders/useProposals';

interface ISubmitProposal {
  proposalData: ProposalExecuteData | undefined;
  nonce: number | undefined;
  pendingToastMessage: string;
  failedToastMessage: string;
  successToastMessage: string;
  successCallback?: (daoAddress: string) => void;
  /**
   * @param safeAddress - provided address of DAO to which proposal will be submitted
   */
  safeAddress?: string;
}

interface ISubmitTokenVotingProposal extends ISubmitProposal {
  /**
   * @param azoriusContract - provided Azorius contract.
   * Depending on safeAddress it's either picked from global context
   * either grabbed from the safe info from Safe API.
   */
  azoriusContract: Azorius;
  /**
   * @param votingStrategyAddress - provided voting strategy address for proposal submission.
   * Depending on safeAddress it's either picked from global context
   * either grabbed from the safe info from Safe API & provided Azorius contract.
   */
  votingStrategyAddress: string;
}

export default function useSubmitProposal() {
  const [pendingCreateTx, setPendingCreateTx] = useState(false);
  const [canUserCreateProposal, setCanUserCreateProposal] = useState(false);
  const loadDAOProposals = useDAOProposals();
  const { data: signer } = useSigner();

  const {
    node: { safe, fractalModules },
    baseContracts: { multiSendContract },
    guardContracts: { freezeVotingContract },
    governanceContracts: { ozLinearVotingContract },
    governance: { type },
    clients: { safeService },
    readOnly: { user },
  } = useFractal();

  const globalAzoriusContract = useMemo(() => {
    if (!signer) {
      return undefined;
    }
    const azoriusModule = fractalModules?.find(
      module => module.moduleType === FractalModuleType.AZORIUS
    );
    if (!azoriusModule) {
      return undefined;
    }
    const moduleContract = azoriusModule.moduleContract as Azorius;
    return moduleContract.connect(signer);
  }, [fractalModules, signer]);

  const lookupModules = useFractalModules();
  const provider = useProvider();
  const signerOrProvider = useMemo(() => signer || provider, [signer, provider]);
  const { chainId, safeBaseURL } = useNetworkConfig();
  const ipfsClient = useIPFSClient();

  useEffect(() => {
    const loadCanUserCreateProposal = async () => {
      if (type === GovernanceSelectionType.MULTISIG) {
        const { owners } = safe || {};
        setCanUserCreateProposal(!!owners?.includes(user.address || ''));
      } else if (type === GovernanceSelectionType.AZORIUS_ERC20) {
        if (ozLinearVotingContract && user.address) {
          setCanUserCreateProposal(await ozLinearVotingContract?.asSigner.isProposer(user.address));
        }
      } else if (type === GovernanceSelectionType.AZORIUS_ERC721) {
        setCanUserCreateProposal(false); // TODO: When ERC721 contract will be available under governanceContracts through useFractal - correctly retrieve it
      } else {
        setCanUserCreateProposal(false);
      }
    };
    loadCanUserCreateProposal();
  }, [safe, type, user, ozLinearVotingContract]);

  const submitMultisigProposal = useCallback(
    async ({
      pendingToastMessage,
      successToastMessage,
      failedToastMessage,
      nonce,
      proposalData,
      successCallback,
      safeAddress,
    }: ISubmitProposal) => {
      if (!proposalData) {
        return;
      }

      const toastId = toast(pendingToastMessage, {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        progress: 1,
      });

      if (!safeAddress || !signerOrProvider || nonce === undefined) {
        toast.dismiss(toastId);
        return;
      }

      setPendingCreateTx(true);
      try {
        if (
          proposalData.metaData.title ||
          proposalData.metaData.description ||
          proposalData.metaData.documentationUrl
        ) {
          const metaData: ProposalMetadata = {
            title: proposalData.metaData.title || '',
            description: proposalData.metaData.description || '',
            documentationUrl: proposalData.metaData.documentationUrl || '',
          };
          const { Hash } = await ipfsClient.add(JSON.stringify(metaData));
          proposalData.targets.push(ADDRESS_MULTISIG_METADATA);
          proposalData.values.push(BigNumber.from('0'));
          proposalData.calldatas.push(new utils.AbiCoder().encode(['string'], [Hash]));
        }

        let to, value, data, operation;
        if (proposalData.targets.length > 1) {
          if (!multiSendContract) {
            toast.dismiss(toastId);
            return;
          }
          // Need to wrap it in Multisend function call
          to = multiSendContract.asSigner.address;

          const tempData = proposalData.targets.map((target, index) => {
            return {
              to: target,
              value: BigNumber.from(proposalData.values[index]),
              data: proposalData.calldatas[index],
              operation: 0,
            } as MetaTransaction;
          });

          data = multiSendContract.asSigner.interface.encodeFunctionData('multiSend', [
            encodeMultiSend(tempData),
          ]);

          operation = 1;
        } else {
          // Single transaction to post
          to = proposalData.targets[0];
          value = BigNumber.from(proposalData.values[0]);
          data = proposalData.calldatas[0];
          operation = 0;
        }

        const safeContract = GnosisSafe__factory.connect(safeAddress, signerOrProvider);
        await axios.post(
          buildSafeApiUrl(safeBaseURL, `/safes/${safeAddress}/multisig-transactions/`),
          await buildSafeAPIPost(
            safeContract,
            signerOrProvider as Signer & TypedDataSigner,
            chainId,
            {
              to,
              value,
              data,
              operation,
              nonce,
            }
          )
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loadDAOProposals();
        if (successCallback) {
          successCallback(safeAddress);
        }
        toast(successToastMessage);
      } catch (e) {
        toast(failedToastMessage);
        logError(e, 'Error during Multi-sig proposal creation');
      } finally {
        toast.dismiss(toastId);
        setPendingCreateTx(false);
        return;
      }
    },
    [signerOrProvider, safeBaseURL, chainId, loadDAOProposals, ipfsClient, multiSendContract]
  );

  const submitTokenVotingProposal = useCallback(
    async ({
      proposalData,
      azoriusContract,
      votingStrategyAddress,
      pendingToastMessage,
      successToastMessage,
      successCallback,
      failedToastMessage,
      safeAddress,
    }: ISubmitTokenVotingProposal) => {
      if (!proposalData) {
        return;
      }
      const toastId = toast(pendingToastMessage, {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        progress: 1,
      });

      setPendingCreateTx(true);
      try {
        const transactions = proposalData.targets.map((target, index) => ({
          to: target,
          value: proposalData.values[index],
          data: proposalData.calldatas[index],
          operation: 0,
        }));

        // @todo: Implement voting strategy proposal selection when/if we will support multiple strategies on single Azorius instance
        await (
          await azoriusContract.submitProposal(
            votingStrategyAddress,
            '0x',
            transactions,
            JSON.stringify({
              title: proposalData.metaData.title,
              description: proposalData.metaData.description,
              documentationUrl: proposalData.metaData.documentationUrl,
            })
          )
        ).wait();
        await loadDAOProposals();
        if (successCallback) {
          successCallback(safeAddress!);
        }
        toast.dismiss(toastId);
        toast(successToastMessage);
      } catch (e) {
        toast.dismiss(toastId);
        toast(failedToastMessage);
        logError(e, 'Error during Azorius proposal creation');
      } finally {
        setPendingCreateTx(false);
      }
    },
    [loadDAOProposals]
  );

  const submitProposal = useCallback(
    async ({
      proposalData,
      nonce,
      pendingToastMessage,
      failedToastMessage,
      successToastMessage,
      successCallback,
      safeAddress,
    }: ISubmitProposal) => {
      if (!proposalData) {
        return;
      }

      if (safeAddress && safeService && isAddress(safeAddress)) {
        // Submitting proposal to any DAO out of global context
        const safeInfo = await safeService.getSafeInfo(getAddress(safeAddress));
        const modules = await lookupModules(safeInfo.modules);
        const azoriusModule = modules.find(
          module => module.moduleType === FractalModuleType.AZORIUS
        );
        if (!azoriusModule) {
          submitMultisigProposal({
            proposalData,
            pendingToastMessage,
            successToastMessage,
            failedToastMessage,
            nonce,
            successCallback,
            safeAddress,
          });
        } else {
          submitTokenVotingProposal({
            proposalData,
            pendingToastMessage,
            successToastMessage,
            failedToastMessage,
            nonce,
            successCallback,
            safeAddress,
            azoriusContract: azoriusModule.moduleContract as Azorius,
            votingStrategyAddress: ozLinearVotingContract?.asSigner.address!,
          });
        }
      } else {
        const votingStrategyAddress =
          ozLinearVotingContract?.asSigner.address || freezeVotingContract?.asSigner.address;

        if (!globalAzoriusContract || !votingStrategyAddress) {
          await submitMultisigProposal({
            proposalData,
            pendingToastMessage,
            successToastMessage,
            failedToastMessage,
            nonce,
            successCallback,
            safeAddress: safe?.address,
          });
        } else {
          await submitTokenVotingProposal({
            proposalData,
            pendingToastMessage,
            successToastMessage,
            failedToastMessage,
            nonce,
            successCallback,
            azoriusContract: globalAzoriusContract,
            votingStrategyAddress: votingStrategyAddress,
            safeAddress: safe?.address,
          });
        }
      }
    },
    [
      globalAzoriusContract,
      freezeVotingContract,
      safe,
      lookupModules,
      submitMultisigProposal,
      ozLinearVotingContract,
      submitTokenVotingProposal,
      safeService,
    ]
  );

  return { submitProposal, pendingCreateTx, canUserCreateProposal };
}
