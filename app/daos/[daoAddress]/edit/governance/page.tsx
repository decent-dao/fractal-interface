'use client';

import { Box } from '@chakra-ui/react';
import { CloseX } from '@decent-org/fractal-ui';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import DaoCreator from '../../../../../src/components/DaoCreator';
import { DAOCreateMode } from '../../../../../src/components/DaoCreator/formComponents/EstablishEssentials';
import { EmptyBox } from '../../../../../src/components/ui/containers/EmptyBox';
import PageHeader from '../../../../../src/components/ui/page/Header/PageHeader';
import { DAO_ROUTES } from '../../../../../src/constants/routes';
import useDeployAzorius from '../../../../../src/hooks/DAO/useDeployAzorius';
import { createAccountSubstring } from '../../../../../src/hooks/utils/useDisplayName';
import { useFractal } from '../../../../../src/providers/App/AppProvider';
import {
  DAOTrigger,
  AzoriusERC20DAO,
  AzoriusERC721DAO,
  GovernanceType,
} from '../../../../../src/types';

export default function ModifyGovernancePage() {
  const {
    node: { daoAddress, safe, daoName, daoSnapshotURL },
    governance: { type },
    readOnly: { user },
  } = useFractal();
  const { t } = useTranslation(['daoEdit', 'common', 'breadcrumbs']);
  const { push } = useRouter();
  const isMultisig = type === GovernanceType.MULTISIG;
  const isSigner = user.address && safe?.owners.includes(user.address);
  const deployAzorius = useDeployAzorius();

  const handleDeployAzorius: DAOTrigger = daoData => {
    deployAzorius(
      daoData as AzoriusERC20DAO | AzoriusERC721DAO,
      !daoName || createAccountSubstring(daoAddress!) === daoName,
      !daoSnapshotURL && !!daoData.snapshotURL,
    );
  };

  return (
    <Box>
      <PageHeader
        hasDAOLink
        ButtonIcon={CloseX}
        buttonVariant="secondary"
        buttonClick={() => push(DAO_ROUTES.dao.relative(daoAddress))}
        isButtonDisabled={false}
        breadcrumbs={[
          {
            terminus: t('modifyGovernance', { ns: 'breadcrumbs' }),
            path: '',
          },
        ]}
      />
      {isMultisig && isSigner ? (
        <DaoCreator
          pending={false}
          mode={DAOCreateMode.EDIT}
          deployDAO={handleDeployAzorius}
        />
      ) : (
        <EmptyBox emptyText={t('cannotModifyGovernance')} />
      )}
    </Box>
  );
}