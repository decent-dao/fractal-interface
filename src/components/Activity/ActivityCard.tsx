import { Box, Flex, HStack, Text, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityBox } from '../ui/containers/ActivityBox';

interface IActivityCard {
  eventDate?: string;
  eventDateLabel?: string;
  description: ReactNode;
  RightElement?: ReactNode;
  Badge?: ReactNode;
  boxBorderColor?: string;
  isSnapshot?: boolean;
}

export function ActivityCard({
  Badge,
  eventDate,
  eventDateLabel,
  description,
  RightElement,
  boxBorderColor,
  isSnapshot,
}: IActivityCard) {
  const { t } = useTranslation('common');

  return (
    <ActivityBox borderColor={boxBorderColor}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Flex flexDirection="column">
          <Flex
            color="sand.700"
            alignItems="center"
            gap="1rem"
            mb="1rem"
          >
            {Badge}
            {isSnapshot && (
              <Image
                src="/images/snapshot-icon-fill.svg"
                alt={t('snapshotIconAlt')}
                ml={1}
              />
            )}
          </Flex>
          <Box>{description}</Box>
          {eventDate && (
            <Flex
              alignItems="center"
              gap="0.5rem"
            >
              <Text
                textStyle="text-base-sans-regular"
                color="chocolate.300"
              >
                {eventDateLabel} {eventDate}
              </Text>
            </Flex>
          )}
        </Flex>
        {RightElement}
      </HStack>
    </ActivityBox>
  );
}
