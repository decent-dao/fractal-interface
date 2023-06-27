import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDAOProposals } from '../../../../../../hooks/DAO/loaders/useProposals';
import useSubmitProposal from '../../../../../../hooks/DAO/proposal/useSubmitProposal';
import { useFractal } from '../../../../../../providers/App/AppProvider';
import { ProposalExecuteData } from '../../../../../../types';

const useRemoveSigner = ({
  prevSigner,
  signerToRemove,
  threshold,
  nonce,
  daoAddress,
}: {
  prevSigner: string;
  signerToRemove: string;
  threshold: number;
  nonce: number | undefined;
  daoAddress: string | null;
}) => {
  const { submitProposal } = useSubmitProposal();
  const { t } = useTranslation(['modals']);
  const loadDAOProposals = useDAOProposals();
  const {
    baseContracts: { gnosisSafeSingletonContract },
  } = useFractal();

  const removeSigner = useCallback(async () => {
    const description = 'Remove Signers';

    const calldatas = [
      gnosisSafeSingletonContract.asSigner.interface.encodeFunctionData('removeOwner', [
        prevSigner,
        signerToRemove,
        BigNumber.from(threshold),
      ]),
    ];

    const proposalData: ProposalExecuteData = {
      targets: [daoAddress!],
      values: [BigNumber.from('0')],
      calldatas: calldatas,
      title: 'Remove Signers',
      description: description,
      documentationUrl: '',
    };

    await submitProposal({
      proposalData,
      successCallback: () => {
        loadDAOProposals();
      },
      nonce,
      pendingToastMessage: t('removeSignerPendingToastMessage'),
      successToastMessage: t('removeSignerSuccessToastMessage'),
      failedToastMessage: t('removeSignerFailureToastMessage'),
      safeAddress: daoAddress!,
    });
  }, [
    gnosisSafeSingletonContract.asSigner.interface,
    prevSigner,
    signerToRemove,
    threshold,
    daoAddress,
    submitProposal,
    nonce,
    t,
    loadDAOProposals,
  ]);

  return removeSigner;
};

export default useRemoveSigner;