import { useCallback } from 'react';
import { TxBuilderFactory } from '../../models/TxBuilderFactory';
import { useFractal } from '../../providers/App/AppProvider';
import { useNetworkConfig } from '../../providers/NetworkConfig/NetworkConfigProvider';
import {
  SafeMultisigDAO,
  GovernanceType,
  AzoriusContracts,
  BaseContracts,
  AzoriusERC20DAO,
  AzoriusERC721DAO,
  AzoriusGovernance,
  VotingStrategyType,
} from '../../types';
import useSignerOrProvider from '../utils/useSignerOrProvider';

const useBuildDAOTx = () => {
  const signerOrProvider = useSignerOrProvider();
  const {
    createOptions,
    contracts: { fallbackHandler },
  } = useNetworkConfig();

  const {
    baseContracts,
    readOnly: { user, dao },
    governance,
    governanceContracts: { erc721LinearVotingContractAddress },
  } = useFractal();

  const buildDao = useCallback(
    async (
      daoData: AzoriusERC20DAO | AzoriusERC721DAO | SafeMultisigDAO,
      parentAddress?: string,
      parentTokenAddress?: string,
    ) => {
      let azoriusContracts;

      if (!user.address || !signerOrProvider || !baseContracts) {
        return;
      }
      const {
        multiSendContract,
        safeFactoryContract,
        safeSingletonContract,
        linearVotingMasterCopyContract,
        linearVotingERC721MasterCopyContract,
        fractalAzoriusMasterCopyContract,
        zodiacModuleProxyFactoryContract,
        fractalRegistryContract,
        fractalModuleMasterCopyContract,
        multisigFreezeGuardMasterCopyContract,
        azoriusFreezeGuardMasterCopyContract,
        freezeMultisigVotingMasterCopyContract,
        freezeERC20VotingMasterCopyContract,
        freezeERC721VotingMasterCopyContract,
        votesTokenMasterCopyContract,
        claimingMasterCopyContract,
        votesERC20WrapperMasterCopyContract,
        keyValuePairsContract,
      } = baseContracts;

      if (
        createOptions.includes(GovernanceType.AZORIUS_ERC721) &&
        (!freezeERC721VotingMasterCopyContract || !linearVotingERC721MasterCopyContract)
      ) {
        return;
      }
      if (
        daoData.governance === GovernanceType.AZORIUS_ERC20 ||
        daoData.governance === GovernanceType.AZORIUS_ERC721
      ) {
        if (
          !fractalAzoriusMasterCopyContract ||
          !linearVotingMasterCopyContract ||
          !votesTokenMasterCopyContract ||
          !azoriusFreezeGuardMasterCopyContract ||
          !claimingMasterCopyContract
        ) {
          return;
        }

        azoriusContracts = {
          fractalAzoriusMasterCopyContract: fractalAzoriusMasterCopyContract.asSigner,
          linearVotingMasterCopyContract: linearVotingMasterCopyContract.asSigner,
          linearVotingERC721MasterCopyContract: linearVotingERC721MasterCopyContract.asSigner,
          azoriusFreezeGuardMasterCopyContract: azoriusFreezeGuardMasterCopyContract.asSigner,
          votesTokenMasterCopyContract: votesTokenMasterCopyContract.asSigner,
          claimingMasterCopyContract: claimingMasterCopyContract.asSigner,
          votesERC20WrapperMasterCopyContract: votesERC20WrapperMasterCopyContract.asSigner,
        } as AzoriusContracts;
      }

      const buildrerBaseContracts = {
        fractalModuleMasterCopyContract: fractalModuleMasterCopyContract.asSigner,
        fractalRegistryContract: fractalRegistryContract.asSigner,
        safeFactoryContract: safeFactoryContract.asSigner,
        safeSingletonContract: safeSingletonContract.asSigner,
        multisigFreezeGuardMasterCopyContract: multisigFreezeGuardMasterCopyContract.asSigner,
        multiSendContract: multiSendContract.asSigner,
        freezeERC20VotingMasterCopyContract: freezeERC20VotingMasterCopyContract.asSigner,
        freezeERC721VotingMasterCopyContract: freezeERC721VotingMasterCopyContract.asSigner,
        freezeMultisigVotingMasterCopyContract: freezeMultisigVotingMasterCopyContract.asSigner,
        zodiacModuleProxyFactoryContract: zodiacModuleProxyFactoryContract.asSigner,
        keyValuePairsContract: keyValuePairsContract.asSigner,
      } as BaseContracts;

      const txBuilderFactory = new TxBuilderFactory(
        signerOrProvider,
        buildrerBaseContracts,
        azoriusContracts,
        daoData,
        fallbackHandler,
        parentAddress,
        parentTokenAddress,
      );

      await txBuilderFactory.setupSafeData();
      let parentVotingStrategyType = undefined;
      let parentVotingStrategyAddress = undefined;

      if (dao && dao.isAzorius) {
        const azoriusGovernance = governance as AzoriusGovernance;
        parentVotingStrategyType = azoriusGovernance.votingStrategy.strategyType;
        if (
          parentVotingStrategyType === VotingStrategyType.LINEAR_ERC721 &&
          erc721LinearVotingContractAddress
        ) {
          parentVotingStrategyAddress = erc721LinearVotingContractAddress;
        }
      }

      const daoTxBuilder = txBuilderFactory.createDaoTxBuilder(
        parentVotingStrategyType,
        parentVotingStrategyAddress,
      );

      // Build Tx bundle based on governance type (Azorius or Multisig)
      const safeTx =
        daoData.governance === GovernanceType.AZORIUS_ERC20 ||
        daoData.governance === GovernanceType.AZORIUS_ERC721
          ? await daoTxBuilder.buildAzoriusTx()
          : await daoTxBuilder.buildMultisigTx();

      return {
        predictedSafeAddress: txBuilderFactory.predictedSafeAddress!,
        createSafeTx: txBuilderFactory.createSafeTx!,
        safeTx,
      };
    },
    [
      user.address,
      signerOrProvider,
      baseContracts,
      erc721LinearVotingContractAddress,
      dao,
      governance,
      createOptions,
      fallbackHandler,
    ],
  );

  return [buildDao] as const;
};

export default useBuildDAOTx;
