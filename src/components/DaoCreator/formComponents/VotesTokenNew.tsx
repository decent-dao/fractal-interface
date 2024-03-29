import { Flex, Input, Divider } from '@chakra-ui/react';
import { Field, FieldAttributes } from 'formik';
import { useTranslation } from 'react-i18next';
import { useFormHelpers } from '../../../hooks/utils/useFormHelpers';
import { ICreationStepProps, CreatorSteps } from '../../../types';
import ContentBoxTitle from '../../ui/containers/ContentBox/ContentBoxTitle';
import { BigNumberInput } from '../../ui/forms/BigNumberInput';
import { LabelComponent } from '../../ui/forms/InputComponent';
import { StepButtons } from '../StepButtons';
import { AzoriusTokenAllocations } from './AzoriusTokenAllocations';

export function VotesTokenNew(props: ICreationStepProps) {
  const { values, handleChange, setFieldValue } = props;
  const { t } = useTranslation('daoCreate');
  const { restrictChars } = useFormHelpers();
  return (
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
        <Field name="erc20Token.tokenName">
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
        <Input
          name="erc20Token.tokenSymbol"
          value={values.erc20Token.tokenSymbol}
          onChange={handleChange}
          maxLength={6}
          data-testid="tokenVoting-tokenSymbolInput"
        />
      </LabelComponent>
      <LabelComponent
        label={t('labelTokenSupply')}
        helper={t('helperTokenSupply')}
        isRequired
      >
        <BigNumberInput
          value={values.erc20Token.tokenSupply.bigNumberValue}
          onChange={valuePair => setFieldValue('erc20Token.tokenSupply', valuePair)}
          data-testid="tokenVoting-tokenSupplyInput"
          onKeyDown={restrictChars}
        />
      </LabelComponent>
      <Divider color="chocolate.700" />
      <AzoriusTokenAllocations {...props} />
      <Divider
        color="chocolate.700"
        mb={4}
      />
      <StepButtons
        {...props}
        prevStep={CreatorSteps.ESSENTIALS}
        nextStep={CreatorSteps.AZORIUS_DETAILS}
      />
    </Flex>
  );
}
