import { Box, Breadcrumb, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { groupModel } from '@/entities/group';
import { CreateGroupButton, CreateGroupDialog } from '@/features/create-group';
import { DeleteGroupDialog } from '@/features/delete-group';
import { EditGroupDialog } from '@/features/edit-group';
import { Title } from '@/shared/ui';

import { adminProjectsRoute } from '../../projects';
import { adminSectionsRoute } from '../../sections';
import { $project, $section, searchInputChanged } from '../model';
import { GroupsTable } from './groups-table';

export const AdminGroupsPage = () => {
  const [project, section, groups, search, isLoading, onSearchChange] = useUnit([
    $project,
    $section,
    groupModel.$groups,
    groupModel.$search,
    groupModel.$isLoading,
    searchInputChanged,
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
            {project ? (
              <Breadcrumb.Link asChild>
                <Link to={adminSectionsRoute} params={{ id: String(project.id) }}>
                  {project.name}
                </Link>
              </Breadcrumb.Link>
            ) : (
              <Breadcrumb.CurrentLink>Разделы</Breadcrumb.CurrentLink>
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>
              {section?.name ?? 'Группы'}
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
          <Title size="lg">Группы</Title>
          <Text mt="1" fontSize="sm" color="muted">
            Список групп выбранного раздела.
          </Text>
        </Box>

        {section ? <CreateGroupButton sectionId={section.id} /> : null}
      </Flex>

      <GroupsTable
        groups={groups}
        search={search}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
      />

      <CreateGroupDialog />
      <EditGroupDialog />
      <DeleteGroupDialog />
    </Box>
  );
};
