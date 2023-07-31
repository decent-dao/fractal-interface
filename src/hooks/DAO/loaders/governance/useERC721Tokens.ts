import { ERC721__factory } from '@fractal-framework/fractal-contracts';
import { useCallback } from 'react';
import { useFractal } from '../../../../providers/App/AppProvider';
import { FractalGovernanceAction } from '../../../../providers/App/governance/action';
import { ERC721TokenData } from '../../../../types';
import useSignerOrProvider from '../../../utils/useSignerOrProvider';

export default function useERC721Tokens() {
  const signerOrProvider = useSignerOrProvider();
  const {
    governanceContracts: { erc721LinearVotingContract },
    action,
  } = useFractal();
  const loadERC721Tokens = useCallback(async () => {
    if (!erc721LinearVotingContract) {
      return;
    }

    const erc721LinearVotingProviderContract = erc721LinearVotingContract.asProvider;
    const addresses = await erc721LinearVotingProviderContract.getAllTokenAddresses();
    const erc721Tokens: ERC721TokenData[] = await Promise.all(
      addresses.map(async address => {
        const tokenContract = ERC721__factory.connect(address, signerOrProvider);
        const votingWeight = await erc721LinearVotingProviderContract.getTokenWeight(address);
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        // TODO - get total supply
        return { name, symbol, address, votingWeight };
      })
    );

    action.dispatch({
      type: FractalGovernanceAction.SET_ERC721_TOKENS_DATA,
      payload: erc721Tokens,
    });
  }, [erc721LinearVotingContract, signerOrProvider, action]);

  return loadERC721Tokens;
}