import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      minH="100vh"
      fontFamily="body"
      p="7"
      css={{
        backgroundColor: "#0a0a0a",
        backgroundImage: 'radial-gradient(#ffffff1a 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {children}
    </Box>
  );
}
