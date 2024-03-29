import { useEffect, useCallback } from 'react';
import { useFractal } from '../../../../providers/App/AppProvider';
import { FractalGovernanceAction } from '../../../../providers/App/governance/action';
import useSafeContracts from '../../../safe/useSafeContracts';
// get list of approvals; approval [0] should be token claim
// query using attach = masterTokenClaim.attach(approval[0]).queryFilter()
// check if module is tokenClaim;
// set token claim;

export function useERC20Claim() {
  const {
    node: { daoAddress },
    governanceContracts: { votesTokenContractAddress },
    action,
  } = useFractal();
  const baseContracts = useSafeContracts();
  const loadTokenClaimContract = useCallback(async () => {
    if (!baseContracts || !votesTokenContractAddress) return;
    const { claimingMasterCopyContract } = baseContracts;
    const votesTokenContract =
      baseContracts.votesTokenMasterCopyContract.asProvider.attach(votesTokenContractAddress);
    const approvalFilter = votesTokenContract.filters.Approval();
    const approvals = await votesTokenContract.queryFilter(approvalFilter);
    if (!approvals.length) return;
    const possibleTokenClaimContract = claimingMasterCopyContract.asProvider.attach(
      approvals[0].args[1],
    );
    const tokenClaimFilter = possibleTokenClaimContract.filters.ERC20ClaimCreated();
    const tokenClaimArray = await possibleTokenClaimContract
      .queryFilter(tokenClaimFilter)
      .catch(() => []);

    if (!tokenClaimArray.length || tokenClaimArray[0].args[1] === votesTokenContractAddress) {
      return;
    }
    // action to governance
    action.dispatch({
      type: FractalGovernanceAction.SET_CLAIMING_CONTRACT,
      payload: possibleTokenClaimContract,
    });
  }, [baseContracts, votesTokenContractAddress, action]);

  useEffect(() => {
    if (daoAddress) {
      loadTokenClaimContract();
    }
  }, [loadTokenClaimContract, daoAddress]);
  return;
}
