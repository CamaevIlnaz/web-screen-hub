import { Box, Breadcrumb, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { frameModel } from '@/entities/frame';
import { versionModel } from '@/entities/version';
import { CreateFrameButton, CreateFrameDialog } from '@/features/create-frame';
import { CreateVersionDialog } from '@/features/create-version';
import { DeleteFrameDialog } from '@/features/delete-frame';
import { DeleteVersionDialog } from '@/features/delete-version';
import { EditFrameDialog } from '@/features/edit-frame';
import { Title } from '@/shared/ui';

import { adminGroupsRoute } from '../../groups';
import { adminProjectsRoute } from '../../projects';
import { adminSectionsRoute } from '../../sections';
import { getLatestVersionFilename } from '../lib';
import {
  $group,
  $project,
  $section,
  $selectedFrame,
  frameSelected,
  searchInputChanged,
} from '../model';
import { FrameDetails } from './frame-details';
import { FramesList } from './frames-list';
import { VersionPreviewDialog } from './version-preview-dialog';
import { VersionsTable } from './versions-table';

export const AdminFramesPage = () => {
  const [
    project,
    section,
    group,
    frames,
    selectedFrame,
    versions,
    versionsByFrameId,
    search,
    isFramesLoading,
    isVersionsLoading,
    onSearchChange,
    onSelectFrame,
  ] = useUnit([
    $project,
    $section,
    $group,
    frameModel.$frames,
    $selectedFrame,
    versionModel.$versions,
    versionModel.$versionsByFrameId,
    frameModel.$search,
    frameModel.$isLoading,
    versionModel.$isLoading,
    searchInputChanged,
    frameSelected,
  ]);

  const groupName = group?.name ?? 'группы';
  const selectedVersions = selectedFrame
    ? (versionsByFrameId[selectedFrame.id] ?? versions)
    : [];
  const previewFilename = selectedFrame
    ? getLatestVersionFilename(selectedVersions)
    : null;

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
            {project && section ? (
              <Breadcrumb.Link asChild>
                <Link
                  to={adminGroupsRoute}
                  params={{
                    id: String(project.id),
                    sectionId: String(section.id),
                  }}
                >
                  {section.name}
                </Link>
              </Breadcrumb.Link>
            ) : (
              <Breadcrumb.CurrentLink>Группы</Breadcrumb.CurrentLink>
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>
              {group?.name ?? 'Группа'}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Фреймы</Breadcrumb.CurrentLink>
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
          <Title size="lg">Фреймы</Title>
          <Text mt="1" fontSize="sm" color="muted">
            Список фреймов в группе «{groupName}». Для каждого фрейма доступны
            версии из Figma.
          </Text>
        </Box>

        {group ? <CreateFrameButton groupId={group.id} /> : null}
      </Flex>

      <Flex
        gap="5"
        align="stretch"
        direction={{ base: 'column', lg: 'row' }}
        minH="520px"
      >
        <Box w={{ base: '100%', lg: '360px' }} flexShrink={0}>
          <FramesList
            frames={frames}
            versionsByFrameId={versionsByFrameId}
            selectedFrameId={selectedFrame?.id ?? null}
            search={search}
            isLoading={isFramesLoading}
            onSearchChange={onSearchChange}
            onSelect={onSelectFrame}
          />
        </Box>

        <Box
          flex="1"
          bg="panel"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="border"
          px="5"
          py="5"
          minW="0"
        >
          {selectedFrame ? (
            <>
              <FrameDetails
                frame={selectedFrame}
                previewFilename={previewFilename}
              />
              <VersionsTable
                frameId={selectedFrame.id}
                versions={selectedVersions}
                isLoading={isVersionsLoading && selectedVersions.length === 0}
              />
            </>
          ) : (
            <Flex justify="center" align="center" minH="400px">
              <Text fontSize="sm" color="muted">
                {isFramesLoading
                  ? 'Загрузка фреймов...'
                  : 'Выберите фрейм из списка'}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>

      <CreateFrameDialog />
      <CreateVersionDialog />
      <EditFrameDialog />
      <DeleteFrameDialog />
      <DeleteVersionDialog />
      <VersionPreviewDialog />
    </Box>
  );
};
