import { Flex, Input } from '@chakra-ui/react';
import { Field, FieldAttributes } from 'formik';
import { useTranslation } from 'react-i18next';
import { useFormHelpers } from '../../../hooks/utils/useFormHelpers';
import { LabelComponent } from '../../ProposalCreate/InputComponent';
import ContentBoxTitle from '../../ui/containers/ContentBox/ContentBoxTitle';
import { StepButtons } from '../StepButtons';
import { StepWrapper } from '../StepWrapper';
import { BigNumberInput } from '../refactor/BigNumberInput';
import { ICreationStepProps, CreatorSteps } from '../types';
import { UsulTokenAllocations } from './UsulTokenAllocations';

export function UsulTokenDetails(props: ICreationStepProps) {
  const { values, setFieldValue } = props;
  const { t } = useTranslation('daoCreate');
  const { restrictChars } = useFormHelpers();
  return (
    <StepWrapper titleKey="titleUsulConfig">
      <Flex
        flexDirection="column"
        gap={8}
      >
        <ContentBoxTitle>{t('titleTokenParams')}</ContentBoxTitle>
        <LabelComponent
          label={t('labelTokenName')}
          helper={t('helperTokenName')}
          isRequired
        >
          <Field name="govToken.tokenName">
            {({ field }: FieldAttributes<any>) => (
              <Input
                {...field}
                data-testid="tokenVoting-tokenNameInput"
                minWidth="50%"
              />
            )}
          </Field>
        </LabelComponent>
        <LabelComponent
          label={t('labelTokenSymbol')}
          helper={t('helperTokenSymbol')}
          isRequired
        >
          <Field name="govToken.tokenSymbol">
            {({ field }: FieldAttributes<any>) => (
              <Input
                {...field}
                data-testid="tokenVoting-tokenSymbolInput"
              />
            )}
          </Field>
        </LabelComponent>
        <LabelComponent
          label={t('labelTokenSupply')}
          helper={t('helperTokenSupply')}
          isRequired
        >
          <BigNumberInput
            value={values.govToken.tokenSupply.value}
            onChange={valuePair => setFieldValue('govToken.tokenSupply', valuePair)}
            data-testid="tokenVoting-tokenSupplyInput"
            onKeyDown={restrictChars}
          />
        </LabelComponent>
        <UsulTokenAllocations {...props} />
        <StepButtons
          {...props}
          prevStep={CreatorSteps.ESSENTIALS}
          nextStep={CreatorSteps.GOV_CONFIG}
        />
      </Flex>
    </StepWrapper>
  );
}
