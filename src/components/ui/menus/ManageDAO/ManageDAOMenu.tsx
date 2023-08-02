import { VEllipsis } from '@decent-org/fractal-ui';
import {
  ERC20FreezeVoting,
  ERC721FreezeVoting,
  Azorius,
  ModuleProxyFactory,
} from '@fractal-framework/fractal-contracts';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useProvider } from 'wagmi';
import { DAO_ROUTES } from '../../../../constants/routes';
import { getEventRPC } from '../../../../helpers';
import {
  isWithinFreezePeriod,
  isWithinFreezeProposalPeriod,
} from '../../../../helpers/freezePeriodHelpers';
import useAddressERC721VotingTokens from '../../../../hooks/DAO/proposal/useAddressERC721VotingTokens';
import useSubmitProposal from '../../../../hooks/DAO/proposal/useSubmitProposal';
import useClawBack from '../../../../hooks/DAO/useClawBack';
import useBlockTimestamp from '../../../../hooks/utils/useBlockTimestamp';
import { useFractal } from '../../../../providers/App/AppProvider';
import {
  FractalGuardContracts,
  FractalNode,
  FreezeGuard,
  GovernanceSelectionType,
} from '../../../../types';
import { getAzoriusModuleFromModules } from '../../../../utils';
import { ModalType } from '../../modals/ModalProvider';
import { useFractalModal } from '../../modals/useFractalModal';
import { OptionMenu } from '../OptionMenu';

interface IManageDAOMenu {
  parentAddress?: string | null;
  fractalNode?: FractalNode;
  freezeGuard?: FreezeGuard;
  guardContracts?: FractalGuardContracts;
  governanceType?: GovernanceSelectionType;
}

/**
 * The dropdown (vertical ellipses) for managing a DAO.
 *
 * It is important to note that you cannot rely on the useFractal()
 * hook to supply information to this menu, as it is used within the
 * DAO hierarchy, for multiple DAO contexts.
 *
 * All info for this menu should be supplied in the constructor.
 */
export function ManageDAOMenu({
  parentAddress,
  freezeGuard,
  guardContracts,
  fractalNode,
}: IManageDAOMenu) {
  const [canUserCreateProposal, setCanUserCreateProposal] = useState(false);
  const [governanceType, setGovernanceType] = useState(GovernanceSelectionType.MULTISIG);
  const {
    readOnly: { user },
    node: { safe },
    governance: { type },
    baseContracts: {
      fractalAzoriusMasterCopyContract,
      zodiacModuleProxyFactoryContract,
      linearVotingERC721MasterCopyContract,
      linearVotingMasterCopyContract,
    },
  } = useFractal();
  const currentTime = BigNumber.from(useBlockTimestamp());
  const { push } = useRouter();
  const {
    network: { chainId },
  } = useProvider();
  const safeAddress = fractalNode?.daoAddress;

  const { getCanUserCreateProposal } = useSubmitProposal();
  const { totalVotingTokenAddresses, totalVotingTokenIds } = useAddressERC721VotingTokens(
    undefined,
    user.address,
    safeAddress
  );
  const { handleClawBack } = useClawBack({
    parentAddress,
    childSafeInfo: fractalNode,
  });

  useEffect(() => {
    const loadCanUserCreateProposal = async () => {
      if (safeAddress) {
        setCanUserCreateProposal(await getCanUserCreateProposal(safeAddress));
      }
    };

    loadCanUserCreateProposal();
  }, [safeAddress, getCanUserCreateProposal]);

  useEffect(() => {
    const loadGovernanceType = async () => {
      if (safe && safe.address && safe.address === safeAddress && type) {
        // Since safe.address (global scope DAO address) and safeAddress(Node provided to this component via props)
        // are the same - we can simply grab governance type from global scope and avoid double-fetching
        setGovernanceType(type);
      } else {
        if (fractalNode?.fractalModules) {
          let result = GovernanceSelectionType.MULTISIG;
          const azoriusModule = getAzoriusModuleFromModules(fractalNode?.fractalModules);
          if (!!azoriusModule) {
            const azoriusContract = {
              asProvider: fractalAzoriusMasterCopyContract.asProvider.attach(
                azoriusModule.moduleAddress
              ),
              asSigner: fractalAzoriusMasterCopyContract.asSigner.attach(
                azoriusModule.moduleAddress
              ),
            };
            const votingContractAddress = await getEventRPC<Azorius>(azoriusContract, chainId)
              .queryFilter((azoriusModule.moduleContract as Azorius).filters.EnabledStrategy())
              .then(strategiesEnabled => {
                return strategiesEnabled[0].args.strategy;
              });
            const rpc = getEventRPC<ModuleProxyFactory>(zodiacModuleProxyFactoryContract, chainId);
            const filter = rpc.filters.ModuleProxyCreation(votingContractAddress, null);
            const votingContractMasterCopyAddress = await rpc
              .queryFilter(filter)
              .then(proxiesCreated => {
                return proxiesCreated[0].args.masterCopy;
              });

            if (
              votingContractMasterCopyAddress === linearVotingMasterCopyContract.asProvider.address
            ) {
              result = GovernanceSelectionType.AZORIUS_ERC20;
            } else if (
              votingContractMasterCopyAddress ===
              linearVotingERC721MasterCopyContract.asProvider.address
            ) {
              result = GovernanceSelectionType.AZORIUS_ERC721;
            }
          }

          setGovernanceType(result);
        }
      }
    };

    loadGovernanceType();
  }, [
    chainId,
    fractalAzoriusMasterCopyContract,
    linearVotingERC721MasterCopyContract,
    linearVotingMasterCopyContract,
    fractalNode,
    safe,
    safeAddress,
    type,
    zodiacModuleProxyFactoryContract,
  ]);

  const handleNavigateToSettings = useCallback(
    () => push(DAO_ROUTES.settings.relative(safeAddress)),
    [push, safeAddress]
  );

  const handleModifyGovernance = useFractalModal(ModalType.CONFIRM_MODIFY_GOVERNANCE);

  const options = useMemo(() => {
    const createSubDAOOption = {
      optionKey: 'optionCreateSubDAO',
      onClick: () => push(DAO_ROUTES.newSubDao.relative(safeAddress)),
    };

    const freezeOption = {
      optionKey: 'optionInitiateFreeze',
      onClick: () => {
        const freezeVotingContract = guardContracts?.freezeVotingContract?.asSigner;
        if (freezeVotingContract) {
          if (governanceType === GovernanceSelectionType.AZORIUS_ERC20) {
            (freezeVotingContract as ERC20FreezeVoting).castFreezeVote();
          } else if (governanceType === GovernanceSelectionType.AZORIUS_ERC721) {
            (freezeVotingContract as ERC721FreezeVoting)['castFreezeVote(address[],uint256[])'](
              totalVotingTokenAddresses,
              totalVotingTokenIds
            );
          }
        }
      },
    };

    const clawBackOption = {
      optionKey: 'optionInitiateClawback',
      onClick: handleClawBack,
    };

    const modifyGovernanceOption = {
      optionKey: 'optionModifyGovernance',
      onClick: handleModifyGovernance,
    };

    const settingsOption = {
      optionKey: 'optionSettings',
      onClick: handleNavigateToSettings,
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
      if (governanceType === GovernanceSelectionType.MULTISIG) {
        return [createSubDAOOption, freezeOption, modifyGovernanceOption, settingsOption];
      } else {
        return [createSubDAOOption, freezeOption, settingsOption];
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
      return [clawBackOption, settingsOption];
    } else {
      if (governanceType === GovernanceSelectionType.MULTISIG && canUserCreateProposal) {
        return [createSubDAOOption, modifyGovernanceOption, settingsOption];
      } else if (governanceType === GovernanceSelectionType.MULTISIG) {
        return [settingsOption];
      } else {
        return [createSubDAOOption, settingsOption];
      }
    }
  }, [
    freezeGuard,
    currentTime,
    push,
    safeAddress,
    governanceType,
    guardContracts?.freezeVotingContract?.asSigner,
    handleClawBack,
    canUserCreateProposal,
    handleModifyGovernance,
    handleNavigateToSettings,
    totalVotingTokenAddresses,
    totalVotingTokenIds,
  ]);

  return (
    <OptionMenu
      trigger={
        <VEllipsis
          boxSize="1.5rem"
          mt="0.25rem"
        />
      }
      titleKey={canUserCreateProposal ? 'titleManageDAO' : 'titleViewDAODetails'}
      options={options}
      namespace="menu"
    />
  );
}
