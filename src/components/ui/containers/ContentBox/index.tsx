import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode, MouseEvent } from 'react';
import ContentBoxTitle from './ContentBoxTitle';

interface ContentBoxProps {
  title?: string;
  children: ReactNode;
  containerBoxProps?: BoxProps;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function ContentBox({ title, children, containerBoxProps, onClick }: ContentBoxProps) {
  return (
    <Box
      rounded="lg"
      p="1rem 1.5rem"
      my="4"
      bg="black.900"
      {...containerBoxProps}
      cursor={!!onClick ? 'pointer' : 'default'}
      onClick={onClick}
    >
      {title && <ContentBoxTitle>{title}</ContentBoxTitle>}
      <Box
        px="2"
        py="4"
      >
        {children}
      </Box>
    </Box>
  );
}

export default ContentBox;
