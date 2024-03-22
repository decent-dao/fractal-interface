/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "UpgradeableProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradeableProxy__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "MockContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockContract__factory>;
    getContractFactory(
      name: "MockInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockInterface__factory>;
    getContractFactory(
      name: "SimulateTxAccessor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimulateTxAccessor__factory>;
    getContractFactory(
      name: "FallbackManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FallbackManager__factory>;
    getContractFactory(
      name: "BaseGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseGuard__factory>;
    getContractFactory(
      name: "Guard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Guard__factory>;
    getContractFactory(
      name: "GuardManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GuardManager__factory>;
    getContractFactory(
      name: "ModuleManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ModuleManager__factory>;
    getContractFactory(
      name: "OwnerManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnerManager__factory>;
    getContractFactory(
      name: "NativeCurrencyPaymentFallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NativeCurrencyPaymentFallback__factory>;
    getContractFactory(
      name: "StorageAccessible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StorageAccessible__factory>;
    getContractFactory(
      name: "DebugTransactionGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DebugTransactionGuard__factory>;
    getContractFactory(
      name: "DelegateCallTransactionGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DelegateCallTransactionGuard__factory>;
    getContractFactory(
      name: "OnlyOwnersGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnlyOwnersGuard__factory>;
    getContractFactory(
      name: "ReentrancyTransactionGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyTransactionGuard__factory>;
    getContractFactory(
      name: "Migration",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Migration__factory>;
    getContractFactory(
      name: "CompatibilityFallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompatibilityFallbackHandler__factory>;
    getContractFactory(
      name: "TokenCallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenCallbackHandler__factory>;
    getContractFactory(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TokenReceiver__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "ERC777TokensRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777TokensRecipient__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IFallbackManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFallbackManager__factory>;
    getContractFactory(
      name: "IGuardManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGuardManager__factory>;
    getContractFactory(
      name: "IModuleManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IModuleManager__factory>;
    getContractFactory(
      name: "IOwnerManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOwnerManager__factory>;
    getContractFactory(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafe__factory>;
    getContractFactory(
      name: "ISignatureValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISignatureValidator__factory>;
    getContractFactory(
      name: "ViewStorageAccessible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ViewStorageAccessible__factory>;
    getContractFactory(
      name: "CreateCall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CreateCall__factory>;
    getContractFactory(
      name: "MultiSend",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiSend__factory>;
    getContractFactory(
      name: "MultiSendCallOnly",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiSendCallOnly__factory>;
    getContractFactory(
      name: "Safe130To141Migration",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Safe130To141Migration__factory>;
    getContractFactory(
      name: "Safe150Migration",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Safe150Migration__factory>;
    getContractFactory(
      name: "SafeToL2Migration",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeToL2Migration__factory>;
    getContractFactory(
      name: "SignMessageLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignMessageLib__factory>;
    getContractFactory(
      name: "IProxyCreationCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProxyCreationCallback__factory>;
    getContractFactory(
      name: "IProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProxy__factory>;
    getContractFactory(
      name: "SafeProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeProxy__factory>;
    getContractFactory(
      name: "SafeProxyFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeProxyFactory__factory>;
    getContractFactory(
      name: "Safe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Safe__factory>;
    getContractFactory(
      name: "SafeL2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeL2__factory>;
    getContractFactory(
      name: "DelegateCaller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DelegateCaller__factory>;
    getContractFactory(
      name: "ERC1155Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Token__factory>;
    getContractFactory(
      name: "ERC20Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Token__factory>;
    getContractFactory(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafe__factory>;
    getContractFactory(
      name: "Test4337ModuleAndHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Test4337ModuleAndHandler__factory>;
    getContractFactory(
      name: "TestHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestHandler__factory>;
    getContractFactory(
      name: "TestNativeTokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestNativeTokenReceiver__factory>;
    getContractFactory(
      name: "Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Token__factory>;

    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "UpgradeableProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpgradeableProxy>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "MockContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockContract>;
    getContractAt(
      name: "MockInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockInterface>;
    getContractAt(
      name: "SimulateTxAccessor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimulateTxAccessor>;
    getContractAt(
      name: "FallbackManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FallbackManager>;
    getContractAt(
      name: "BaseGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseGuard>;
    getContractAt(
      name: "Guard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Guard>;
    getContractAt(
      name: "GuardManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GuardManager>;
    getContractAt(
      name: "ModuleManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ModuleManager>;
    getContractAt(
      name: "OwnerManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnerManager>;
    getContractAt(
      name: "NativeCurrencyPaymentFallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NativeCurrencyPaymentFallback>;
    getContractAt(
      name: "StorageAccessible",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StorageAccessible>;
    getContractAt(
      name: "DebugTransactionGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DebugTransactionGuard>;
    getContractAt(
      name: "DelegateCallTransactionGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DelegateCallTransactionGuard>;
    getContractAt(
      name: "OnlyOwnersGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OnlyOwnersGuard>;
    getContractAt(
      name: "ReentrancyTransactionGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyTransactionGuard>;
    getContractAt(
      name: "Migration",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Migration>;
    getContractAt(
      name: "CompatibilityFallbackHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CompatibilityFallbackHandler>;
    getContractAt(
      name: "TokenCallbackHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenCallbackHandler>;
    getContractAt(
      name: "ERC1155TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TokenReceiver>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "ERC777TokensRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC777TokensRecipient>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IFallbackManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFallbackManager>;
    getContractAt(
      name: "IGuardManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGuardManager>;
    getContractAt(
      name: "IModuleManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IModuleManager>;
    getContractAt(
      name: "IOwnerManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOwnerManager>;
    getContractAt(
      name: "ISafe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafe>;
    getContractAt(
      name: "ISignatureValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISignatureValidator>;
    getContractAt(
      name: "ViewStorageAccessible",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ViewStorageAccessible>;
    getContractAt(
      name: "CreateCall",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CreateCall>;
    getContractAt(
      name: "MultiSend",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiSend>;
    getContractAt(
      name: "MultiSendCallOnly",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiSendCallOnly>;
    getContractAt(
      name: "Safe130To141Migration",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Safe130To141Migration>;
    getContractAt(
      name: "Safe150Migration",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Safe150Migration>;
    getContractAt(
      name: "SafeToL2Migration",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeToL2Migration>;
    getContractAt(
      name: "SignMessageLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignMessageLib>;
    getContractAt(
      name: "IProxyCreationCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProxyCreationCallback>;
    getContractAt(
      name: "IProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProxy>;
    getContractAt(
      name: "SafeProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeProxy>;
    getContractAt(
      name: "SafeProxyFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeProxyFactory>;
    getContractAt(
      name: "Safe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Safe>;
    getContractAt(
      name: "SafeL2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeL2>;
    getContractAt(
      name: "DelegateCaller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DelegateCaller>;
    getContractAt(
      name: "ERC1155Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Token>;
    getContractAt(
      name: "ERC20Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Token>;
    getContractAt(
      name: "ISafe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafe>;
    getContractAt(
      name: "Test4337ModuleAndHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Test4337ModuleAndHandler>;
    getContractAt(
      name: "TestHandler",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestHandler>;
    getContractAt(
      name: "TestNativeTokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestNativeTokenReceiver>;
    getContractAt(
      name: "Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Token>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}