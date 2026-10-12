import { Box, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { projectModel } from '@/entities/project';
import { CreateProjectButton, CreateProjectDialog } from '@/features/create-project';
import { DeleteProjectDialog } from '@/features/delete-project';
import { EditProjectDialog } from '@/features/edit-project';
import { Title } from '@/shared/ui';

import { refreshClicked, searchInputChanged } from '../model';
import { ProjectsTable } from './projects-table';

export const AdminProjectsPage = () => {
  const [projects, search, isLoading, onSearchChange, onRefresh] = useUnit([
    projectModel.$projects,
    projectModel.$search,
    projectModel.$isLoading,
    searchInputChanged,
    refreshClicked,
  ]);

  return (
    <Box px="8" py="8">
      <Flex
        align={{ base: 'stretch', md: 'flex-start' }}
        justify="space-between"
        gap="4"
        direction={{ base: 'column', md: 'row' }}
        mb="6"
      >
        <Box>
          <Title size="lg">Проекты</Title>
          <Text mt="1" fontSize="sm" color="muted">
            Список проектов, загруженных из Figma.
          </Text>
        </Box>

        <CreateProjectButton />
      </Flex>

      <ProjectsTable
        projects={projects}
        search={search}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
        onRefresh={onRefresh}
      />

      <CreateProjectDialog />
      <EditProjectDialog />
      <DeleteProjectDialog />
    </Box>
  );
};
