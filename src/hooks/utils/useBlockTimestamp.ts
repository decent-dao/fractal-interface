import { useEffect, useState } from 'react';
import { logError } from '../../helpers/errorLogging';
import { useEthersProvider } from '../../providers/Ethers/hooks/useEthersProvider';

const useBlockTimestamp = (blockNumber?: number) => {
  const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const provider = useEthersProvider();

  useEffect(() => {
    if (!provider || !blockNumber) {
      setTimestamp(Math.floor(Date.now() / 1000));
      return;
    }

    provider
      .getBlock(blockNumber)
      .then(block => {
        if (!block) {
          return;
        }

        setTimestamp(block.timestamp);
      })
      .catch(logError);
  }, [provider, blockNumber]);

  return timestamp;
};

export default useBlockTimestamp;
