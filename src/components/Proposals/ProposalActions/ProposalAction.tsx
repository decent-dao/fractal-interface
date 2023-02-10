import { Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useFractal } from '../../../providers/Fractal/hooks/useFractal';
import {
  MultisigProposal,
  TxProposal,
  TxProposalState,
  UsulProposal,
} from '../../../providers/Fractal/types';
import { DAO_ROUTES } from '../../../routes/constants';
import { Execute } from './Execute';
import Queue from './Queue';
import CastVote from './Vote';

export function ProposalAction({
  proposal,
  expandedView,
}: {
  proposal: TxProposal;
  expandedView?: boolean;
}) {
  const {
    gnosis: { safe },
  } = useFractal();
  const { address: account } = useAccount();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isUsulProposal = !!(proposal as UsulProposal).govTokenAddress;

  const canExecuteAction =
    proposal.state === TxProposalState.Active ||
    proposal.state === TxProposalState.Executing ||
    proposal.state === TxProposalState.Queueable;

  const handleClick = () => {
    navigate(DAO_ROUTES.proposal.relative(safe.address, proposal.proposalNumber));
  };

  const hasVoted = useMemo(() => {
    if (isUsulProposal) {
      const usulProposal = proposal as UsulProposal;
      return !!usulProposal.votes.find(vote => vote.voter === account);
    } else {
      const safeProposal = proposal as MultisigProposal;
      return !!safeProposal.confirmations.find(confirmation => confirmation.owner === account);
    }
  }, [account, isUsulProposal, proposal]);

  const label = useMemo(() => {
    if (proposal.state === TxProposalState.Active) {
      if (hasVoted) {
        return t('details');
      }
      return t(isUsulProposal ? 'vote' : 'sign');
    }
    return t('details');
  }, [proposal, t, isUsulProposal, hasVoted]);

  if (!canExecuteAction) {
    if (!expandedView) {
      return (
        <Button
          variant="secondary"
          onClick={handleClick}
        >
          {t('details')}
        </Button>
      );
    }
    // This means that Proposal in state where there's no action to perform
    return null;
  }

  if (expandedView) {
    switch (proposal.state) {
      case TxProposalState.Active:
        return <CastVote proposal={proposal} />;
      case TxProposalState.Queueable:
        return <Queue proposal={proposal} />;
      case TxProposalState.Executing:
      case TxProposalState.TimeLocked:
        return <Execute proposal={proposal} />;
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={canExecuteAction && !hasVoted ? 'primary' : 'secondary'}
    >
      {label}
    </Button>
  );
}
