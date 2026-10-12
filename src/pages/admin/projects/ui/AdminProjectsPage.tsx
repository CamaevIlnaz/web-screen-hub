import { Box, Flex, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import type { ReactNode } from 'react';

import { projectModel } from '@/entities/project';
import { CreateProjectButton, CreateProjectDialog } from '@/features/create-project';
import { DeleteProjectDialog } from '@/features/delete-project';
import { EditProjectDialog } from '@/features/edit-project';
import { Title } from '@/shared/ui';

import { searchInputChanged } from '../model';
import { ProjectsTable } from './projects-table';

interface AdminProjectsPageProps {
  children?: ReactNode;
}

export const AdminProjectsPage = ({ children }: AdminProjectsPageProps) => {
  const [projects, search, isLoading, onSearchChange] = useUnit([
    projectModel.$projects,
    projectModel.$search,
    projectModel.$isLoading,
    searchInputChanged,
  ]);

  if (children) {
    return children;
  }

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
      />

      <CreateProjectDialog />
      <EditProjectDialog />
      <DeleteProjectDialog />
    </Box>
  );
};
