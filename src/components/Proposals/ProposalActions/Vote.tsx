import { Button, Tooltip } from '@chakra-ui/react';
import { CloseX, Check } from '@decent-org/fractal-ui';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCastVote from '../../../hooks/DAO/proposal/useCastVote';
import useCurrentBlockNumber from '../../../hooks/utils/useCurrentBlockNumber';
import { useFractal } from '../../../providers/App/AppProvider';
import {
  FractalProposal,
  AzoriusProposal,
  FractalProposalState,
  AzoriusVoteChoice,
  AzoriusGovernance,
} from '../../../types';

function Vote({
  proposal,
  currentUserHasVoted,
}: {
  proposal: FractalProposal;
  currentUserHasVoted: boolean;
}) {
  const [pending, setPending] = useState<boolean>(false);
  const { t } = useTranslation(['common', 'proposal']);
  const { isLoaded: isCurrentBlockLoaded, currentBlockNumber } = useCurrentBlockNumber();
  const {
    governance,
    readOnly: { user },
  } = useFractal();

  const azoriusGovernance = governance as AzoriusGovernance;
  const azoriusProposal = proposal as AzoriusProposal;

  const castVote = useCastVote({
    proposalId: BigNumber.from(proposal.proposalId),
    setPending: setPending,
  });

  // if the user has no delegated tokens, don't show anything
  if (
    azoriusGovernance.votesToken.votingWeight &&
    azoriusGovernance.votesToken?.votingWeight.eq(0)
  ) {
    return null;
  }

  // If user is lucky enough - he could create a proposal and proceed to vote on it
  // even before the block, in which proposal was created, was mined.
  // This gives a weird behavior when casting vote fails due to requirement under LinearERC20Voting contract that current block number
  // Shouldn't be equal to proposal's start block number. Which is dictated by the need to have voting tokens delegation being "finalized" to prevent proposal hijacking.
  const proposalStartBlockNotFinalized = Boolean(
    isCurrentBlockLoaded && currentBlockNumber && azoriusProposal.startBlock.gte(currentBlockNumber)
  );

  const disabled =
    pending ||
    proposal.state !== FractalProposalState.ACTIVE ||
    !!azoriusProposal.votes.find(vote => vote.voter === user.address) ||
    proposalStartBlockNotFinalized;

  return (
    <Tooltip
      placement="top"
      title={
        proposalStartBlockNotFinalized
          ? t('proposalStartBlockNotFinalized', { ns: 'proposal' })
          : currentUserHasVoted
          ? t('currentUserAlreadyVoted', { ns: 'proposal' })
          : undefined
      }
    >
      <>
        <Button
          width="full"
          isDisabled={disabled}
          onClick={() => castVote(AzoriusVoteChoice.Yes)}
          marginTop={5}
        >
          {t('approve')}
          <Check fill="black" />
        </Button>
        <Button
          marginTop={5}
          width="full"
          isDisabled={disabled}
          onClick={() => castVote(AzoriusVoteChoice.No)}
        >
          {t('reject')}
          <CloseX />
        </Button>
        <Button
          marginTop={5}
          width="full"
          isDisabled={disabled}
          onClick={() => castVote(AzoriusVoteChoice.Abstain)}
        >
          {t('abstain')}
        </Button>
      </>
    </Tooltip>
  );
}

export default Vote;
