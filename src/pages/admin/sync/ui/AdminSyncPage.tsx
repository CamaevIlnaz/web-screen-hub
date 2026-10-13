import { Box, Breadcrumb, Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { RefreshCw } from 'lucide-react';

import { Title } from '@/shared/ui';

import { adminProjectsRoute } from '../../projects';
import { $isLoading, $syncProjects, refreshRequested } from '../model';
import { ProjectSyncCard } from './project-sync-card';

export const AdminSyncPage = () => {
  const [syncProjects, isLoading, refresh] = useUnit([
    $syncProjects,
    $isLoading,
    refreshRequested,
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
            <Breadcrumb.CurrentLink>Синхронизация</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Flex
        align={{ base: 'stretch', md: 'flex-start' }}
        justify="space-between"
        gap="4"
        direction={{ base: 'column', md: 'row' }}
        mb="6"
      >
        <Box>
          <Title size="lg">Автосинхронизация</Title>
          <Text mt="1" fontSize="sm" color="muted" maxW="720px">
            Мониторинг синхронизации проектов и разделов в Figma. Ошибки
            отображаются по проектам и внутри разделов.
          </Text>
        </Box>

        <Button
          variant="outline"
          borderRadius="md"
          borderColor="border"
          color="text"
          bg="panel"
          fontWeight="semibold"
          px="4"
          loading={isLoading}
          onClick={() => refresh()}
          _hover={{ bg: 'panelAlt' }}
        >
          <RefreshCw size={16} strokeWidth={1.75} />
          Обновить статус
        </Button>
      </Flex>

      {isLoading && syncProjects.length === 0 ? (
        <Flex align="center" justify="center" py="16">
          <Spinner size="md" color="primary" />
        </Flex>
      ) : null}

      {!isLoading && syncProjects.length === 0 ? (
        <Flex align="center" justify="center" py="16">
          <Text fontSize="sm" color="muted">
            Проекты не найдены
          </Text>
        </Flex>
      ) : null}

      <Stack gap="4">
        {syncProjects.map((item) => (
          <ProjectSyncCard key={item.project.id} item={item} />
        ))}
      </Stack>
    </Box>
  );
};
