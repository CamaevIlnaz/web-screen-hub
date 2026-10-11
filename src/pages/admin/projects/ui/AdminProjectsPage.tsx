import { Box, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { projectModel } from '@/entities/project';
import { CreateProjectButton, CreateProjectDialog } from '@/features/create-project';
import { DeleteProjectDialog } from '@/features/delete-project';
import { EditProjectDialog } from '@/features/edit-project';
import { Title } from '@/shared/ui';

import {
  $sortDirection,
  $sortedProjects,
  refreshClicked,
  searchInputChanged,
  sortToggled,
} from '../model';
import { ProjectsTable } from './projects-table';

export const AdminProjectsPage = () => {
  const [projects, search, isLoading, sortDirection, onSearchChange, onRefresh, onSortToggle] =
    useUnit([
      $sortedProjects,
      projectModel.$search,
      projectModel.$isLoading,
      $sortDirection,
      searchInputChanged,
      refreshClicked,
      sortToggled,
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
        sortDirection={sortDirection}
        onSearchChange={onSearchChange}
        onRefresh={onRefresh}
        onSortToggle={onSortToggle}
      />

      <CreateProjectDialog />
      <EditProjectDialog />
      <DeleteProjectDialog />
    </Box>
  );
};
