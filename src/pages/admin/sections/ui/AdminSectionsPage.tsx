import { Box, Breadcrumb, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { sectionModel } from '@/entities/section';
import { Title } from '@/shared/ui';

import { adminProjectsRoute } from '../../projects';
import { $project, refreshClicked, searchInputChanged } from '../model';
import { SectionsTable } from './sections-table';

export const AdminSectionsPage = () => {
  const [project, sections, search, isLoading, onSearchChange, onRefresh] =
    useUnit([
      $project,
      sectionModel.$sections,
      sectionModel.$search,
      sectionModel.$isLoading,
      searchInputChanged,
      refreshClicked,
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
            <Breadcrumb.CurrentLink>
              {project?.name ?? 'Разделы'}
            </Breadcrumb.CurrentLink>
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
          <Title size="lg">Разделы</Title>
          <Text mt="1" fontSize="sm" color="muted">
            Список разделов выбранного проекта.
          </Text>
        </Box>
      </Flex>

      <SectionsTable
        sections={sections}
        search={search}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
        onRefresh={onRefresh}
      />
    </Box>
  );
};
