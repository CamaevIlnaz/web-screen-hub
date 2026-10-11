import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import { ArrowDownUp, RefreshCw, Search } from 'lucide-react';

import {
  asNullableString,
  getProjectPreviewUrl,
  type ProjectResponseDto,
} from '@/entities/project';
import { DeleteProjectButton } from '@/features/delete-project';
import { EditProjectButton } from '@/features/edit-project';

import { formatProjectDate, formatProjectsCount } from '../lib';
import type { SortDirection } from '../model';

interface ProjectsTableProps {
  projects: ProjectResponseDto[];
  search: string;
  isLoading: boolean;
  sortDirection: SortDirection;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onSortToggle: () => void;
}

export function ProjectsTable({
  projects,
  search,
  isLoading,
  sortDirection,
  onSearchChange,
  onRefresh,
  onSortToggle,
}: ProjectsTableProps) {
  return (
    <Box
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      boxShadow="sm"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" gap="4" px="5" py="5">
        <InputGroup
          maxW="480px"
          w="100%"
          startElement={
            <Box color="muted" display="flex" alignItems="center">
              <Search size={17} strokeWidth={1.75} />
            </Box>
          }
        >
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Поиск по названию проекта..."
            bg="panelAlt"
            borderColor="border"
            borderRadius="md"
            h="12"
            fontSize="sm"
            color="text"
            _placeholder={{ color: 'muted' }}
          />
        </InputGroup>

        <IconButton
          aria-label="Обновить список"
          variant="outline"
          borderRadius="md"
          borderColor="border"
          color="text"
          bg="panel"
          h="12"
          w="12"
          minW="12"
          loading={isLoading}
          onClick={onRefresh}
          _hover={{ bg: 'panelAlt' }}
        >
          <RefreshCw size={17} strokeWidth={1.75} />
        </IconButton>
      </Flex>

      <Box overflowX="auto">
        <Table.Root size="md" variant="line">
          <Table.Header>
            <Table.Row bg="panelAlt">
              <Table.ColumnHeader
                color="muted"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="none"
                letterSpacing="normal"
                px="5"
                py="3.5"
                borderColor="border"
              >
                Название
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="muted"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="none"
                letterSpacing="normal"
                px="5"
                py="3.5"
                w="160px"
                borderColor="border"
              >
                Figma ID
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="muted"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="none"
                letterSpacing="normal"
                px="5"
                py="3.5"
                w="220px"
                borderColor="border"
              >
                <Flex
                  as="button"
                  type="button"
                  align="center"
                  gap="1.5"
                  cursor="pointer"
                  onClick={onSortToggle}
                  aria-label={`Сортировать по дате (${sortDirection === 'desc' ? 'сначала новые' : 'сначала старые'})`}
                >
                  Последнее обновление
                  <Box color="muted" display="inline-flex">
                    <ArrowDownUp size={14} strokeWidth={1.75} />
                  </Box>
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="muted"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="none"
                letterSpacing="normal"
                px="5"
                py="3.5"
                w="140px"
                textAlign="right"
                borderColor="border"
              >
                Действия
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading && projects.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4} py="16" textAlign="center" borderColor="border">
                  <Spinner size="md" color="primary" />
                </Table.Cell>
              </Table.Row>
            ) : null}

            {!isLoading && projects.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4} py="16" textAlign="center" borderColor="border">
                  <Text fontSize="sm" color="muted">
                    Проекты не найдены
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : null}

            {projects.map((project) => {
              const description = asNullableString(project.description);
              const figmaId = asNullableString(project.figmaId);
              const previewUrl = getProjectPreviewUrl(project.preview);

              return (
                <Table.Row key={project.id} bg="panel">
                  <Table.Cell px="5" py="4" borderColor="border" h="20">
                    <Flex align="center" gap="4" minW="0">
                      <Box
                        w="76px"
                        h="56px"
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
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="heading"
                          lineHeight="1.3"
                          truncate
                        >
                          {project.name}
                        </Text>
                        {description ? (
                          <Text
                            mt="0.5"
                            fontSize="xs"
                            color="muted"
                            lineHeight="1.3"
                            truncate
                          >
                            {description}
                          </Text>
                        ) : null}
                      </Box>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell px="5" py="4" borderColor="border">
                    <Text fontSize="sm" color="text" lineHeight="1.3">
                      {figmaId ?? '—'}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="5" py="4" borderColor="border">
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="heading"
                      lineHeight="1.3"
                    >
                      {formatProjectDate(project.lastModified)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="5" py="4" borderColor="border">
                    <Flex justify="flex-end" align="center" gap="3.5">
                      <EditProjectButton project={project} />
                      <DeleteProjectButton project={project} />
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>

      <Box px="5" py="4" borderTopWidth="1px" borderColor="border">
        <Text fontSize="xs" color="muted">
          {formatProjectsCount(projects.length)}
        </Text>
      </Box>
    </Box>
  );
}
