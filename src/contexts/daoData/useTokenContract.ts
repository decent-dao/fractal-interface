import { useState, useEffect } from 'react';
import {
  VotesTokenWithSupply,
  VotesTokenWithSupply__factory,
} from '../../assets/typechain-types/votes-token';
import { GovernorModule } from '../../assets/typechain-types/module-governor';
import { useWeb3Provider } from '../web3Data/hooks/useWeb3Provider';

const useTokenContract = (governorModule: GovernorModule | undefined) => {
  const [tokenContract, setTokenContract] = useState<VotesTokenWithSupply>();
  const {
    state: { signerOrProvider },
  } = useWeb3Provider();

  useEffect(() => {
    if (!governorModule || !signerOrProvider) {
      setTokenContract(undefined);
      return;
    }

    governorModule
      .token()
      .then(tokenAddress =>
        setTokenContract(VotesTokenWithSupply__factory.connect(tokenAddress, signerOrProvider))
      )
      .catch(console.error);
  }, [governorModule, signerOrProvider]);

  return tokenContract;
};

export default useTokenContract;
