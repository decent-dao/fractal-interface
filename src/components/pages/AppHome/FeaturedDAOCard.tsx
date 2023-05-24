import { Text, BoxProps, Image, HStack, Spacer, Flex, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DAO_ROUTES } from '../../../constants/routes';
import { StyledBox } from '../../ui/containers/StyledBox';
import ExternalLink from '../../ui/links/ExternalLink';

interface DAOFeatureProps extends BoxProps {
  iconSrc: string;
  title: string;
  desc: string;
  address: string;
}

export default function FeaturedDAOCard({
  iconSrc,
  title,
  desc,
  address,
  ...rest
}: DAOFeatureProps) {
  const { t } = useTranslation('home');
  return (
    <Box {...rest}>
      <StyledBox
        height="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <HStack paddingBottom="1rem">
            <Image
              width="1.5rem"
              height="1.5rem"
              src={iconSrc}
              alt={title}
            />
            <Text
              color="grayscale.100"
              textStyle="text-lg-mono-bold"
              paddingStart="1.25rem"
            >
              {title}
            </Text>
          </HStack>
          <Text
            marginBottom="0.5rem"
            color="grayscale.500"
          >
            {desc}
          </Text>
        </Box>
        <Flex>
          <Spacer />
          <ExternalLink
            alignSelf="end"
            textStyle="text-lg-mono-bold"
            href={DAO_ROUTES.dao.relative(address)}
          >
            {t('featureLink')}
          </ExternalLink>
        </Flex>
      </StyledBox>
    </Box>
  );
}
