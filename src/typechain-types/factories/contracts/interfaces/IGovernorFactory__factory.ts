/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGovernorFactory,
  IGovernorFactoryInterface,
} from "../../../contracts/interfaces/IGovernorFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "timelock",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "governorModule",
        type: "address",
      },
    ],
    name: "GovernorCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "address",
        name: "_accessControl",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IGovernorModule",
            name: "_govImpl",
            type: "address",
          },
          {
            internalType: "contract IVotesUpgradeable",
            name: "_token",
            type: "address",
          },
          {
            internalType: "contract ITimelockUpgradeable",
            name: "_timelockImpl",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "_initialVoteExtension",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "_initialVotingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialVotingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialProposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialQuorumNumeratorValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_minDelay",
            type: "uint256",
          },
        ],
        internalType: "struct IGovernorFactory.CreateGovernorParams",
        name: "_createGovernorParams",
        type: "tuple",
      },
    ],
    name: "createGovernor",
    outputs: [
      {
        internalType: "address",
        name: "timelock",
        type: "address",
      },
      {
        internalType: "address",
        name: "governorModule",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IGovernorFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IGovernorFactoryInterface {
    return new utils.Interface(_abi) as IGovernorFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGovernorFactory {
    return new Contract(address, _abi, signerOrProvider) as IGovernorFactory;
  }
}
