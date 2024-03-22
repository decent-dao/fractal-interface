/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface IGuardManagerInterface extends utils.Interface {
  functions: {
    "setGuard(address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "setGuard"): FunctionFragment;

  encodeFunctionData(functionFragment: "setGuard", values: [string]): string;

  decodeFunctionResult(functionFragment: "setGuard", data: BytesLike): Result;

  events: {
    "ChangedGuard(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangedGuard"): EventFragment;
}

export interface ChangedGuardEventObject {
  guard: string;
}
export type ChangedGuardEvent = TypedEvent<[string], ChangedGuardEventObject>;

export type ChangedGuardEventFilter = TypedEventFilter<ChangedGuardEvent>;

export interface IGuardManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IGuardManagerInterface;

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
    setGuard(
      guard: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  setGuard(
    guard: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    setGuard(guard: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ChangedGuard(address)"(guard?: string | null): ChangedGuardEventFilter;
    ChangedGuard(guard?: string | null): ChangedGuardEventFilter;
  };

  estimateGas: {
    setGuard(
      guard: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    setGuard(
      guard: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}