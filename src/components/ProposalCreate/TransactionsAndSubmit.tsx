import { Button, Text, VStack, Divider, Alert, AlertTitle } from '@chakra-ui/react';
import { Info } from '@decent-org/fractal-ui';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Transactions from '../../components/ProposalCreate/Transactions';
import { ProposalExecuteData } from '../../types/proposal';
import { TransactionData } from '../../types/transaction';

function TransactionsAndSubmit({
  show,
  addTransaction,
  pendingCreateTx,
  submitProposal,
  proposalData,
  successCallback,
  isCreateDisabled,
  transactions,
  setTransactions,
  removeTransaction,
}: {
  show: boolean | undefined;
  addTransaction: () => void;
  pendingCreateTx: boolean;
  submitProposal: ({
    proposalData,
    pendingToastMessage,
    failedToastMessage,
    successToastMessage,
    successCallback,
  }: {
    proposalData: ProposalExecuteData | undefined;
    pendingToastMessage: string;
    failedToastMessage: string;
    successToastMessage: string;
    successCallback?: ((daoAddress: string) => void) | undefined;
  }) => Promise<void>;
  proposalData: ProposalExecuteData | undefined;
  successCallback: () => void;
  isCreateDisabled: boolean;
  transactions: TransactionData[];
  setTransactions: Dispatch<SetStateAction<TransactionData[]>>;
  removeTransaction: (transactionNumber: number) => void;
}) {
  const { t } = useTranslation(['proposal', 'common']);

  if (!show) return null;

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
          removeTransaction={removeTransaction}
          pending={pendingCreateTx}
        />
      </form>
      <VStack
        align="left"
        spacing={6}
        pt={2}
      >
        <Button
          variant="text"
          onClick={addTransaction}
          disabled={pendingCreateTx}
          w="fit-content"
          pl={0}
        >
          {t('labelAddTransaction')}
        </Button>
        <Alert
          status="info"
          w="fit-content"
        >
          <Info boxSize="24px" />
          <AlertTitle>
            <Text
              textStyle="text-lg-mono-medium"
              whiteSpace="pre-wrap"
            >
              {t('transactionExecutionAlertMessage')}
            </Text>
          </AlertTitle>
        </Alert>
        <Divider color="chocolate.700" />
        <Button
          w="100%"
          onClick={() =>
            submitProposal({
              proposalData,
              pendingToastMessage: t('proposalCreatePendingToastMessage'),
              successToastMessage: t('proposalCreateSuccessToastMessage'),
              failedToastMessage: t('proposalCreateFailureToastMessage'),
              successCallback,
            })
          }
          disabled={isCreateDisabled}
        >
          {t('createProposal')}
        </Button>
      </VStack>
    </>
  );
}

export default TransactionsAndSubmit;