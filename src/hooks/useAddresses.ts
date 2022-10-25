import { useState, useEffect } from 'react';
import { logError } from '../helpers/errorLogging';

export type ContractAddress = { address: string };
export type ContractAddressesChainMap = { [chaindId: number]: ContractAddress };
export function useAddresses(chainId: number | undefined) {
  const [addresses, setAddresses] = useState<{
    metaFactory?: ContractAddress;
    daoFactory?: ContractAddress;
    treasuryModuleFactory?: ContractAddress;
    tokenFactory?: ContractAddress;
    votesMasterCopy?: ContractAddress;
    governorFactory?: ContractAddress;
    claimFactory?: ContractAddress;
    gnosisWrapperFactory?: ContractAddress;
    gnosisSafeFactory?: ContractAddress;
    usulMastercopy?: ContractAddress;
    linearVotingMastercopy?: ContractAddress;
    zodiacModuleProxyFactory?: ContractAddress;
    dao?: ContractAddress;
    accessControl?: ContractAddress;
    treasuryModule?: ContractAddress;
    governorModule?: ContractAddress;
    timelock?: ContractAddress;
    claimModule?: ContractAddress;
    gnosisWrapper?: ContractAddress;
    gnosisSafe?: ContractAddress;
    multiSend?: ContractAddress;
  }>({});

  useEffect(() => {
    if (!chainId) return;
    if (
      !process.env.REACT_APP_METAFACTORY_ADDRESSES ||
      !process.env.REACT_APP_DAOFACTORY_ADDRESSES ||
      !process.env.REACT_APP_TREASURYMODULEFACTORY_ADDRESSES ||
      !process.env.REACT_APP_TOKENFACTORY_ADDRESSES ||
      !process.env.REACT_APP_GOVERNORFACTORY_ADDRESSES ||
      !process.env.REACT_APP_CLAIMFACTORY_ADDRESSES ||
      !process.env.REACT_APP_GNOSISWRAPPERFACTORY_ADDRESSES ||
      !process.env.REACT_APP_GNOSISSAFEFACTORY_ADDRESSES ||
      !process.env.REACT_APP_DAO_ADDRESSES ||
      !process.env.REACT_APP_ACCESSCONTROL_ADDRESSES ||
      !process.env.REACT_APP_TREASURYMODULE_ADDRESSES ||
      !process.env.REACT_APP_GOVERNORMODULE_ADDRESSES ||
      !process.env.REACT_APP_TIMELOCK_ADDRESSES ||
      !process.env.REACT_APP_CLAIM_ADDRESSES ||
      !process.env.REACT_APP_GNOSISWRAPPER_ADDRESSES ||
      !process.env.REACT_APP_GNOSISSAFE_ADDRESSES ||
      !process.env.REACT_APP_USUL_MASTERCOPY_ADDRESSES ||
      !process.env.REACT_APP_ZODIAC_PROXY_FACTORY_ADDRESSES ||
      !process.env.REACT_APP_ONE_TO_ONE_TOKEN_VOTING_MASTERCOPY_ADDRESSES ||
      !process.env.REACT_APP_GNOSIS_MULTISEND_ADDRESSES ||
      !process.env.REACT_APP_VOTES_TOKEN_MASTERCOPY_ADDRESSES
    ) {
      logError('Addresses not set!');
      setAddresses({});
      return;
    }

    const metaFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_METAFACTORY_ADDRESSES
    );
    const daoFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_DAOFACTORY_ADDRESSES
    );
    const treasuryModuleFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_TREASURYMODULEFACTORY_ADDRESSES
    );
    const tokenFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_TOKENFACTORY_ADDRESSES
    );
    const governorFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GOVERNORFACTORY_ADDRESSES
    );
    const claimFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_CLAIMFACTORY_ADDRESSES
    );
    const gnosisWrapperFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GNOSISWRAPPERFACTORY_ADDRESSES
    );
    const gnosisSafeFactoryNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GNOSISSAFEFACTORY_ADDRESSES
    );
    const daoNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_DAO_ADDRESSES
    );
    const accessControlNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_ACCESSCONTROL_ADDRESSES
    );
    const treasuryModuleNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_TREASURYMODULE_ADDRESSES
    );
    const governorModuleNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GOVERNORMODULE_ADDRESSES
    );
    const timelockNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_TIMELOCK_ADDRESSES
    );
    const claimModuleNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_CLAIM_ADDRESSES
    );
    const gnosisWrapperNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GNOSISWRAPPER_ADDRESSES
    );
    const gnosisSafeNetworksAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GNOSISSAFE_ADDRESSES
    );
    const zodiacProxyFactoryAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_ZODIAC_PROXY_FACTORY_ADDRESSES
    );
    const usulMastercopyAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_USUL_MASTERCOPY_ADDRESSES
    );
    const linearVotingMastercopyAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_ONE_TO_ONE_TOKEN_VOTING_MASTERCOPY_ADDRESSES
    );
    const multiSendAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_GNOSIS_MULTISEND_ADDRESSES
    );
    const votesMasterCopyAddresses: ContractAddressesChainMap = JSON.parse(
      process.env.REACT_APP_VOTES_TOKEN_MASTERCOPY_ADDRESSES
    );

    const metaFactoryAddress = metaFactoryNetworksAddresses[chainId];
    const daoFactoryAddress = daoFactoryNetworksAddresses[chainId];
    const treasuryModuleFactoryAddress = treasuryModuleFactoryNetworksAddresses[chainId];
    const tokenFactoryAddress = tokenFactoryNetworksAddresses[chainId];
    const governorFactoryAddress = governorFactoryNetworksAddresses[chainId];
    const claimFactoryAddress = claimFactoryNetworksAddresses[chainId];
    const gnosisWrapperFactoryAddress = gnosisWrapperFactoryNetworksAddresses[chainId];
    const gnosisSafeFactoryAddress = gnosisSafeFactoryNetworksAddresses[chainId];
    const daoAddress = daoNetworksAddresses[chainId];
    const accessControlAddress = accessControlNetworksAddresses[chainId];
    const treasuryModuleAddress = treasuryModuleNetworksAddresses[chainId];
    const governorModuleAddress = governorModuleNetworksAddresses[chainId];
    const timelockAddress = timelockNetworksAddresses[chainId];
    const claimModuleAddress = claimModuleNetworksAddresses[chainId];
    const gnosisWrapperAddress = gnosisWrapperNetworksAddresses[chainId];
    const gnosisSafeAddress = gnosisSafeNetworksAddresses[chainId];
    const usulMastercopy = usulMastercopyAddresses[chainId];
    const zodiacModuleProxyFactory = zodiacProxyFactoryAddresses[chainId];
    const linearVotingMastercopy = linearVotingMastercopyAddresses[chainId];
    const multiSend = multiSendAddresses[chainId];
    const votesMasterCopy = votesMasterCopyAddresses[chainId];

    if (
      !metaFactoryAddress ||
      !daoFactoryAddress ||
      !treasuryModuleFactoryAddress ||
      !tokenFactoryAddress ||
      !governorFactoryAddress ||
      !claimFactoryAddress ||
      !gnosisWrapperFactoryAddress ||
      !gnosisSafeFactoryAddress ||
      !daoAddress ||
      !accessControlAddress ||
      !treasuryModuleAddress ||
      !governorModuleAddress ||
      !timelockAddress ||
      !claimModuleAddress ||
      !gnosisWrapperAddress ||
      !gnosisSafeAddress ||
      !usulMastercopy ||
      !zodiacModuleProxyFactory ||
      !linearVotingMastercopy ||
      !multiSend ||
      !votesMasterCopy
    ) {
      logError(`At least one address for network ${chainId} is not set!`);
      setAddresses({});
      return;
    }

    setAddresses({
      metaFactory: metaFactoryAddress,
      daoFactory: daoFactoryAddress,
      treasuryModuleFactory: treasuryModuleFactoryAddress,
      tokenFactory: tokenFactoryAddress,
      governorFactory: governorFactoryAddress,
      claimFactory: claimFactoryAddress,
      gnosisWrapperFactory: gnosisWrapperFactoryAddress,
      gnosisSafeFactory: gnosisSafeFactoryAddress,
      dao: daoAddress,
      accessControl: accessControlAddress,
      treasuryModule: treasuryModuleAddress,
      governorModule: governorModuleAddress,
      timelock: timelockAddress,
      claimModule: claimModuleAddress,
      gnosisWrapper: gnosisWrapperAddress,
      gnosisSafe: gnosisSafeAddress,
      usulMastercopy,
      zodiacModuleProxyFactory,
      linearVotingMastercopy,
      multiSend,
      votesMasterCopy,
    });
  }, [chainId]);

  return addresses;
}
