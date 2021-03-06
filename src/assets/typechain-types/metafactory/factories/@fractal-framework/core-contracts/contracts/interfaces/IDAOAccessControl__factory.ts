/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDAOAccessControl,
  IDAOAccessControlInterface,
} from "../../../../../@fractal-framework/core-contracts/contracts/interfaces/IDAOAccessControl";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "MissingRole",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlySelfRenounce",
    type: "error",
  },
  {
    inputs: [],
    name: "UnequalArrayLengths",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "functionDesc",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "encodedSig",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "ActionRoleAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "functionDesc",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "encodedSig",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "ActionRoleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "previousAdminRole",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "adminRole",
        type: "string",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DAO_ROLE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
    ],
    name: "actionIsAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "isAuthorized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "adminGrantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "adminRevokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "functionDescs",
        type: "string[]",
      },
      {
        internalType: "string[][]",
        name: "roles",
        type: "string[][]",
      },
    ],
    name: "daoAddActionsRoles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "roles",
        type: "string[]",
      },
      {
        internalType: "address[][]",
        name: "members",
        type: "address[][]",
      },
    ],
    name: "daoGrantRoles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "roles",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "roleAdmins",
        type: "string[]",
      },
      {
        internalType: "address[][]",
        name: "members",
        type: "address[][]",
      },
    ],
    name: "daoGrantRolesAndAdmins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "functionDescs",
        type: "string[]",
      },
      {
        internalType: "string[][]",
        name: "roles",
        type: "string[][]",
      },
    ],
    name: "daoRemoveActionsRoles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "string",
        name: "functionDesc",
        type: "string",
      },
    ],
    name: "getActionRoles",
    outputs: [
      {
        internalType: "string[]",
        name: "roles",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "roles",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "roleAdmins",
        type: "string[]",
      },
      {
        internalType: "address[][]",
        name: "members",
        type: "address[][]",
      },
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "functionDescs",
        type: "string[]",
      },
      {
        internalType: "string[][]",
        name: "actionRoles",
        type: "string[][]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "string",
        name: "functionDesc",
        type: "string",
      },
    ],
    name: "isRoleAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "isAuthorized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "userRenounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IDAOAccessControl__factory {
  static readonly abi = _abi;
  static createInterface(): IDAOAccessControlInterface {
    return new utils.Interface(_abi) as IDAOAccessControlInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDAOAccessControl {
    return new Contract(address, _abi, signerOrProvider) as IDAOAccessControl;
  }
}
