import { useContext, useCallback, useEffect, useState, createContext, ReactNode } from 'react';
import useAddressERC721VotingTokens from '../../../../hooks/DAO/proposal/useAddressERC721VotingTokens';
import { useFractal } from '../../../../providers/App/AppProvider';
import {
  FractalProposal,
  SnapshotProposal,
  AzoriusProposal,
  MultisigProposal,
  GovernanceSelectionType,
} from '../../../../types';

interface IVoteContext {
  canVote: boolean;
  hasVoted: boolean;
  getCanVote: (refetchUserTokens?: boolean) => Promise<void>;
  getHasVoted: () => void;
}

export const VoteContext = createContext<IVoteContext>({
  canVote: false,
  hasVoted: false,
  getCanVote: async () => {},
  getHasVoted: () => {},
});

export const useVoteContext = () => {
  const voteContext = useContext(VoteContext);
  return voteContext;
};

export function VoteContextProvider({
  proposal,
  children,
}: {
  proposal: FractalProposal;
  children: ReactNode;
}) {
  const [canVote, setCanVote] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [proposalVotesLength, setProposalVotesLength] = useState(0);
  const {
    readOnly: { user, dao },
    node: { safe },
    governance: { type },
  } = useFractal();
  const { remainingTokenIds, getUserERC721VotingTokens } = useAddressERC721VotingTokens(
    proposal.proposalId,
    user.address
  );
  const isSnapshotProposal = !!(proposal as SnapshotProposal).snapshotProposalId;

  const getHasVoted = useCallback(() => {
    if (dao?.isAzorius) {
      const azoriusProposal = proposal as AzoriusProposal;
      setHasVoted(!!azoriusProposal?.votes.find(vote => vote.voter === user.address));
    } else if (isSnapshotProposal) {
      // Snapshot proposals not tracking votes
      setHasVoted(false);
    } else {
      const safeProposal = proposal as MultisigProposal;
      setHasVoted(
        !!safeProposal.confirmations.find(confirmation => confirmation.owner === user.address)
      );
    }
  }, [dao, isSnapshotProposal, proposal, user.address]);

  const getCanVote = useCallback(
    async (refetchUserTokens?: boolean) => {
      let newCanVote = false;
      if (user.address) {
        if (type === GovernanceSelectionType.AZORIUS_ERC20) {
          newCanVote = user.votingWeight.gt(0) && !hasVoted;
        } else if (type === GovernanceSelectionType.AZORIUS_ERC721) {
          if (refetchUserTokens) {
            await getUserERC721VotingTokens();
          }
          newCanVote = user.votingWeight.gt(0) && remainingTokenIds.length > 0;
        } else if (type === GovernanceSelectionType.MULTISIG) {
          newCanVote = !!safe?.owners.includes(user.address);
        } else {
          newCanVote = false;
        }
      }

      if (canVote !== newCanVote) {
        setCanVote(newCanVote);
      }
    },
    [user, type, hasVoted, safe, canVote, remainingTokenIds, getUserERC721VotingTokens]
  );
  useEffect(() => {
    getCanVote();
    getHasVoted();
  }, [getCanVote, getHasVoted, proposalVotesLength]);

  useEffect(() => {
    const azoriusProposal = proposal as AzoriusProposal;
    if (proposalVotesLength !== azoriusProposal.votes.length) {
      setProposalVotesLength(azoriusProposal.votes.length);
    }
  }, [proposal, proposalVotesLength]);

  return (
    <VoteContext.Provider value={{ canVote, hasVoted, getHasVoted, getCanVote }}>
      {children}
    </VoteContext.Provider>
  );
}