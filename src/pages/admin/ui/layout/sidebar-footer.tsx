import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { sessionModel } from '@/entities/session';

export function SidebarFooter() {
  const [user, logout, isLoggingOut] = useUnit([
    sessionModel.$user,
    sessionModel.logoutRequested,
    sessionModel.logoutFx.pending,
  ]);
  const name = user?.name ?? '';

  return (
    <Flex
      align="center"
      gap="3"
      mt="auto"
      pt="4"
      px="2"
      borderTop="1px solid"
      borderColor="border"
      flexShrink={0}
    >
      <Avatar.Root size="sm" bg="#c5d8ff" color="brand" flexShrink={0}>
        <Avatar.Fallback name={name}>
          {name.charAt(0).toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <Text fontSize="sm" color="text" flex="1" minW="0" truncate title={name}>
        {name}
      </Text>
      <Button
        type="button"
        variant="plain"
        h="9"
        minW="0"
        px="0"
        fontSize="sm"
        fontWeight="normal"
        color="brand"
        flexShrink={0}
        disabled={isLoggingOut}
        onClick={() => logout()}
        _hover={{ opacity: 0.8 }}
      >
        Выход
      </Button>
    </Flex>
  );
}
