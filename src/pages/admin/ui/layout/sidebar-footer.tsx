import { Flex } from '@chakra-ui/react';

import { settingsNavItem } from './nav-items';
import { SidebarNavItem } from './sidebar-nav-item';

export function SidebarFooter() {
  return (
    <Flex direction="column" gap="1" pt="4">
      <SidebarNavItem item={settingsNavItem} />
    </Flex>
  );
}
