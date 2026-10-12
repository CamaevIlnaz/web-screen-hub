import { type ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from './sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Flex h="100vh" bg="page" fontFamily="body" overflow="hidden">
      <Sidebar />
      <Flex direction="column" flex="1" minW="0">
        <Box as="main" flex="1" minH="0" overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
