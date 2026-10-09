import { Box, Flex, Text, VStack } from '@chakra-ui/react';

export function SidebarHeader() {
  return (
    <Flex align="center" gap="3" mb="8" px="1">
      <Box
        w="9"
        h="9"
        borderRadius="lg"
        flexShrink={0}
        bg="brand"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="1.5"
          left="1.5"
          w="4"
          h="4"
          borderRadius="sm"
          bg="white"
          opacity={0.95}
        />
        <Box
          position="absolute"
          bottom="1.5"
          right="1.5"
          w="4"
          h="4"
          borderRadius="sm"
          bg="avatar"
          opacity={0.95}
        />
      </Box>
      <VStack align="start" gap="0">
        <Text
          fontSize="md"
          fontWeight="bold"
          color="heading"
          lineHeight="1.2"
          letterSpacing="-0.02em"
        >
          Design Viewer
        </Text>
        <Text fontSize="xs" color="muted" lineHeight="1.2">
          Admin
        </Text>
      </VStack>
    </Flex>
  );
}
