import { Box, Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logError } from '../../../helpers/errorLogging';
import { usePrepareProposal } from '../../../hooks/DAO/proposal/usePrepareProposal';
import useSubmitProposal from '../../../hooks/DAO/proposal/useSubmitProposal';
import { useFractal } from '../../../providers/App/AppProvider';
import { ProposalTemplate } from '../../../types/createProposalTemplate';
import { InputComponent } from '../forms/InputComponent';

interface IProposalTemplateModalProps {
  proposalTemplate: ProposalTemplate;
  onClose: () => void;
}

export default function ProposalTemplateModal({
  proposalTemplate: { title, description, transactions },
  onClose,
}: IProposalTemplateModalProps) {
  const [filledProposalTransactions, setFilledProposalTransactions] = useState(transactions);
  const { t } = useTranslation(['proposalTemplate', 'proposal']);
  const {
    node: { daoAddress, safe },
  } = useFractal();
  const { push } = useRouter();
  const { submitProposal, canUserCreateProposal } = useSubmitProposal();
  const { prepareProposal } = usePrepareProposal();

  const handleParameterChange = ({
    transactionIndex,
    parameterIndex,
    value,
  }: {
    transactionIndex: number;
    parameterIndex: number;
    value: string;
  }) => {
    // We probably could use Formik and Yup here
    // However constructing and validating form will be quite complicated and involving parsing user input
    // Thus, for now - we simply store form state through useState
    setFilledProposalTransactions(prevState =>
      prevState.map((transaction, txIndex) => {
        if (transactionIndex === txIndex) {
          return {
            ...transaction,
            parameters: transaction.parameters.map((parameter, paramIndex) => {
              if (paramIndex === parameterIndex) {
                return {
                  ...parameter,
                  value,
                };
              }
              return parameter;
            }),
          };
        }
        return transaction;
      })
    );
  };

  const successCallback = () => {
    if (daoAddress) {
      push(`/daos/${daoAddress}/proposals`);
      onClose();
    }
  };

  const handleSubmitProposal = async () => {
    const proposalMetadata = {
      title: `Proposal from ${title} template`,
      description,
      documentationUrl: '',
    };

    const proposalTransactions = filledProposalTransactions.map(
      ({ targetAddress, ethValue, functionName, parameters }) => ({
        targetAddress,
        ethValue,
        functionName,
        functionSignature: parameters
          .map((parameter, parameterIndex) => {
            if (parameterIndex !== parameters.length - 1) {
              return `${parameter.signature.trim()}, `;
            }
            return parameter.signature.trim();
          })
          .join(),
        parameters: parameters
          .map((parameter, parameterIndex) => {
            if (parameterIndex !== parameters.length - 1) {
              return `${parameter.value!.trim()}, `;
            }
            return parameter.value!.trim();
          })
          .join(),
      })
    );
    try {
      const proposalData = await prepareProposal({
        proposalMetadata,
        transactions: proposalTransactions,
      });

      submitProposal({
        proposalData,
        successCallback,
        pendingToastMessage: t('proposalCreatePendingToastMessage', { ns: 'proposal' }),
        successToastMessage: t('proposalCreateSuccessToastMessage', { ns: 'proposal' }),
        failedToastMessage: t('proposalCreateFailureToastMessage', { ns: 'proposal' }),
        nonce: safe?.nonce,
      });
    } catch (e) {
      logError('Error during submitting proposal from template', e);
    }
  };

  // The form is valid when there's no parameter without filled value
  const isValid = !filledProposalTransactions.find(
    transaction => !!transaction.parameters.find(parameter => !parameter.value)
  );

  return (
    <Box>
      <Text
        textStyle="text-sm-mono-regular"
        color="grayscale.100"
        marginBottom="1.5rem"
      >
        {description}
      </Text>
      <Divider color="chocolate.700" />
      {filledProposalTransactions.map((transaction, transactionIndex) => (
        <VStack key={transactionIndex}>
          {transaction.parameters.map((parameter, parameterIndex) => (
            <Flex
              key={parameterIndex}
              width="100%"
              flexWrap="wrap"
              marginTop="1.5rem"
            >
              <InputComponent
                label={parameter.signature}
                subLabel={parameter.label}
                value={parameter.value || ''}
                isRequired={!!parameter.label}
                inputContainerProps={{
                  width: '100%',
                }}
                gridContainerProps={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
                onChange={event =>
                  handleParameterChange({
                    transactionIndex,
                    parameterIndex,
                    value: event.target.value,
                  })
                }
              />
            </Flex>
          ))}
          {transaction.parameters.length > 0 && <Divider color="chocolate.700" />}
        </VStack>
      ))}
      <Button
        marginTop="1.5rem"
        width="100%"
        isDisabled={!isValid || !canUserCreateProposal}
        onClick={handleSubmitProposal}
      >
        {t('submitProposalFromTemplate')}
      </Button>
    </Box>
  );
}
