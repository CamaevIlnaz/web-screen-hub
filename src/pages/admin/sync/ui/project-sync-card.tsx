import { Box, Collapsible, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';

import { asNullableString, getProjectPreviewUrl } from '@/entities/project';

import type { SyncProject } from '../lib';
import { SectionsSyncTable } from './sections-sync-table';

interface ProjectSyncCardProps {
  item: SyncProject;
}

export function ProjectSyncCard({ item }: ProjectSyncCardProps) {
  const { project, sections } = item;
  const description = asNullableString(project.description);
  const previewUrl = getProjectPreviewUrl(project.preview);

  return (
    <Collapsible.Root
      defaultOpen
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" gap="4" px="5" py="4">
        <Flex align="center" gap="4" minW="0">
          <Box
            w="76px"
            h="44px"
            flexShrink={0}
            borderRadius="md"
            overflow="hidden"
            bg="panelAlt"
            borderWidth="1px"
            borderColor="border"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={project.name}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            ) : null}
          </Box>
          <Box minW="0">
            <Text fontSize="md" fontWeight="bold" color="heading" truncate>
              {project.name}
            </Text>
            {description ? (
              <Text mt="0.5" fontSize="xs" color="muted" truncate>
                {description}
              </Text>
            ) : null}
          </Box>
        </Flex>

        <Collapsible.Trigger asChild>
          <IconButton
            aria-label={`Свернуть или развернуть ${project.name}`}
            variant="ghost"
            size="sm"
            borderRadius="md"
            color="text"
            bg="panelAlt"
            _open={{ transform: 'rotate(180deg)' }}
          >
            <ChevronDown size={18} strokeWidth={1.75} />
          </IconButton>
        </Collapsible.Trigger>
      </Flex>

      <Collapsible.Content>
        <Box px="5" pb="5">
          <SectionsSyncTable sections={sections} />
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
