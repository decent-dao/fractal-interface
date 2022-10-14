/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IModuleFactoryBase,
  IModuleFactoryBaseInterface,
} from "../../../../../@fractal-framework/core-contracts/contracts/interfaces/IModuleFactoryBase";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "semanticVersion",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "frontendURI",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "impl",
        type: "address",
      },
    ],
    name: "VersionCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_semanticVersion",
        type: "string",
      },
      {
        internalType: "string",
        name: "_frontendURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "_impl",
        type: "address",
      },
    ],
    name: "addVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IModuleFactoryBase__factory {
  static readonly abi = _abi;
  static createInterface(): IModuleFactoryBaseInterface {
    return new utils.Interface(_abi) as IModuleFactoryBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IModuleFactoryBase {
    return new Contract(address, _abi, signerOrProvider) as IModuleFactoryBase;
  }
}
