import { Box, Divider, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { StyledBox } from './StyledBox';

export function TitledInfoBox({
  minWidth,
  title,
  titleTestId,
  children,
}: {
  minWidth?: { [key: string]: string };
  title?: string;
  titleTestId?: string;
  children?: ReactNode;
}) {
  return (
    <StyledBox
      flexGrow={1}
      minWidth={minWidth}
    >
      {title && (
        <Box>
          <Text
            data-testid={titleTestId}
            textStyle="text-base-sans-regular"
            color="grayscale.100"
            marginBottom="0.75rem"
          >
            {title}
          </Text>
          <Divider color="chocolate.700" />
        </Box>
      )}
      {children}
    </StyledBox>
  );
}
