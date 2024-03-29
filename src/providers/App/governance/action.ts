import { ERC20Claim } from '@fractal-framework/fractal-contracts';
import { BigNumber } from 'ethers';
import {
  FractalProposal,
  ProposalVotesSummary,
  ERC20TokenData,
  FractalProposalState,
  VotesData,
  VotingStrategy,
  UnderlyingTokenData,
  GovernanceType,
  ERC721TokenData,
} from '../../../types';
import { ProposalTemplate } from '../../../types/createProposalTemplate';

export enum FractalGovernanceAction {
  SET_GOVERNANCE_TYPE = 'SET_GOVERNANCE_TYPE',
  SET_PROPOSALS = 'SET_PROPOSALS',
  SET_SNAPSHOT_PROPOSALS = 'SET_SNAPSHOT_PROPOSALS',
  SET_PROPOSAL_TEMPLATES = 'SET_PROPOSAL_TEMPLATES',
  SET_STRATEGY = 'SET_STRATEGY',
  UPDATE_PROPOSALS_NEW = 'UPDATE_PROPOSALS_NEW',
  UPDATE_NEW_AZORIUS_ERC20_VOTE = 'UPDATE_NEW_AZORIUS_ERC20_VOTE',
  UPDATE_NEW_AZORIUS_ERC721_VOTE = 'UPDATE_NEW_AZORIUS_ERC721_VOTE',
  UPDATE_PROPOSAL_STATE = 'UPDATE_PROPOSAL_STATE',
  UPDATE_VOTING_PERIOD = 'UPDATE_VOTING_PERIOD',
  UPDATE_VOTING_QUORUM = 'UPDATE_VOTING_QUORUM',
  UPDATE_VOTING_QUORUM_THRESHOLD = 'UPDATE_VOTING_QUORUM_THRESHOLD',
  UPDATE_TIMELOCK_PERIOD = 'UPDATE_TIMELOCK_PERIOD',
  SET_ERC721_TOKENS_DATA = 'SET_ERC721_TOKENS_DATA',
  SET_TOKEN_DATA = 'SET_TOKEN_DATA',
  SET_TOKEN_ACCOUNT_DATA = 'SET_TOKEN_ACCOUNT_DATA',
  SET_CLAIMING_CONTRACT = 'SET_CLAIMING_CONTRACT',
  RESET_TOKEN_ACCOUNT_DATA = 'RESET_TOKEN_ACCOUNT_DATA',
  SET_UNDERLYING_TOKEN_DATA = 'SET_UNDERLYING_TOKEN_DATA',
}

export enum DecentGovernanceAction {
  RESET_LOCKED_TOKEN_ACCOUNT_DATA = 'RESET_LOCKED_TOKEN_ACCOUNT_DATA',
  SET_LOCKED_TOKEN_ACCOUNT_DATA = 'SET_LOCKED_TOKEN_ACCOUNT_DATA',
}

type AzoriusVotePayload = {
  proposalId: string;
  voter: string;
  support: number;
  votesSummary: ProposalVotesSummary;
};

export type ERC20VotePayload = { weight: BigNumber } & AzoriusVotePayload;
export type ERC721VotePayload = {
  tokenAddresses: string[];
  tokenIds: string[];
} & AzoriusVotePayload;

export type FractalGovernanceActions =
  | { type: FractalGovernanceAction.SET_GOVERNANCE_TYPE; payload: GovernanceType }
  | { type: FractalGovernanceAction.SET_STRATEGY; payload: VotingStrategy }
  | {
      type: FractalGovernanceAction.SET_PROPOSALS;
      payload: FractalProposal[];
    }
  | {
      type: FractalGovernanceAction.SET_SNAPSHOT_PROPOSALS;
      payload: FractalProposal[];
    }
  | { type: FractalGovernanceAction.SET_PROPOSAL_TEMPLATES; payload: ProposalTemplate[] }
  | { type: FractalGovernanceAction.UPDATE_PROPOSALS_NEW; payload: FractalProposal }
  | {
      type: FractalGovernanceAction.UPDATE_NEW_AZORIUS_ERC721_VOTE;
      payload: ERC721VotePayload;
    }
  | {
      type: FractalGovernanceAction.UPDATE_NEW_AZORIUS_ERC20_VOTE;
      payload: ERC20VotePayload;
    }
  | {
      type: FractalGovernanceAction.UPDATE_PROPOSAL_STATE;
      payload: { state: FractalProposalState; proposalId: string };
    }
  | {
      type: FractalGovernanceAction.UPDATE_VOTING_PERIOD;
      payload: BigNumber;
    }
  | {
      type: FractalGovernanceAction.UPDATE_VOTING_QUORUM;
      payload: BigNumber;
    }
  | {
      type: FractalGovernanceAction.UPDATE_VOTING_QUORUM_THRESHOLD;
      payload: BigNumber;
    }
  | {
      type: FractalGovernanceAction.UPDATE_TIMELOCK_PERIOD;
      payload: BigNumber;
    }
  | { type: FractalGovernanceAction.SET_ERC721_TOKENS_DATA; payload: ERC721TokenData[] }
  | {
      type: FractalGovernanceAction.SET_TOKEN_DATA;
      payload: ERC20TokenData;
    }
  | {
      type: FractalGovernanceAction.SET_UNDERLYING_TOKEN_DATA;
      payload: UnderlyingTokenData;
    }
  | {
      type: FractalGovernanceAction.SET_TOKEN_ACCOUNT_DATA;
      payload: VotesData;
    }
  | { type: FractalGovernanceAction.SET_CLAIMING_CONTRACT; payload: ERC20Claim }
  | {
      type: FractalGovernanceAction.RESET_TOKEN_ACCOUNT_DATA;
    }
  | DecentGovernanceActions;

export type DecentGovernanceActions =
  | {
      type: DecentGovernanceAction.SET_LOCKED_TOKEN_ACCOUNT_DATA;
      payload: VotesData;
    }
  | {
      type: DecentGovernanceAction.RESET_LOCKED_TOKEN_ACCOUNT_DATA;
    };
