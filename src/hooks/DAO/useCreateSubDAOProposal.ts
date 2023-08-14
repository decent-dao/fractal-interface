import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFractal } from '../../providers/App/AppProvider';
import { SafeMultisigDAO, AzoriusGovernance, AzoriusERC20DAO, AzoriusERC721DAO } from '../../types';
import { ProposalExecuteData } from '../../types/daoProposal';
import useSubmitProposal from './proposal/useSubmitProposal';
import useBuildDAOTx from './useBuildDAOTx';

export const useCreateSubDAOProposal = () => {
  const {
    baseContracts: { multiSendContract, fractalRegistryContract },
  } = useFractal();
  const { t } = useTranslation(['daoCreate', 'proposal', 'proposalMetadata']);

  const { submitProposal, pendingCreateTx, canUserCreateProposal } = useSubmitProposal();
  const [build] = useBuildDAOTx();
  const {
    node: { daoAddress },
    governance,
  } = useFractal();
  const azoriusGovernance = governance as AzoriusGovernance;
  const proposeDao = useCallback(
    (
      daoData: AzoriusERC20DAO | AzoriusERC721DAO | SafeMultisigDAO,
      nonce: number | undefined,
      successCallback: (daoAddress: string) => void
    ) => {
      const propose = async () => {
        if (!multiSendContract || !fractalRegistryContract || !daoAddress) {
          return;
        }

        const builtSafeTx = await build(daoData, daoAddress, azoriusGovernance.votesToken?.address);
        if (!builtSafeTx) {
          return;
        }

        const { safeTx, predictedSafeAddress } = builtSafeTx;

        const proposalData: ProposalExecuteData = {
          targets: [multiSendContract.asSigner.address, fractalRegistryContract.asSigner.address],
          values: [BigNumber.from('0'), BigNumber.from('0')],
          calldatas: [
            multiSendContract.asSigner.interface.encodeFunctionData('multiSend', [safeTx]),
            fractalRegistryContract.asSigner.interface.encodeFunctionData('declareSubDAO', [
              predictedSafeAddress,
            ]),
          ],
          metaData: {
            title: t('Create a sub-Safe', { ns: 'proposalMetadata' }),
            description: '',
            documentationUrl: '',
          },
        };
        submitProposal({
          proposalData,
          nonce,
          pendingToastMessage: t('createSubDAOPendingToastMessage'),
          successToastMessage: t('proposalCreateSuccessToastMessage', { ns: 'proposal' }),
          failedToastMessage: t('proposalCreateFailureToastMessage', { ns: 'proposal' }),
          successCallback,
        });
      };
      propose();
    },
    [
      multiSendContract,
      fractalRegistryContract,
      build,
      daoAddress,
      submitProposal,
      azoriusGovernance,
      t,
    ]
  );

  return { proposeDao, pendingCreateTx, canUserCreateProposal } as const;
};
