import { Button } from '@chakra-ui/react';
import { ArrowAngleUp } from '@decent-org/fractal-ui';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { TxProposal } from '../../providers/Fractal/types';
import { DEFAULT_DATE_FORMAT } from '../../utils/numberFormats';
import EtherscanLinkAddress from '../ui/EtherscanLinkAddress';
import { Badge } from '../ui/badges/Badge';
import { ActivityCard } from './ActivityCard';
import { ActivityDescriptionModule } from './ActivityDescriptionModule';

export function ActivityModule({ activity }: { activity: TxProposal }) {
  const { t } = useTranslation('common');
  return (
    <ActivityCard
      Badge={
        <Badge
          size="base"
          labelKey={activity.state}
        />
      }
      description={<ActivityDescriptionModule activity={activity} />}
      RightElement={
        !!activity.transactionHash && (
          <EtherscanLinkAddress
            path="tx"
            address={activity.transactionHash}
          >
            <Button
              variant="text"
              size="lg"
              px="0px"
              rightIcon={<ArrowAngleUp boxSize="1.5rem" />}
            >
              {t('labelEtherscan')}
            </Button>
          </EtherscanLinkAddress>
        )
      }
      eventDate={format(activity.eventDate, DEFAULT_DATE_FORMAT)}
    />
  );
}