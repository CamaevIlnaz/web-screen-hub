import { Box, Flex, Table, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { FileText } from 'lucide-react';

import type { SectionResponseDto } from '@/entities/section';
import { SyncSectionButton, syncSectionModel } from '@/features/sync-section';

import { formatSyncDate, formatSyncError } from '../lib';
import { SyncStatusBadge } from './sync-status-badge';

interface SectionsSyncTableColumn {
  id: string;
  label: string;
  w?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const SECTIONS_SYNC_TABLE_COLUMNS: SectionsSyncTableColumn[] = [
  { id: 'name', label: 'Название раздела' },
  { id: 'syncedAt', label: 'Последняя синхронизация', w: '200px' },
  { id: 'status', label: 'Статус', w: '160px' },
  { id: 'error', label: 'Ошибка', w: '320px' },
  { id: 'actions', label: 'Действия', w: '200px', textAlign: 'right' },
];

interface SectionsSyncTableProps {
  sections: SectionResponseDto[];
}

export function SectionsSyncTable({ sections }: SectionsSyncTableProps) {
  const syncingIds = useUnit(syncSectionModel.$syncingIds);

  return (
    <Box overflowX="auto">
      <Table.Root size="sm" variant="line" borderWidth="1px" borderColor="border">
        <Table.Header>
          <Table.Row bg="panelAlt">
            {SECTIONS_SYNC_TABLE_COLUMNS.map((column) => (
              <Table.ColumnHeader
                key={column.id}
                color="blackAlpha.800"
                fontSize="xs"
                fontWeight="bold"
                textTransform="none"
                letterSpacing="normal"
                px="5"
                py="3"
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
          {sections.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={SECTIONS_SYNC_TABLE_COLUMNS.length}
                py="8"
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
            const isSyncing = syncingIds.includes(section.id);
            const syncError = formatSyncError(section.syncError);

            return (
              <Table.Row key={section.id} bg="panel">
                <Table.Cell px="5" py="2.5" borderColor="border">
                  <Flex align="center" gap="3" minW="0">
                    <Box color="muted" flexShrink={0}>
                      <FileText size={16} strokeWidth={1.75} />
                    </Box>
                    <Text fontSize="sm" fontWeight="semibold" color="heading" truncate>
                      {section.name}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell px="5" py="2.5" borderColor="border">
                  <Text fontSize="sm" color="text">
                    {formatSyncDate(section.figmaSyncedAt)}
                  </Text>
                </Table.Cell>
                <Table.Cell px="5" py="2.5" borderColor="border">
                  <SyncStatusBadge
                    status={isSyncing ? 'in_progress' : section.syncStatus}
                  />
                </Table.Cell>
                <Table.Cell px="5" py="2.5" borderColor="border">
                  <Text fontSize="sm" color="text" lineClamp={2}>
                    {syncError ?? '—'}
                  </Text>
                </Table.Cell>
                <Table.Cell px="5" py="2.5" borderColor="border" textAlign="right">
                  <SyncSectionButton section={section} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
