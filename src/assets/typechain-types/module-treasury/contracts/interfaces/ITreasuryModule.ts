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
} from "../../common";

export interface ITreasuryModuleInterface extends utils.Interface {
  functions: {
    "depositERC20Tokens(address[],address[],uint256[])": FunctionFragment;
    "depositERC721Tokens(address[],address[],uint256[])": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "withdrawERC20Tokens(address[],address[],uint256[])": FunctionFragment;
    "withdrawERC721Tokens(address[],address[],uint256[])": FunctionFragment;
    "withdrawEth(address[],uint256[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "depositERC20Tokens"
      | "depositERC721Tokens"
      | "initialize"
      | "withdrawERC20Tokens"
      | "withdrawERC721Tokens"
      | "withdrawEth"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositERC20Tokens",
    values: [string[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC721Tokens",
    values: [string[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20Tokens",
    values: [string[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC721Tokens",
    values: [string[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawEth",
    values: [string[], BigNumberish[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositERC20Tokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositERC721Tokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20Tokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC721Tokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawEth",
    data: BytesLike
  ): Result;

  events: {
    "ERC20TokensDeposited(address[],address[],uint256[])": EventFragment;
    "ERC20TokensWithdrawn(address[],address[],uint256[])": EventFragment;
    "ERC721TokensDeposited(address[],address[],uint256[])": EventFragment;
    "ERC721TokensWithdrawn(address[],address[],uint256[])": EventFragment;
    "EthDeposited(address,uint256)": EventFragment;
    "EthWithdrawn(address[],uint256[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC20TokensDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC20TokensWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC721TokensDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC721TokensWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthWithdrawn"): EventFragment;
}

export interface ERC20TokensDepositedEventObject {
  tokenAddresses: string[];
  senders: string[];
  amounts: BigNumber[];
}
export type ERC20TokensDepositedEvent = TypedEvent<
  [string[], string[], BigNumber[]],
  ERC20TokensDepositedEventObject
>;

export type ERC20TokensDepositedEventFilter =
  TypedEventFilter<ERC20TokensDepositedEvent>;

export interface ERC20TokensWithdrawnEventObject {
  tokenAddresses: string[];
  recipients: string[];
  amounts: BigNumber[];
}
export type ERC20TokensWithdrawnEvent = TypedEvent<
  [string[], string[], BigNumber[]],
  ERC20TokensWithdrawnEventObject
>;

export type ERC20TokensWithdrawnEventFilter =
  TypedEventFilter<ERC20TokensWithdrawnEvent>;

export interface ERC721TokensDepositedEventObject {
  tokenAddresses: string[];
  senders: string[];
  tokenIds: BigNumber[];
}
export type ERC721TokensDepositedEvent = TypedEvent<
  [string[], string[], BigNumber[]],
  ERC721TokensDepositedEventObject
>;

export type ERC721TokensDepositedEventFilter =
  TypedEventFilter<ERC721TokensDepositedEvent>;

export interface ERC721TokensWithdrawnEventObject {
  tokenAddresses: string[];
  recipients: string[];
  tokenIds: BigNumber[];
}
export type ERC721TokensWithdrawnEvent = TypedEvent<
  [string[], string[], BigNumber[]],
  ERC721TokensWithdrawnEventObject
>;

export type ERC721TokensWithdrawnEventFilter =
  TypedEventFilter<ERC721TokensWithdrawnEvent>;

export interface EthDepositedEventObject {
  sender: string;
  amount: BigNumber;
}
export type EthDepositedEvent = TypedEvent<
  [string, BigNumber],
  EthDepositedEventObject
>;

export type EthDepositedEventFilter = TypedEventFilter<EthDepositedEvent>;

export interface EthWithdrawnEventObject {
  recipients: string[];
  amounts: BigNumber[];
}
export type EthWithdrawnEvent = TypedEvent<
  [string[], BigNumber[]],
  EthWithdrawnEventObject
>;

export type EthWithdrawnEventFilter = TypedEventFilter<EthWithdrawnEvent>;

export interface ITreasuryModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITreasuryModuleInterface;

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
    depositERC20Tokens(
      tokenAddresses: string[],
      senders: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositERC721Tokens(
      tokenAddresses: string[],
      senders: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _accessControl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawERC20Tokens(
      tokenAddresses: string[],
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawERC721Tokens(
      tokenAddresses: string[],
      recipients: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawEth(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  depositERC20Tokens(
    tokenAddresses: string[],
    senders: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositERC721Tokens(
    tokenAddresses: string[],
    senders: string[],
    tokenIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _accessControl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawERC20Tokens(
    tokenAddresses: string[],
    recipients: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawERC721Tokens(
    tokenAddresses: string[],
    recipients: string[],
    tokenIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawEth(
    recipients: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    depositERC20Tokens(
      tokenAddresses: string[],
      senders: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    depositERC721Tokens(
      tokenAddresses: string[],
      senders: string[],
      tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _accessControl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawERC20Tokens(
      tokenAddresses: string[],
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawERC721Tokens(
      tokenAddresses: string[],
      recipients: string[],
      tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawEth(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ERC20TokensDeposited(address[],address[],uint256[])"(
      tokenAddresses?: null,
      senders?: null,
      amounts?: null
    ): ERC20TokensDepositedEventFilter;
    ERC20TokensDeposited(
      tokenAddresses?: null,
      senders?: null,
      amounts?: null
    ): ERC20TokensDepositedEventFilter;

    "ERC20TokensWithdrawn(address[],address[],uint256[])"(
      tokenAddresses?: null,
      recipients?: null,
      amounts?: null
    ): ERC20TokensWithdrawnEventFilter;
    ERC20TokensWithdrawn(
      tokenAddresses?: null,
      recipients?: null,
      amounts?: null
    ): ERC20TokensWithdrawnEventFilter;

    "ERC721TokensDeposited(address[],address[],uint256[])"(
      tokenAddresses?: null,
      senders?: null,
      tokenIds?: null
    ): ERC721TokensDepositedEventFilter;
    ERC721TokensDeposited(
      tokenAddresses?: null,
      senders?: null,
      tokenIds?: null
    ): ERC721TokensDepositedEventFilter;

    "ERC721TokensWithdrawn(address[],address[],uint256[])"(
      tokenAddresses?: null,
      recipients?: null,
      tokenIds?: null
    ): ERC721TokensWithdrawnEventFilter;
    ERC721TokensWithdrawn(
      tokenAddresses?: null,
      recipients?: null,
      tokenIds?: null
    ): ERC721TokensWithdrawnEventFilter;

    "EthDeposited(address,uint256)"(
      sender?: null,
      amount?: null
    ): EthDepositedEventFilter;
    EthDeposited(sender?: null, amount?: null): EthDepositedEventFilter;

    "EthWithdrawn(address[],uint256[])"(
      recipients?: null,
      amounts?: null
    ): EthWithdrawnEventFilter;
    EthWithdrawn(recipients?: null, amounts?: null): EthWithdrawnEventFilter;
  };

  estimateGas: {
    depositERC20Tokens(
      tokenAddresses: string[],
      senders: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositERC721Tokens(
      tokenAddresses: string[],
      senders: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      _accessControl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawERC20Tokens(
      tokenAddresses: string[],
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawERC721Tokens(
      tokenAddresses: string[],
      recipients: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawEth(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    depositERC20Tokens(
      tokenAddresses: string[],
      senders: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositERC721Tokens(
      tokenAddresses: string[],
      senders: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _accessControl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC20Tokens(
      tokenAddresses: string[],
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC721Tokens(
      tokenAddresses: string[],
      recipients: string[],
      tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawEth(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
