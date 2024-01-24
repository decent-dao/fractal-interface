import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_SEMI_TRANSPARENT } from '../../../constants/common';
import { DAO_ROUTES } from '../../../constants/routes';
import useSnapshotProposal from '../../../hooks/DAO/loaders/snapshot/useSnapshotProposal';
import { useFractal } from '../../../providers/App/AppProvider';
import { ExtendedSnapshotProposal, FractalProposal, FractalProposalState } from '../../../types';
import ContentBox from '../../ui/containers/ContentBox';
import { ProposalCountdown } from '../../ui/proposal/ProposalCountdown';
import { useVoteContext } from '../ProposalVotes/context/VoteContext';
import CastVote from './CastVote';
import { Execute } from './Execute';

// TODO: Refactor extendedSnapshotProposal and onCastSnapshotVote to the context
export function ProposalActions({
  proposal,
  extendedSnapshotProposal,
  onCastSnapshotVote,
}: {
  proposal: FractalProposal;
  extendedSnapshotProposal?: ExtendedSnapshotProposal;
  onCastSnapshotVote?: () => Promise<void>;
}) {
  switch (proposal.state) {
    case FractalProposalState.ACTIVE:
      return (
        <CastVote
          proposal={proposal}
          extendedSnapshotProposal={extendedSnapshotProposal}
          onCastSnapshotVote={onCastSnapshotVote}
        />
      );
    case FractalProposalState.EXECUTABLE:
    case FractalProposalState.TIMELOCKED:
      return <Execute proposal={proposal} />;
    default:
      return <></>;
  }
}

export function ProposalAction({
  proposal,
  expandedView,
  extendedSnapshotProposal,
  onCastSnapshotVote,
}: {
  proposal: FractalProposal;
  expandedView?: boolean;
  extendedSnapshotProposal?: ExtendedSnapshotProposal;
  onCastSnapshotVote?: () => Promise<void>;
}) {
  const {
    node: { daoAddress },
    readOnly: { user, dao },
  } = useFractal();
  const { t } = useTranslation();
  const { isSnapshotProposal } = useSnapshotProposal(proposal);
  const { canVote } = useVoteContext();

  const isActiveProposal = useMemo(
    () => proposal.state === FractalProposalState.ACTIVE,
    [proposal.state]
  );

  const showActionButton =
    (isSnapshotProposal && canVote && isActiveProposal) ||
    (user.votingWeight.gt(0) &&
      (isActiveProposal ||
        proposal.state === FractalProposalState.EXECUTABLE ||
        proposal.state === FractalProposalState.TIMELOCKABLE ||
        proposal.state === FractalProposalState.TIMELOCKED));

  const labelKey = useMemo(() => {
    switch (proposal.state) {
      case FractalProposalState.ACTIVE:
        return 'vote';
      case FractalProposalState.TIMELOCKABLE:
        return 'timelockTitle';
      case FractalProposalState.EXECUTABLE:
      case FractalProposalState.TIMELOCKED:
        return 'executeTitle';
      default:
        return '';
    }
  }, [proposal]);

  const label = useMemo(() => {
    if (isSnapshotProposal) {
      return t('details');
    }

    if (isActiveProposal) {
      if (!canVote) {
        return t('details');
      }
      return t(dao?.isAzorius ? 'vote' : 'sign');
    }
    return t('details');
  }, [isSnapshotProposal, t, canVote, dao, isActiveProposal]);

  if (!showActionButton) {
    if (!expandedView) {
      return (
        <Button
          as={Link}
          href={DAO_ROUTES.proposal.relative(daoAddress, proposal.proposalId)}
          variant="secondary"
        >
          {t('details')}
        </Button>
      );
    }
    // This means that Proposal in state where there's no action to perform
    return null;
  }

  if (expandedView) {
    if (!isSnapshotProposal && (user.votingWeight.eq(0) || (isActiveProposal && !canVote)))
      return null;

    return (
      <ContentBox containerBoxProps={{ bg: BACKGROUND_SEMI_TRANSPARENT }}>
        <Flex justifyContent="space-between">
          <Text textStyle="text-lg-mono-medium">
            {t(labelKey, {
              ns: isActiveProposal ? 'common' : 'proposal',
            })}
          </Text>
          <ProposalCountdown proposal={proposal} />
        </Flex>
        <ProposalActions
          proposal={proposal}
          extendedSnapshotProposal={extendedSnapshotProposal}
          onCastSnapshotVote={onCastSnapshotVote}
        />
      </ContentBox>
    );
  }

  return (
    <Link
      href={DAO_ROUTES.proposal.relative(daoAddress, proposal.proposalId)}
      passHref
    >
      <Button
        as="a"
        variant={showActionButton && canVote ? 'primary' : 'secondary'}
      >
        {label}
      </Button>
    </Link>
  );
}
