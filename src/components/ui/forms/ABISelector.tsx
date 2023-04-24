import { Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import { isAddress } from 'ethers/lib/utils';
import detectProxyTarget from 'evm-proxy-detection';
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEnsAddress } from 'wagmi';
import { logError } from '../../../helpers/errorLogging';
import { useNetworkConfg } from '../../../providers/NetworkConfig/NetworkConfigProvider';
import { useEIP1193Providers } from '../../../providers/NetworkConfig/utils';
import { LabelComponent } from './InputComponent';

export type ABIElement = {
  type: 'function' | 'constructor' | 'fallback' | 'event';
  name: string;
  stateMutability: 'view' | 'nonpayable' | 'pure';
  inputs: { type: string; name: string; internalType: string }[];
};

interface IABISelector {
  /*
   * @param target - target contract address or ENS name
   */
  target?: string;
  onFetchABI?: (abi: ABIElement[], success: boolean) => void;
  onChange: (value: ABIElement) => void;
}

export default function ABISelector({ target, onChange, onFetchABI }: IABISelector) {
  const [abi, setABI] = useState<ABIElement[]>([]);
  const { etherscanAPIBaseUrl } = useNetworkConfg();
  const { t } = useTranslation('common');
  const { eip1193InfuraProvider } = useEIP1193Providers();
  const { data: ensAddress } = useEnsAddress({ name: target });

  useEffect(() => {
    const loadABI = async () => {
      if (target && ((ensAddress && isAddress(ensAddress)) || isAddress(target))) {
        try {
          const requestFunc = ({ method, params }: { method: string; params: any[] }) =>
            eip1193InfuraProvider.send(method, params);

          const proxy = await detectProxyTarget(ensAddress || target, requestFunc);

          const response = await axios.get(
            `${etherscanAPIBaseUrl}/api?module=contract&action=getabi&address=${
              proxy || ensAddress || target // Proxy detection might not always work
            }&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
          );
          const responseData = response.data;

          if (responseData.status === '1') {
            const fetchedABI = JSON.parse(responseData.result);
            setABI(fetchedABI);
            if (onFetchABI) {
              onFetchABI(fetchedABI, true);
            }
          } else {
            if (onFetchABI) {
              setABI([]);
              onFetchABI([], false);
            }
          }
        } catch (e) {
          logError(e, 'Error fetching ABI for smart contract');
          if (onFetchABI) {
            setABI([]);
            onFetchABI([], false);
          }
        }
      }
    };
    loadABI();
  }, [target, ensAddress, etherscanAPIBaseUrl, onFetchABI, eip1193InfuraProvider]);

  /*
   * This makes component quite scoped to proposal / proposal template creation
   * but we can easily adopt displayed options based on needs later
   */

  const abiFunctions = useMemo(
    () =>
      abi.filter(
        (abiElement: ABIElement) =>
          abiElement.type === 'function' &&
          abiElement.stateMutability !== 'pure' &&
          abiElement.stateMutability !== 'view'
      ),
    [abi]
  );

  if (!abiFunctions || !abiFunctions.length) {
    return null; // TODO: Show "error state" or "empty state"?
  }

  console.log(abiFunctions);

  return (
    <LabelComponent
      label={t('abi')}
      helper={t('abiSelectorHelper')}
      isRequired={false}
    >
      <Select
        placeholder={t('select')}
        variant="outline"
        bg="input.background"
        borderColor="black.200"
        borderWidth="1px"
        borderRadius="4px"
        color="white"
        onChange={e => {
          const selectedFunction = abiFunctions.find(
            (abiFunction: ABIElement) => abiFunction.name === e.target.value
          );
          onChange(selectedFunction!);
        }}
        sx={{ '> option, > optgroup': { bg: 'input.background' } }}
      >
        {abiFunctions.map((abiFunction: ABIElement) => (
          <option key={abiFunction.name}>{abiFunction.name}</option>
        ))}
      </Select>
      <Text color="grayscale.500">{t('abiSelectorDescription')}</Text>
    </LabelComponent>
  );
}