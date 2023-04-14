'use client';

import { Box, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DaoNode } from '../../../../src/components/pages/DaoHierarchy/DaoNode';
import { BarLoader } from '../../../../src/components/ui/loaders/BarLoader';
import PageHeader from '../../../../src/components/ui/page/Header/PageHeader';
import ClientOnly from '../../../../src/components/ui/utils/ClientOnly';
import { HEADER_HEIGHT } from '../../../../src/constants/common';
import { useFractal } from '../../../../src/providers/App/AppProvider';

export default function HierarchyPage() {
  const {
    node: {
      daoAddress,
      nodeHierarchy: { parentAddress },
    },
  } = useFractal();
  const { t } = useTranslation(['breadcrubms']);

  if (!daoAddress) {
    return (
      <Center minH={`calc(100vh - ${HEADER_HEIGHT})`}>
        <BarLoader />
      </Center>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <PageHeader
          breadcrumbs={[
            {
              title: t('nodes', { ns: 'breadcrumbs' }),
              path: '',
            },
          ]}
        />
        <DaoNode
          safeAddress={parentAddress || daoAddress}
          trueDepth={0}
        />
      </Box>
    </ClientOnly>
  );
}
