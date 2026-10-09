import { Flex } from '@chakra-ui/react';

import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';

export function Sidebar() {
  return (
    <Flex
      as="aside"
      direction="column"
      w="260px"
      flexShrink={0}
      h="100vh"
      bg="page"
      borderRight="1px solid"
      borderColor="border"
      py="6"
      px="4"
    >
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter />
    </Flex>
  );
}
