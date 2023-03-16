import { BigNumber } from 'ethers';
export const DEFAULT_TRANSACTION = {
  targetAddress: '',
  ethValue: { value: '0', bigNumberValue: BigNumber.from('0') },
  functionName: '',
  functionSignature: '',
  parameters: '',
  // isExpanded: true, // @todo move this in a lower component
  encodedFunctionData: undefined, // @todo use Yup.
};

export const DEFAULT_META_DATA = {
  title: '',
  description: '',
  documentationUrl: '',
};

export const DEFAULT_PROPOSAL = {
  proposalMetadata: DEFAULT_META_DATA,
  transactions: [DEFAULT_TRANSACTION],
  nonce: undefined,
};
