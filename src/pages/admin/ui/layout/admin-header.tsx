import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { sessionModel, UserAvatar } from '@/entities/session';

export function AdminHeader() {
  const [user, logout] = useUnit([
    sessionModel.$user,
    sessionModel.logoutRequested,
  ]);

  return (
    <Flex
      as="header"
      align="center"
      justify="flex-end"
      h="16"
      px="8"
      flexShrink={0}
      bg="panel"
    >
      <Flex align="center" gap="3">
        <UserAvatar user={user} size="sm" />
        <Text fontSize="sm" fontWeight="medium" color="heading">
          {user?.name}
        </Text>
        <Box w="1px" h="5" bg="border" />
        <Button
          variant="plain"
          h="auto"
          minW="0"
          px="0"
          py="0"
          fontSize="sm"
          fontWeight="medium"
          color="brand"
          onClick={() => logout()}
          _hover={{ opacity: 0.8 }}
        >
          Выход
        </Button>
      </Flex>
    </Flex>
  );
}
