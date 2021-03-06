import { useState, useEffect } from 'react';
import { DAOAccessControl, DAOAccessControl__factory } from '@fractal-framework/core-contracts';
import { useWeb3Provider } from '../web3Data/hooks/useWeb3Provider';

const useAccessControlContract = (accessControlAddress: string | undefined) => {
  const [accessControlContract, setAccessControlContract] = useState<DAOAccessControl>();
  const {
    state: { provider },
  } = useWeb3Provider();

  useEffect(() => {
    if (!accessControlAddress || !provider) {
      setAccessControlContract(undefined);
      return;
    }

    setAccessControlContract(DAOAccessControl__factory.connect(accessControlAddress, provider));
  }, [accessControlAddress, provider]);

  return accessControlContract;
};

export default useAccessControlContract;
