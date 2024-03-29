import { BigNumber } from 'ethers';
export const DEFAULT_TRANSACTION = {
  targetAddress: '',
  ethValue: { value: '0', bigNumberValue: BigNumber.from('0') },
  functionName: '',
  functionSignature: '',
  parameters: '',
  encodedFunctionData: undefined,
};

export const DEFAULT_PROPOSAL = {
  proposalMetadata: {
    title: '',
    description: '',
    documentationUrl: '',
  },
  transactions: [DEFAULT_TRANSACTION],
  nonce: 0,
};
