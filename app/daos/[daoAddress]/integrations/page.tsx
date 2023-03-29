'use client';

import { Box, Button, Show } from '@chakra-ui/react';
import { AddPlus } from '@decent-org/fractal-ui';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import Integrations from '../../../../src/components/Integrations';
import PageHeader from '../../../../src/components/ui/page/Header/PageHeader';
import { DAO_ROUTES } from '../../../../src/constants/routes';
import { useFractal } from '../../../../src/providers/Fractal/hooks/useFractal';
import { GovernanceTypes } from '../../../../src/types';

export default function IntegrationsPage() {
  const { t } = useTranslation();
  const {
    governance: { type },
    gnosis: {
      safe: { owners, address },
    },
  } = useFractal();
  const { address: account } = useAccount();
  const showCreateButton =
    type === GovernanceTypes.GNOSIS_SAFE_USUL ? true : owners?.includes(account || '');

  return (
    <Box>
      <PageHeader
        breadcrumbs={[
          {
            title: t('integrations', { ns: 'breadcrumbs' }),
            path: '',
          },
        ]}
      >
        {showCreateButton && (
          <Link href={DAO_ROUTES.integrationNew.relative(address)}>
            <Button minW={0}>
              <AddPlus />
              <Show above="sm">{t('create')}</Show>
            </Button>
          </Link>
        )}
      </PageHeader>
      <Integrations />
    </Box>
  );
}
