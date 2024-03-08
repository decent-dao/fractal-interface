import { Button } from '@chakra-ui/react';
import { SquareSolidArrowDown, ArrowAngleUp, SquareSolidArrowUp } from '@decent-org/fractal-ui';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useFractal } from '../../providers/App/AppProvider';
import { TreasuryActivity, ActivityEventType } from '../../types';
import { DEFAULT_DATE_FORMAT } from '../../utils/numberFormats';
import EtherscanLinkTransaction from '../ui/links/EtherscanLinkTransaction';
import { ActivityCard } from './ActivityCard';
import { ActivityDescription } from './ActivityDescription';

export function ActivityTreasury({ activity }: { activity: TreasuryActivity }) {
  const { t } = useTranslation();
  const {
    node: { daoAddress },
  } = useFractal();
  const eventDateLabel = t(
    activity.eventType === ActivityEventType.Treasury
      ? activity.transaction?.to === daoAddress
        ? 'received'
        : 'sent'
      : 'created',
  );

  return (
    <ActivityCard
      Badge={
        activity.isDeposit ? (
          <SquareSolidArrowDown color="sand.700" />
        ) : (
          <SquareSolidArrowUp color="sand.700" />
        )
      }
      description={<ActivityDescription activity={activity} />}
      RightElement={
        activity.transactionHash ? (
          <EtherscanLinkTransaction txHash={activity.transactionHash}>
            <Button
              variant="text"
              size="lg"
              px="0px"
              _hover={{ color: 'gold.500-hover' }}
              rightIcon={
                <ArrowAngleUp
                  boxSize="1.5rem"
                  fill="currentColor"
                />
              }
            >
              {t('labelEtherscan')}
            </Button>
          </EtherscanLinkTransaction>
        ) : undefined
      }
      eventDate={format(activity.eventDate, DEFAULT_DATE_FORMAT)}
      eventDateLabel={eventDateLabel}
    />
  );
}
