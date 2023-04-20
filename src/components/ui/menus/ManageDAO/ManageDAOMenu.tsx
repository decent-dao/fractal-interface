import { VEllipsis } from '@decent-org/fractal-ui';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { DAO_ROUTES } from '../../../../constants/routes';
import {
  isWithinFreezePeriod,
  isWithinFreezeProposalPeriod,
} from '../../../../helpers/freezePeriodHelpers';
import useClawBack from '../../../../hooks/DAO/useClawBack';
import useBlockTimestamp from '../../../../hooks/utils/useBlockTimestamp';
import { useFractal } from '../../../../providers/App/AppProvider';
import { FractalGuardContracts, FreezeGuard, StrategyType } from '../../../../types';
import { OptionMenu } from '../OptionMenu';

interface IManageDAOMenu {
  parentAddress?: string | null;
  safeAddress: string;
  freezeGuard?: FreezeGuard;
  guardContracts: FractalGuardContracts;
}

export function ManageDAOMenu({
  parentAddress,
  safeAddress,
  freezeGuard,
  guardContracts,
}: IManageDAOMenu) {
  const { push } = useRouter();
  const currentTime = BigNumber.from(useBlockTimestamp());
  const { handleClawBack } = useClawBack({
    parentAddress,
    childSafeAddress: safeAddress,
  });
  const {
    governance: { type },
  } = useFractal();

  const options = useMemo(() => {
    const createSubDAOOption = {
      optionKey: 'optionCreateSubDAO',
      onClick: () => push(DAO_ROUTES.newSubDao.relative(safeAddress)),
    };

    const manageSignersOption = {
      optionKey: 'optionManageSigners',
      onClick: () => push(DAO_ROUTES.manageSigners.relative(safeAddress)),
    };
    if (
      freezeGuard &&
      freezeGuard.freezeProposalCreatedTime &&
      freezeGuard.freezeProposalPeriod &&
      freezeGuard.freezePeriod &&
      !isWithinFreezeProposalPeriod(
        freezeGuard.freezeProposalCreatedTime,
        freezeGuard.freezeProposalPeriod,
        currentTime
      ) &&
      !isWithinFreezePeriod(
        freezeGuard.freezeProposalCreatedTime,
        freezeGuard.freezePeriod,
        currentTime
      ) &&
      freezeGuard.userHasVotes
    ) {
      const freezeOption = {
        optionKey: 'optionInitiateFreeze',
        onClick: () => guardContracts.vetoVotingContract?.asSigner.castFreezeVote(),
      };
      if (type === StrategyType.GNOSIS_SAFE) {
        return [createSubDAOOption, manageSignersOption, freezeOption];
      } else {
        return [createSubDAOOption, freezeOption];
      }
    } else if (
      freezeGuard &&
      freezeGuard.freezeProposalCreatedTime &&
      freezeGuard.freezePeriod &&
      isWithinFreezePeriod(
        freezeGuard.freezeProposalCreatedTime,
        freezeGuard.freezePeriod,
        currentTime
      ) &&
      freezeGuard.isFrozen &&
      freezeGuard.userHasVotes
    ) {
      const clawBackOption = {
        optionKey: 'optionInitiateClawback',
        onClick: handleClawBack,
      };

      return [clawBackOption];
    } else {
      if (type === StrategyType.GNOSIS_SAFE) {
        return [createSubDAOOption, manageSignersOption];
      } else {
        return [createSubDAOOption];
      }
    }
  }, [
    freezeGuard,
    currentTime,
    push,
    safeAddress,
    type,
    guardContracts.vetoVotingContract?.asSigner,
    handleClawBack,
  ]);

  return (
    <OptionMenu
      trigger={
        <VEllipsis
          boxSize="1.5rem"
          mt="0.25rem"
        />
      }
      titleKey="titleManageDAO"
      options={options}
      namespace="menu"
    />
  );
}
