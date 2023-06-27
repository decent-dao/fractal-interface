import { useMemo } from 'react';
import { useProvider } from 'wagmi';

export const useSubgraphChainName = () => {
  const provider = useProvider();

  const chainName = useMemo(() => {
    if (provider.network.name === 'homestead') {
      return 'mainnet';
    } else {
      return provider.network.name;
    }
  }, [provider]);

  return chainName;
};