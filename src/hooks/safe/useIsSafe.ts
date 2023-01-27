import { isAddress } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import useSafeContracts from './useSafeContracts';

/**
 * A hook which determines whether the provided Ethereum address is a Gnosis
 * Safe smart contract address on the currently connected chain (chainId).
 *
 * The state can be either true/false or undefined, if a network call is currently
 * being performed to determine that status.
 *
 * @param address the address to check
 * @returns isSafe: whether the address is a Safe,
 *  isSafeLoading: true/false whether the isSafe status is still being determined
 */
export const useIsGnosisSafe = (address: string | undefined) => {
  const [isSafeLoading, setSafeLoading] = useState<boolean>(false);
  const [isSafe, setIsSafe] = useState<boolean | undefined>();
  const { gnosisSafeSingletonContract } = useSafeContracts();
  useEffect(() => {
    setSafeLoading(true);
    setIsSafe(undefined);

    if (!address || !isAddress(address) || !gnosisSafeSingletonContract) {
      setIsSafe(false);
      setSafeLoading(false);
      return;
    }

    gnosisSafeSingletonContract.asSigner
      .attach(address)
      .getThreshold()
      .then(() => setIsSafe(true))
      .catch(() => setIsSafe(false))
      .finally(() => setSafeLoading(false));
  }, [address, gnosisSafeSingletonContract]);

  return { isSafe, isSafeLoading };
};
