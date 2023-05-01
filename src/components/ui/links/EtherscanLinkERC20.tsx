import { ethers } from 'ethers';
import { useNetworkConfg } from '../../../providers/NetworkConfig/NetworkConfigProvider';

function EtherscanLinkERC20({ address, children }: { address: string; children: React.ReactNode }) {
  const { etherscanBaseURL } = useNetworkConfg();
  return (
    <a
      href={`${etherscanBaseURL}/${
        address === ethers.constants.AddressZero ? '' : 'token/'
      }${address}`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default EtherscanLinkERC20;
