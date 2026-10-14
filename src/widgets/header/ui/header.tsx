import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Lock } from 'lucide-react';

import { LogoLink } from '@/widgets/logo-link';

interface HeaderProps {
  title: React.ReactNode;
  updatedAt?: string;
  approvedAt?: string;
  figmaUrl?: string;
}

export function Header({ title, updatedAt, approvedAt, figmaUrl }: HeaderProps) {
  const hasMeta = Boolean(updatedAt || approvedAt);

  return (
    <Grid
      templateColumns="1fr auto 1fr"
      alignItems="center"
      w="100%"
      gap="4"
    >
      <Box justifySelf="start">
        <LogoLink />
      </Box>

      <Flex direction="column" align="center" gap="1" textAlign="center">
        <Text
          as="h1"
          color="white"
          fontSize="20px"
          fontWeight="600"
          lineHeight="1.3"
        >
          {title}
        </Text>

        {hasMeta ? (
          <Flex align="center" gap="2" flexWrap="wrap" justify="center">
            {updatedAt ? (
              <Text color="#ffffff80" fontSize="12px" fontWeight="400">
                Обновлено: {updatedAt}
              </Text>
            ) : null}

            {updatedAt && approvedAt ? (
              <Text color="#ffffff80" fontSize="12px" fontWeight="400">
                |
              </Text>
            ) : null}

            {approvedAt ? (
              <Flex align="center" gap="1.5" color="#24a047">
                <Lock size={12} />
                <Text fontSize="12px" fontWeight="400">
                  Утверждено {approvedAt}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        ) : null}
      </Flex>

      <Box justifySelf="end">
        {figmaUrl ? (
          <Box
            as="a"
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            display="flex"
            alignItems="center"
            gap="8px"
            px="16px"
            py="8px"
            bg="#ffffff0d"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="8px"
            color="white"
            fontSize="14px"
            textDecoration="none"
            cursor="pointer"
            backdropFilter="blur(10px)"
            transition="all 0.2s"
            _hover={{ borderColor: 'whiteAlpha.500', bg: 'whiteAlpha.100' }}
          >
            Открыть в Figma
          </Box>
        ) : null}
      </Box>
    </Grid>
  );
}
