'use client';

import { Box, Button, Show } from '@chakra-ui/react';
import { AddPlus } from '@decent-org/fractal-ui';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import Proposals from '../../../../src/components/Proposals';
import { ModalType } from '../../../../src/components/ui/modals/ModalProvider';
import { useFractalModal } from '../../../../src/components/ui/modals/useFractalModal';
import PageHeader from '../../../../src/components/ui/page/Header/PageHeader';
import ClientOnly from '../../../../src/components/ui/utils/ClientOnly';
import { DAO_ROUTES } from '../../../../src/constants/routes';
import { useFractal } from '../../../../src/providers/App/AppProvider';
import { AzoriusGovernance, StrategyType } from '../../../../src/types';

export default function ProposalsPage() {
  const { t } = useTranslation(['common', 'proposal', 'breadcrumbs']);
  const {
    governance,
    node: { daoAddress, safe },
  } = useFractal();
  const { type } = governance;
  const { address: account } = useAccount();
  const delegate = useFractalModal(ModalType.DELEGATE);
  const showDelegate = useMemo(() => {
    if (type) {
      const azoriusGovernance = governance as AzoriusGovernance;
      if (type === StrategyType.GNOSIS_SAFE_USUL) {
        if (azoriusGovernance.votesToken && azoriusGovernance.votesToken.balance) {
          return azoriusGovernance.votesToken.balance.gt(0);
        }
      }
    }
    return false;
  }, [type, governance]);

  const showCreateButton =
    type === StrategyType.GNOSIS_SAFE_USUL ? true : safe?.owners.includes(account || '');

  return (
    <ClientOnly>
      <Box>
        <PageHeader
          breadcrumbs={[
            {
              title: t('proposals', { ns: 'breadcrumbs' }),
              path: '',
            },
          ]}
          buttonVariant="secondary"
          buttonText={showDelegate ? t('delegate') : undefined}
          buttonClick={showDelegate ? delegate : undefined}
          buttonTestId="link-delegate"
        >
          {showCreateButton && (
            <Link href={DAO_ROUTES.proposalNew.relative(daoAddress)}>
              <Button minW={0}>
                <AddPlus />
                <Show above="sm">{t('create')}</Show>
              </Button>
            </Link>
          )}
        </PageHeader>
        <Proposals />
      </Box>
    </ClientOnly>
  );
}
