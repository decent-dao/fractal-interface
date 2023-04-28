import FractalModule from '@fractal-framework/fractal-contracts/deployments/goerli/FractalModule.json';
import FractalRegistry from '@fractal-framework/fractal-contracts/deployments/goerli/FractalRegistry.json';
import FractalUsul from '@fractal-framework/fractal-contracts/deployments/goerli/FractalUsul.json';
import TokenClaim from '@fractal-framework/fractal-contracts/deployments/goerli/TokenClaim.json';
import UsulVetoGuard from '@fractal-framework/fractal-contracts/deployments/goerli/UsulVetoGuard.json';
import VetoERC20Voting from '@fractal-framework/fractal-contracts/deployments/goerli/VetoERC20Voting.json';
import VetoGuard from '@fractal-framework/fractal-contracts/deployments/goerli/VetoGuard.json';
import VetoMultisigVoting from '@fractal-framework/fractal-contracts/deployments/goerli/VetoMultisigVoting.json';
import VotesToken from '@fractal-framework/fractal-contracts/deployments/goerli/VotesToken.json';
import { goerli } from 'wagmi/chains';
import { NetworkConfig } from '../../../types/network';

export const goerliConfig: NetworkConfig = {
  safeBaseURL: 'https://safe-transaction-goerli.safe.global',
  etherscanBaseURL: 'https://goerli.etherscan.io',
  etherscanAPIBaseUrl: 'https://api-goerli.etherscan.io',
  chainId: 5,
  name: goerli.name,
  color: 'gold.300',
  nativeTokenSymbol: goerli.nativeCurrency.symbol,
  nativeTokenIcon: '/images/coin-icon-eth.svg',
  wagmiChain: goerli,
  contracts: {
    fractalAzoriusMasterCopy: FractalUsul.address,
    fractalModuleMasterCopy: FractalModule.address,
    fractalRegistry: FractalRegistry.address,
    votesTokenMasterCopy: VotesToken.address,
    claimingMasterCopy: TokenClaim.address,
    azoriusVetoGuardMasterCopy: UsulVetoGuard.address,
    vetoMultisigVotingMasterCopy: VetoMultisigVoting.address,
    vetoERC20VotingMasterCopy: VetoERC20Voting.address,
    gnosisVetoGuardMasterCopy: VetoGuard.address,
    gnosisSafe: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
    gnosisSafeFactory: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2',
    zodiacModuleProxyFactory: '0x740020d3B1BF3E64e84dbA7175fC560B85EdB9bC',
    linearVotingMasterCopy: '0x948db5691cc97AEcb4fF5FfcAEb72594B74D9D52',
    gnosisMultisend: '0x40A2aCCbd92BCA938b02010E17A5b8929b49130D',
    votesERC20WrapperMasterCopy: '0x2321a6D07Bf064795987A943449fE556e1451b46',
  },
};
