import { Box } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import type { ReactNode } from 'react';

import { Logo } from '@/shared/ui';

import { projectsRoute } from '../model';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      minH="100vh"
      fontFamily="body"
      css={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          'radial-gradient(#ffffff1a 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        px="4"
        py="5"
        zIndex="1"
      >
        <Box
          asChild
          display="block"
          w="fit-content"
          textDecoration="none"
          color="heading"
        >
          <Link to={projectsRoute}>
            <Logo />
          </Link>
        </Box>
      </Box>
      {children}
    </Box>
  );
}
