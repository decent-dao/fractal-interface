import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { LabelWrapper } from '@decent-org/fractal-ui';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';
import { useFormHelpers } from '../../hooks/utils/useFormHelpers';
import ContentBanner from '../ui/ContentBanner';
import ContentBox from '../ui/ContentBox';
import ContentBoxTitle from '../ui/ContentBoxTitle';
import InputBox from '../ui/forms/InputBox';
import { useCreator } from './provider/hooks/useCreator';
import { CreatorProviderActions, GovernanceTypes } from './provider/types';

function GuardDetails() {
  const {
    state: { vetoGuard, governance },
    dispatch,
  } = useCreator();

  const { restrictChars } = useFormHelpers();

  const fieldUpdate = (value: any, field: string) => {
    dispatch({
      type: CreatorProviderActions.UPDATE_GUARD_CONFIG,
      payload: {
        [field]: value,
      },
    });
  };
  const onExecutionPeriodChange = (executionPeriod: string) => {
    const newExecutionPeriod = BigNumber.from(executionPeriod || 0);
    fieldUpdate(newExecutionPeriod, 'executionPeriod');
  };
  const onTimelockPeriodChange = (timelockPeriod: string) => {
    const newTimelockPeriod = BigNumber.from(timelockPeriod || 0);
    fieldUpdate(newTimelockPeriod, 'timelockPeriod');
  };
  const onVetoVotesThresholdChange = (vetoVotesThreshold: string) => {
    const newVetoVotesThreshold = BigNumber.from(vetoVotesThreshold || 0);
    fieldUpdate(newVetoVotesThreshold, 'vetoVotesThreshold');
  };
  const onFreezeVotesThresholdChange = (freezeVotesThreshold: string) => {
    const newFreezeVotesThreshold = BigNumber.from(freezeVotesThreshold || 0);
    fieldUpdate(newFreezeVotesThreshold, 'freezeVotesThreshold');
  };

  const onFreezeProposalPeriodChange = (freezeProposalPeriod: string) => {
    const newFreezePeriod = BigNumber.from(freezeProposalPeriod || 0);
    fieldUpdate(newFreezePeriod, 'freezeProposalPeriod');
  };

  const onFreezePeriodChange = (freezePeriod: string) => {
    const newFreezePeriod = BigNumber.from(freezePeriod || 0);
    fieldUpdate(newFreezePeriod, 'freezePeriod');
  };

  const { t } = useTranslation(['common', 'daoCreate']);
  const votes = t('votes');
  const seconds = t('seconds');
  return (
    <Box>
      <ContentBox>
        <ContentBoxTitle>{t('titleGuardConfig', { ns: 'daoCreate' })}</ContentBoxTitle>
        <InputBox>
          <LabelWrapper
            label={t('labelExecutionPeriod', { ns: 'daoCreate' })}
            subLabel={t('helperExecutionPeriod', { ns: 'daoCreate' })}
          >
            <NumberInput
              value={vetoGuard.executionPeriod.toString()}
              onChange={onExecutionPeriodChange}
              min={1}
              precision={0}
              data-testid="guardConfig-executionDetails"
              onKeyDown={restrictChars}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement mr="4">{seconds}</InputRightElement>
              </InputGroup>
            </NumberInput>
          </LabelWrapper>
          <Text
            textStyle="text-sm-sans-regular"
            color="gold.400"
          >
            {t('exampleExecutionPeriod', { ns: 'daoCreate' })}
          </Text>
        </InputBox>
        {governance === GovernanceTypes.GNOSIS_SAFE && (
          <InputBox>
            <LabelWrapper
              label={t('labelTimelockPeriod', { ns: 'daoCreate' })}
              subLabel={t('helperTimelockPeriod', { ns: 'daoCreate' })}
            >
              <NumberInput
                value={vetoGuard.timelockPeriod.toString()}
                onChange={onTimelockPeriodChange}
                min={1}
                precision={0}
                data-testid="guardConfig-executionDetails"
                onKeyDown={restrictChars}
              >
                <InputGroup>
                  <NumberInputField />
                  <InputRightElement mr="4">{seconds}</InputRightElement>
                </InputGroup>
              </NumberInput>
            </LabelWrapper>
            <Text
              textStyle="text-sm-sans-regular"
              color="gold.400"
            >
              {t('exampleTimelockPeriod', { ns: 'daoCreate' })}
            </Text>
          </InputBox>
        )}
        <InputBox>
          <LabelWrapper
            label={t('labelVetoVotesThreshold', { ns: 'daoCreate' })}
            subLabel={t('helperVetoVotesThreshold', { ns: 'daoCreate' })}
          >
            <NumberInput
              value={vetoGuard.vetoVotesThreshold.toString()}
              onChange={onVetoVotesThresholdChange}
              min={1}
              precision={0}
              data-testid="guardConfig-vetoVotesThreshold"
              onKeyDown={restrictChars}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement mr="4">{votes}</InputRightElement>
              </InputGroup>
            </NumberInput>
          </LabelWrapper>
        </InputBox>
        <InputBox>
          <LabelWrapper
            label={t('labelFreezeVotesThreshold', { ns: 'daoCreate' })}
            subLabel={t('helperFreezeVotesThreshold', { ns: 'daoCreate' })}
          >
            <NumberInput
              value={vetoGuard.freezeVotesThreshold.toString()}
              onChange={onFreezeVotesThresholdChange}
              precision={0}
              data-testid="guardConfig-freezeVotesThreshold"
              onKeyDown={restrictChars}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement mr="4">{votes}</InputRightElement>
              </InputGroup>
            </NumberInput>
          </LabelWrapper>
        </InputBox>
        <InputBox>
          <LabelWrapper
            label={t('labelFreezeProposalPeriod', { ns: 'daoCreate' })}
            subLabel={t('helperFreezeProposalPeriod', { ns: 'daoCreate' })}
          >
            <NumberInput
              value={vetoGuard.freezeProposalPeriod.toString()}
              onChange={onFreezeProposalPeriodChange}
              min={1}
              precision={0}
              data-testid="guardConfig-freezeProposalBlockDuration"
              onKeyDown={restrictChars}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement mr="4">{seconds}</InputRightElement>
              </InputGroup>
            </NumberInput>
          </LabelWrapper>
          <Text
            textStyle="text-sm-sans-regular"
            color="gold.400"
          >
            {t('exampleFreezeProposalPeriod', { ns: 'daoCreate' })}
          </Text>
        </InputBox>
        <InputBox>
          <LabelWrapper
            label={t('labelFreezePeriod', { ns: 'daoCreate' })}
            subLabel={t('helperFreezePeriod', { ns: 'daoCreate' })}
          >
            <NumberInput
              value={vetoGuard.freezePeriod.toString()}
              onChange={onFreezePeriodChange}
              min={1}
              precision={0}
              data-testid="guardConfig-freezeBlockDuration"
              onKeyDown={restrictChars}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement mr="4">{seconds}</InputRightElement>
              </InputGroup>
            </NumberInput>
          </LabelWrapper>
          <Text
            textStyle="text-sm-sans-regular"
            color="gold.400"
          >
            {t('exampleFreezePeriod', { ns: 'daoCreate' })}
          </Text>
        </InputBox>
      </ContentBox>
      <ContentBanner description={t('vetoGuardDescription', { ns: 'daoCreate' })} />
    </Box>
  );
}

export default GuardDetails;