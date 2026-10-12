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
import { RefreshCw, Search } from 'lucide-react';

import {
  asNullableString,
  getProjectPreviewUrl,
  type ProjectResponseDto,
} from '@/entities/project';
import { DeleteProjectButton } from '@/features/delete-project';
import { EditProjectButton } from '@/features/edit-project';

import { formatProjectDate, formatProjectsCount } from '../lib';

interface ProjectsTableColumn {
  id: string;
  label: string;
  w?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const PROJECTS_TABLE_COLUMNS: ProjectsTableColumn[] = [
  { id: 'name', label: 'Название' },
  { id: 'figmaId', label: 'Figma ID', w: '160px' },
  { id: 'lastModified', label: 'Последнее обновление', w: '220px' },
  { id: 'actions', label: 'Действия', w: '140px', textAlign: 'right' },
];

interface ProjectsTableProps {
  projects: ProjectResponseDto[];
  search: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export function ProjectsTable({
  projects,
  search,
  isLoading,
  onSearchChange,
  onRefresh,
}: ProjectsTableProps) {
  return (
    <Box
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
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

      <Box overflowX="auto" px="5">
        <Table.Root size="md" variant="line" borderWidth="1px" borderColor="border">
          <Table.Header>
            <Table.Row bg="panelAlt">
              {PROJECTS_TABLE_COLUMNS.map((column) => (
                <Table.ColumnHeader
                  key={column.id}
                  color="blackAlpha.800"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="none"
                  letterSpacing="normal"
                  px="5"
                  py="3.5"
                  borderColor="border"
                  w={column.w}
                  textAlign={column.textAlign}
                >
                  {column.label}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading && projects.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={PROJECTS_TABLE_COLUMNS.length}
                  py="16"
                  textAlign="center"
                  borderColor="border"
                >
                  <Spinner size="md" color="primary" />
                </Table.Cell>
              </Table.Row>
            ) : null}

            {!isLoading && projects.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={PROJECTS_TABLE_COLUMNS.length}
                  py="16"
                  textAlign="center"
                  borderColor="border"
                >
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
                  <Table.Cell px="5" py="4" h="20">
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
                  <Table.Cell px="5" py="4">
                    <Text fontSize="sm" color="text" lineHeight="1.3">
                      {figmaId ?? '—'}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="5" py="4">
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="heading"
                      lineHeight="1.3"
                    >
                      {formatProjectDate(project.lastModified)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="5" py="4">
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

      <Box px="5" py="4">
        <Text fontSize="xs" color="muted">
          {formatProjectsCount(projects.length)}
        </Text>
      </Box>
    </Box>
  );
}
