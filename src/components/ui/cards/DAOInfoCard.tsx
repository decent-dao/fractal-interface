import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import {
  ArrowDownSm,
  StarGoldSolid,
  StarOutline,
  Copy,
  ArrowRightSm,
} from '@decent-org/fractal-ui';
import useDAOName from '../../../hooks/DAO/useDAOName';
import useDisplayName from '../../../hooks/useDisplayName';
import { useCopyText } from '../../../hooks/utlities/useCopyText';
import { useFractal } from '../../../providers/fractal/hooks/useFractal';
import { ManageDAOMenu } from '../../menus/ManageDAO/ManageDAOMenu';
import { Option } from '../../menus/OptionMenu';

interface IDAOInfoCard {
  safeAddress: string;
  toggleExpansion?: () => void;
  expanded?: boolean;
  numberOfChildrenDAO?: number;
  viewChildren?: boolean;
  options?: Option[];
}

export function DAOInfoCard({
  safeAddress,
  toggleExpansion,
  expanded,
  numberOfChildrenDAO,
  options,
}: IDAOInfoCard) {
  const {
    account: {
      favorites: { isConnectedFavorited, toggleFavorite },
    },
  } = useFractal();
  const copyToClipboard = useCopyText();
  const { accountSubstring } = useDisplayName(safeAddress);
  const { daoRegistryName } = useDAOName({ address: safeAddress });
  return (
    <Flex
      justifyContent="space-between"
      w="full"
    >
      <Flex alignItems="center">
        {/* CARET */}
        {!!toggleExpansion && (
          <IconButton
            variant="ghost"
            minWidth="0px"
            aria-label="Favorite Toggle"
            icon={
              expanded ? (
                <ArrowDownSm
                  boxSize="1.5rem"
                  mr="1.5rem"
                />
              ) : (
                <ArrowRightSm
                  boxSize="1.5rem"
                  mr="1.5rem"
                />
              )
            }
            onClick={toggleExpansion}
          />
        )}
        {/* DAO NAME AND INFO */}
        <Flex
          flexDirection="column"
          gap="0.5rem"
        >
          <Flex
            alignItems="center"
            gap="1rem"
          >
            <Text
              as="h1"
              textStyle="text-2xl-mono-regular"
              color="grayscale.100"
            >
              {daoRegistryName}
            </Text>
            <IconButton
              variant="ghost"
              minWidth="0px"
              aria-label="Favorite Toggle"
              icon={
                isConnectedFavorited ? (
                  <StarGoldSolid boxSize="1.5rem" />
                ) : (
                  <StarOutline boxSize="1.5rem" />
                )
              }
              onClick={() => toggleFavorite(safeAddress)}
            />
            {!!numberOfChildrenDAO && (
              <Box
                bg="chocolate.500"
                borderRadius="4px"
                p="0.25rem 0.5rem"
              >
                <Text textStyle="text-sm-mono-semibold">{numberOfChildrenDAO}</Text>
              </Box>
            )}
          </Flex>
          <Flex
            alignItems="center"
            onClick={() => copyToClipboard(safeAddress)}
            gap="0.5rem"
          >
            <Text
              textStyle="text-base-mono-regular"
              color="grayscale.100"
            >
              {accountSubstring}
            </Text>
            <Copy />
          </Flex>
        </Flex>
      </Flex>
      {/* Veritical Elipsis */}
      {options && !!options.length && <ManageDAOMenu options={options} />}
    </Flex>
  );
}

export function DAONodeCard(props: IDAOInfoCard) {
  return (
    <Box
      h="6.75rem"
      bg="black.900-semi-transparent"
      p="1rem"
      borderRadius="0.5rem"
      w="full"
    >
      <DAOInfoCard {...props} />
    </Box>
  );
}
