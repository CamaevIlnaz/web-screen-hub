import { Box } from '@chakra-ui/react';

import { Logo } from '@/shared/ui';

export function SidebarHeader() {
  return (
    <Box mb="8" px="1">
      <Logo width="140px" />
    </Box>
  );
}
