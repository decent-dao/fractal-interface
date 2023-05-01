import { Box } from '@chakra-ui/react';
import { Trash } from '@decent-org/fractal-ui';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_ROUTES, DAO_ROUTES } from '../../constants/routes';
import { useFractal } from '../../providers/App/AppProvider';
import PageHeader from '../ui/page/Header/PageHeader';

interface IStepWrapper {
  titleKey: string;
  isSubDAO?: boolean;
  isFormSubmitting?: boolean;
  children: ReactNode;
}

export function StepWrapper({ titleKey, isSubDAO, isFormSubmitting, children }: IStepWrapper) {
  const {
    node: { daoAddress },
  } = useFractal();
  const { t } = useTranslation(['daoCreate']);
  const { push } = useRouter();
  return (
    <Box>
      <PageHeader
        title={t(titleKey)}
        hasDAOLink={!!isSubDAO}
        breadcrumbs={[
          {
            terminus: t(!isSubDAO ? 'homeButtonCreate' : 'labelCreateSubDAOProposal'),
            path: '',
          },
        ]}
        ButtonIcon={Trash}
        buttonVariant="secondary"
        isButtonDisabled={isFormSubmitting}
        buttonClick={() =>
          push(!isSubDAO || !daoAddress ? BASE_ROUTES.landing : DAO_ROUTES.dao.relative(daoAddress))
        }
      />
      <Box
        bg="black.900-semi-transparent"
        rounded="md"
        mt={8}
        px={4}
        py={8}
      >
        {children}
      </Box>
    </Box>
  );
}
