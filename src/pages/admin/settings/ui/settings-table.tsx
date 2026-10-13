import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

import type { SettingResponseDto } from '@/entities/setting';

import { SettingRow } from './setting-row';

interface SettingsTableProps {
  settings: SettingResponseDto[];
  isLoading: boolean;
}

export function SettingsTable({ settings, isLoading }: SettingsTableProps) {
  return (
    <Box
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      <Flex
        align="center"
        justify="space-between"
        gap="6"
        px="6"
        py="4"
        borderBottomWidth="1px"
        borderColor="border"
        display={{ base: 'none', md: 'flex' }}
      >
        <Text fontSize="sm" fontWeight="semibold" color="heading" flex="1">
          Ключ
        </Text>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="heading"
          minW="420px"
          w="420px"
        >
          Значение
        </Text>
      </Flex>

      {isLoading && settings.length === 0 ? (
        <Flex align="center" justify="center" py="16">
          <Spinner size="md" color="primary" />
        </Flex>
      ) : null}

      {!isLoading && settings.length === 0 ? (
        <Flex align="center" justify="center" py="16">
          <Text fontSize="sm" color="muted">
            Настройки не найдены
          </Text>
        </Flex>
      ) : null}

      {settings.map((setting, index) => (
        <Box
          key={`${setting.key}-${String(setting.updatedAt ?? '')}`}
          borderTopWidth={index === 0 ? '0' : '1px'}
          borderColor="border"
        >
          <SettingRow setting={setting} />
        </Box>
      ))}
    </Box>
  );
}
