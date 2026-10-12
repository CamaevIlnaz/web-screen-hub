import {
  Box,
  Flex,
  Input,
  InputGroup,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Search } from 'lucide-react';

import { asNullableString } from '@/entities/project';
import type { SectionResponseDto } from '@/entities/section';
import { DeleteSectionButton } from '@/features/delete-section';
import { EditSectionButton } from '@/features/edit-section';

import { adminGroupsRoute } from '../../groups';
import { formatSectionDate, formatSectionsCount } from '../lib';
import { adminSectionsRoute } from '../model';

interface SectionsTableColumn {
  id: string;
  label: string;
  w?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const SECTIONS_TABLE_COLUMNS: SectionsTableColumn[] = [
  { id: 'name', label: 'Название' },
  { id: 'figmaId', label: 'Figma ID', w: '160px' },
  { id: 'lastModified', label: 'Последнее обновление', w: '220px' },
  { id: 'actions', label: 'Действия', w: '140px', textAlign: 'right' },
];

interface SectionsTableProps {
  sections: SectionResponseDto[];
  search: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
}

export function SectionsTable({
  sections,
  search,
  isLoading,
  onSearchChange,
}: SectionsTableProps) {
  const [openGroups, routeParams] = useUnit([
    adminGroupsRoute.open,
    adminSectionsRoute.$params,
  ]);

  return (
    <Box
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      <Flex align="center" gap="4" px="5" py="5">
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
            placeholder="Поиск по названию раздела..."
            bg="panelAlt"
            borderColor="border"
            borderRadius="md"
            h="12"
            fontSize="sm"
            color="text"
            _placeholder={{ color: 'muted' }}
          />
        </InputGroup>
      </Flex>

      <Box overflowX="auto" px="5">
        <Table.Root size="md" variant="line" borderWidth="1px" borderColor="border">
          <Table.Header>
            <Table.Row bg="panelAlt">
              {SECTIONS_TABLE_COLUMNS.map((column) => (
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
            {isLoading && sections.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={SECTIONS_TABLE_COLUMNS.length}
                  py="16"
                  textAlign="center"
                  borderColor="border"
                >
                  <Spinner size="md" color="primary" />
                </Table.Cell>
              </Table.Row>
            ) : null}

            {!isLoading && sections.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={SECTIONS_TABLE_COLUMNS.length}
                  py="16"
                  textAlign="center"
                  borderColor="border"
                >
                  <Text fontSize="sm" color="muted">
                    Разделы не найдены
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : null}

            {sections.map((section) => {
              const description = asNullableString(section.description);
              const figmaId = asNullableString(section.figmaId);

              return (
                <Table.Row
                  key={section.id}
                  bg="panel"
                  cursor="pointer"
                  _hover={{ bg: 'panelAlt' }}
                  onClick={() =>
                    openGroups({
                      id: routeParams.id,
                      sectionId: String(section.id),
                    })
                  }
                >
                  <Table.Cell px="5" py="4" h="20">
                    <Box minW="0">
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="heading"
                        lineHeight="1.3"
                        truncate
                      >
                        {section.name}
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
                      {formatSectionDate(section.lastModified)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell
                    px="5"
                    py="4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Flex justify="flex-end" align="center" gap="3.5">
                      <EditSectionButton section={section} />
                      <DeleteSectionButton section={section} />
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
          {formatSectionsCount(sections.length)}
        </Text>
      </Box>
    </Box>
  );
}
