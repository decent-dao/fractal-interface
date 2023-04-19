import { GridItem } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import { ProposalAction } from '../../../components/Proposals/ProposalActions/ProposalAction';
import ProposalSummary from '../../../components/Proposals/ProposalSummary';
import ProposalVotes from '../../../components/Proposals/ProposalVotes';
import { BACKGROUND_SEMI_TRANSPARENT } from '../../../constants/common';
import useUpdateProposalState from '../../../hooks/DAO/proposal/useUpdateProposalState';
import { useFractal } from '../../../providers/App/AppProvider';
import { useNetworkConfg } from '../../../providers/NetworkConfig/NetworkConfigProvider';
import { UsulProposal, FractalProposalState, AzoriusGovernance } from '../../../types';
import ContentBox from '../../ui/containers/ContentBox';
import { ProposalDetailsGrid } from '../../ui/containers/ProposalDetailsGrid';
import { ProposalInfo } from '../ProposalInfo';

export function UsulProposalDetails({ proposal }: { proposal: UsulProposal }) {
  const [activeTimeout, setActiveTimeout] = useState<NodeJS.Timeout>();
  const {
    governance,
    governanceContracts,
    action,
    readOnly: { user },
  } = useFractal();
  const { chainId } = useNetworkConfg();
  const updateProposalState = useUpdateProposalState({
    governanceContracts,
    chainId,
    governanceDispatch: action.dispatch,
  });

  const azoriusGovernance = governance as AzoriusGovernance;

  useEffect(() => {
    const timeLockPeriod = azoriusGovernance.votesStrategy?.timeLockPeriod;
    if (!timeLockPeriod) {
      return;
    }
    let timeout = 0;
    const now = new Date();
    if (proposal.state === FractalProposalState.Active) {
      timeout = proposal.deadline * 1000 - now.getTime();
    } else if (proposal.state === FractalProposalState.TimeLocked) {
      const timeLockNumber = timeLockPeriod?.value?.toNumber();
      timeout =
        new Date((proposal.deadline + Number(timeLockNumber)) * 1000).getTime() - now.getTime();
    }

    // Prevent setting too large timer
    if (timeout > 0 && timeout < 86400) {
      setActiveTimeout(
        setTimeout(
          () => updateProposalState(BigNumber.from(proposal.proposalNumber)),
          timeout + 60000 // add extra 60 seconds to ensure that we woulnd't encounter issue while trying to update status in same minute as it supposed to change
        )
      );
    }

    return () => {
      clearTimeout(activeTimeout);
    };
    // eslint-disable-next-line
  }, [
    proposal.state,
    proposal.proposalNumber,
    proposal.deadline,
    updateProposalState,
  ]);

  return (
    <ProposalDetailsGrid>
      <GridItem colSpan={2}>
        <ContentBox bg={BACKGROUND_SEMI_TRANSPARENT}>
          <ProposalInfo proposal={proposal} />
        </ContentBox>
        <ProposalVotes proposal={proposal} />
      </GridItem>
      <GridItem>
        <ProposalSummary proposal={proposal} />
        {user.address && (
          <ProposalAction
            proposal={proposal}
            expandedView
          />
        )}
      </GridItem>
    </ProposalDetailsGrid>
  );
}
