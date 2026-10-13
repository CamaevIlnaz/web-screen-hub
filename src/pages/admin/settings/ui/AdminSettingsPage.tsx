import { Box, Breadcrumb, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { settingModel } from '@/entities/setting';
import { Title } from '@/shared/ui';

import { adminProjectsRoute } from '../../projects';
import { SettingsTable } from './settings-table';

export const AdminSettingsPage = () => {
  const [settings, isLoading] = useUnit([
    settingModel.$settings,
    settingModel.$isLoading,
  ]);

  return (
    <Box px="8" py="8">
      <Breadcrumb.Root mb="4">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link to={adminProjectsRoute}>Проекты</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Настройки</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Box mb="6">
        <Title size="lg">Настройки</Title>
        <Text mt="1" fontSize="sm" color="muted" maxW="720px">
          Системные настройки для интеграции и синхронизации с Figma. Изменения
          применяются для всех проектов.
        </Text>
      </Box>

      <SettingsTable settings={settings} isLoading={isLoading} />
    </Box>
  );
};
