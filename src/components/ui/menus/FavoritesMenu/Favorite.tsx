import { MenuItem, Text } from '@chakra-ui/react';
import { StarGoldSolid } from '@decent-org/fractal-ui';
import { useNavigate } from 'react-router-dom';
import { DAO_ROUTES } from '../../../../constants/routes';
import useDAOName from '../../../../hooks/DAO/useDAOName';
import { useFractal } from '../../../../providers/App/AppProvider';

interface IFavorite {
  address: string;
}
export function Favorite({ address }: IFavorite) {
  const { daoRegistryName } = useDAOName({ address });
  const { action } = useFractal();
  const navigate = useNavigate();

  const onClickNav = () => {
    action.resetDAO();
    navigate(DAO_ROUTES.dao.relative(address));
  };

  return (
    <MenuItem
      display="flex"
      alignItems="center"
      gap="2"
      my={1}
      width="full"
      px="0px"
      onClick={onClickNav}
      data-testid={'favorites-' + daoRegistryName}
    >
      <StarGoldSolid
        color="gold.500"
        _hover={{
          color: 'gold.500-hover',
        }}
      />
      <Text
        maxWidth="9rem"
        noOfLines={1}
        color="grayscale.100"
        textStyle="text-base-sans-medium"
        _hover={{
          color: 'gold.500-hover',
        }}
      >
        {daoRegistryName}
      </Text>
    </MenuItem>
  );
}
