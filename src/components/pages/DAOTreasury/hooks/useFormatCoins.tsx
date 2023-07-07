import { SafeBalanceUsdResponse } from '@safe-global/safe-service-client';
import { ethers } from 'ethers';
import { useNetworkConfig } from '../../../../providers/NetworkConfig/NetworkConfigProvider';
import { formatCoin, formatUSD } from '../../../../utils/numberFormats';

export interface TokenDisplayData {
  iconUri: string;
  address: string;
  symbol: string;
  truncatedCoinTotal: string;
  fullCoinTotal: string;
  fiatValue: number;
  fiatDisplayValue: string;
  fiatConversion: string;
}

export function useFormatCoins(assets: SafeBalanceUsdResponse[]) {
  const { nativeTokenSymbol, nativeTokenIcon } = useNetworkConfig();
  let totalFiatValue = 0;
  let displayData: TokenDisplayData[] = [];
  for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    if (asset.balance === '0') continue;
    totalFiatValue += Number(asset.fiatBalance);
    let symbol = asset.token === null ? nativeTokenSymbol : asset.token.symbol;
    const formatted: TokenDisplayData = {
      iconUri: asset.token === null ? nativeTokenIcon : asset.token.logoUri,
      address: asset.tokenAddress === null ? ethers.constants.AddressZero : asset.tokenAddress,
      truncatedCoinTotal: formatCoin(asset.balance, true, asset?.token?.decimals, symbol),
      fiatValue: Number(asset.fiatBalance),
      symbol: symbol,
      fiatConversion: `1 ${symbol} = ${formatUSD(Number(asset.fiatConversion))}`,
      fullCoinTotal: formatCoin(asset.balance, false, asset?.token?.decimals, symbol),
      fiatDisplayValue: formatUSD(Number(asset.fiatBalance)),
    };
    displayData.push(formatted);
  }
  displayData.sort((a, b) => b.fiatValue - a.fiatValue); // sort by USD value
  return {
    totalFiatValue,
    displayData,
  };
}
