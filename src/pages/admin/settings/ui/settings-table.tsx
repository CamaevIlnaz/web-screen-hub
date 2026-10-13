import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import type { SettingResponseDto } from '@/entities/setting';

import { $isCreateFormOpen, createFormOpened } from '../model';
import { CreateSettingRow } from './create-setting-row';
import { SettingRow } from './setting-row';

interface SettingsTableProps {
  settings: SettingResponseDto[];
  isLoading: boolean;
}

export function SettingsTable({ settings, isLoading }: SettingsTableProps) {
  const [isCreateFormOpen, openCreateForm] = useUnit([
    $isCreateFormOpen,
    createFormOpened,
  ]);

  const showEmptyState =
    !isLoading && settings.length === 0 && !isCreateFormOpen;

  return (
    <Box>
      <Box
        bg="panel"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="border"
        overflow="hidden"
      >
        <Flex
          align="center"
          gap="4"
          px="6"
          py="4"
          borderBottomWidth="1px"
          borderColor="border"
          display={{ base: 'none', md: 'flex' }}
        >
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="heading"
            flex="1"
            minW="0"
          >
            Ключ
          </Text>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="heading"
            flex="1.36"
            minW="0"
          >
            Значение
          </Text>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="heading"
            w="200px"
            textAlign="center"
            flexShrink={0}
          >
            Публичный
          </Text>
          <Box w="160px" flexShrink={0} />
        </Flex>

        {isLoading && settings.length === 0 && !isCreateFormOpen ? (
          <Flex align="center" justify="center" py="16">
            <Spinner size="md" color="primary" />
          </Flex>
        ) : null}

        {showEmptyState ? (
          <Flex align="center" justify="center" py="16">
            <Text fontSize="sm" color="muted">
              Настройки не найдены
            </Text>
          </Flex>
        ) : null}

        {settings.map((setting, index) => (
          <Box
            key={`${setting.key}-${String(setting.updatedAt ?? '')}-${String(setting.publish)}`}
            borderTopWidth={index === 0 ? '0' : '1px'}
            borderColor="border"
          >
            <SettingRow setting={setting} />
          </Box>
        ))}

        {isCreateFormOpen ? (
          <Box
            borderTopWidth={settings.length > 0 ? '1px' : '0'}
            borderColor="border"
          >
            <CreateSettingRow />
          </Box>
        ) : null}
      </Box>

      {!isCreateFormOpen ? (
        <Flex mt="4" justify="flex-start">
          <Button
            variant="outline"
            borderColor="border"
            color="heading"
            bg="panel"
            fontWeight="semibold"
            borderRadius="md"
            h="11"
            px="4"
            onClick={() => openCreateForm()}
            _hover={{ bg: 'panelAlt' }}
          >
            <Plus size={18} strokeWidth={2} />
            Добавить настройку
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
}
