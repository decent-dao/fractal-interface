import { Box, Flex, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { ArrowAngleUp, Burger } from '@decent-org/fractal-ui';
import { useTranslation } from 'react-i18next';
import useDAOMetadata from '../../../../hooks/DAO/useDAOMetadata';
import { useFractal } from '../../../../providers/App/AppProvider';
import ExternalLink from '../../../ui/links/ExternalLink';

export default function InfoHeader() {
  const {
    node: { daoName },
  } = useFractal();
  const daoMetadata = useDAOMetadata();
  const { t } = useTranslation();

  if (!daoMetadata) {
    return null;
  }

  return (
    <Flex
      bg={daoMetadata.headerBackground}
      justifyContent="center"
      alignItems="center"
      position="absolute"
      left="4.25rem"
      width="calc(100vw - 4.25rem)"
      paddingTop={2}
      paddingBottom={2}
      flexDirection="column"
    >
      <Image
        src={daoMetadata.logo}
        alt={`${daoName} logo`}
        width="60px"
        height="60px"
      />
      <Box marginTop={2}>
        <Menu>
          <MenuButton>
            <Flex alignItems="center">
              <Burger boxSize="1.5rem" />
              <Text
                textStyle="text-lg-mono-regular"
                ml={4}
              >
                {daoName}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList
            rounded="lg"
            shadow="menu-gold"
            mr={['auto', '1rem']}
            bg="grayscale.black"
            border="none"
            padding="1rem 1.5rem"
            zIndex={1000}
          >
            <Text
              textStyle="text-sm-sans-regular"
              color="chocolate.200"
              marginBottom="0.5rem"
            >
              {t('goTo')}
            </Text>
            <Flex
              gap={4}
              flexDirection="column"
            >
              {daoMetadata.links.map(link => (
                <Box key={link.url}>
                  <ExternalLink
                    href={link.url}
                    color="grayscale.100"
                  >
                    {link.title}{' '}
                    <ArrowAngleUp
                      boxSize="1.5rem"
                      fill="currentColor"
                    />
                  </ExternalLink>
                </Box>
              ))}
            </Flex>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
