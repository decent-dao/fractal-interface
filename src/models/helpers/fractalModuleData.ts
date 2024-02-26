import {
  FractalModule,
  FractalModule__factory,
  ModuleProxyFactory,
} from '@fractal-framework/fractal-contracts';
import { ethers } from 'ethers';
import { GnosisSafeL2 } from '../../assets/typechain-types/usul/@gnosis.pm/safe-contracts/contracts';
import { buildContractCall } from '../../helpers/crypto';
import { SafeTransaction } from '../../types';
import {
  buildDeployZodiacModuleTx,
  generateContractByteCodeLinear,
  generatePredictedModuleAddress,
  generateSalt,
} from './utils';

export interface FractalModuleData {
  predictedFractalModuleAddress: string;
  deployFractalModuleTx: SafeTransaction;
  enableFractalModuleTx: SafeTransaction;
}

export const fractalModuleData = (
  fractalModuleMasterCopyContract: FractalModule,
  zodiacModuleProxyFactoryContract: ModuleProxyFactory,
  safeContract: GnosisSafeL2,
  saltNum: string,
  parentAddress?: string
): FractalModuleData => {
  const fractalModuleCalldata = FractalModule__factory.createInterface().encodeFunctionData(
    'setUp',
    [
      ethers.utils.defaultAbiCoder.encode(
        ['address', 'address', 'address', 'address[]'],
        [
          parentAddress ?? safeContract.address, // Owner -- Parent DAO or safe contract
          safeContract.address, // Avatar
          safeContract.address, // Target
          [], // Authorized Controllers
        ]
      ),
    ]
  );

  const fractalByteCodeLinear = generateContractByteCodeLinear(
    fractalModuleMasterCopyContract.address.slice(2)
  );

  const fractalSalt = generateSalt(fractalModuleCalldata, saltNum);
  const deployFractalModuleTx = buildDeployZodiacModuleTx(zodiacModuleProxyFactoryContract, [
    fractalModuleMasterCopyContract.address,
    fractalModuleCalldata,
    saltNum,
  ]);
  const predictedFractalModuleAddress = generatePredictedModuleAddress(
    zodiacModuleProxyFactoryContract.address,
    fractalSalt,
    fractalByteCodeLinear
  );

  const enableFractalModuleTx = buildContractCall(
    safeContract,
    'enableModule',
    [predictedFractalModuleAddress],
    0,
    false
  );

  return {
    predictedFractalModuleAddress,
    deployFractalModuleTx,
    enableFractalModuleTx,
  };
};
