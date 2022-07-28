/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface TokenFactoryInterface extends utils.Interface {
  functions: {
    "addVersion(string,string,address)": FunctionFragment;
    "create(address,bytes[])": FunctionFragment;
    "initialize()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "versionControl(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addVersion"
      | "create"
      | "initialize"
      | "owner"
      | "renounceOwnership"
      | "supportsInterface"
      | "transferOwnership"
      | "versionControl"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addVersion",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [string, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "versionControl",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "versionControl",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "TokenCreated(address)": EventFragment;
    "VersionCreated(string,string,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VersionCreated"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TokenCreatedEventObject {
  tokenAddress: string;
}
export type TokenCreatedEvent = TypedEvent<[string], TokenCreatedEventObject>;

export type TokenCreatedEventFilter = TypedEventFilter<TokenCreatedEvent>;

export interface VersionCreatedEventObject {
  semanticVersion: string;
  frontendURI: string;
  impl: string;
}
export type VersionCreatedEvent = TypedEvent<
  [string, string, string],
  VersionCreatedEventObject
>;

export type VersionCreatedEventFilter = TypedEventFilter<VersionCreatedEvent>;

export interface TokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addVersion(
      _semanticVersion: string,
      _frontendURI: string,
      _impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    create(
      creator: string,
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    versionControl(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        semanticVersion: string;
        frontendURI: string;
        impl: string;
      }
    >;
  };

  addVersion(
    _semanticVersion: string,
    _frontendURI: string,
    _impl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  create(
    creator: string,
    data: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  versionControl(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string] & {
      semanticVersion: string;
      frontendURI: string;
      impl: string;
    }
  >;

  callStatic: {
    addVersion(
      _semanticVersion: string,
      _frontendURI: string,
      _impl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    create(
      creator: string,
      data: BytesLike[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    initialize(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    versionControl(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        semanticVersion: string;
        frontendURI: string;
        impl: string;
      }
    >;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "TokenCreated(address)"(
      tokenAddress?: string | null
    ): TokenCreatedEventFilter;
    TokenCreated(tokenAddress?: string | null): TokenCreatedEventFilter;

    "VersionCreated(string,string,address)"(
      semanticVersion?: null,
      frontendURI?: null,
      impl?: null
    ): VersionCreatedEventFilter;
    VersionCreated(
      semanticVersion?: null,
      frontendURI?: null,
      impl?: null
    ): VersionCreatedEventFilter;
  };

  estimateGas: {
    addVersion(
      _semanticVersion: string,
      _frontendURI: string,
      _impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    create(
      creator: string,
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    versionControl(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVersion(
      _semanticVersion: string,
      _frontendURI: string,
      _impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    create(
      creator: string,
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    versionControl(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
