import {
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Download, Eye } from 'lucide-react';

import {
  getVersionFileUrl,
  type VersionResponseDto,
} from '@/entities/version';
import { CreateVersionButton } from '@/features/create-version';
import { DeleteVersionButton } from '@/features/delete-version';

import {
  formatFrameDate,
  formatUploadType,
  formatVersionLabel,
} from '../lib';
import { versionPreviewOpened } from '../model';

interface VersionsTableColumn {
  id: string;
  label: string;
  w?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const VERSIONS_TABLE_COLUMNS: VersionsTableColumn[] = [
  { id: 'version', label: 'Версия', w: '100px' },
  { id: 'preview', label: 'Превью', w: '140px' },
  { id: 'uploadedAt', label: 'Дата загрузки' },
  { id: 'actions', label: 'Действия', w: '140px', textAlign: 'right' },
];

interface VersionsTableProps {
  frameId: number;
  versions: VersionResponseDto[];
  isLoading: boolean;
}

function downloadVersion(version: VersionResponseDto) {
  const url = getVersionFileUrl(version.filename);
  const link = document.createElement('a');
  link.href = url;
  link.download = version.filename.split('/').pop() ?? `version-${version.id}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function VersionsTable({
  frameId,
  versions,
  isLoading,
}: VersionsTableProps) {
  const openPreview = useUnit(versionPreviewOpened);

  const sortedVersions = [...versions].sort((a, b) => b.version - a.version);

  return (
    <Box>
      <Flex align="center" justify="space-between" gap="4" mb="4">
        <Flex align="center" gap="2">
          <Text fontSize="md" fontWeight="semibold" color="heading">
            Версии фрейма
          </Text>
          <Box
            as="span"
            px="2"
            py="0.5"
            borderRadius="md"
            bg="panelAlt"
            fontSize="xs"
            fontWeight="semibold"
            color="muted"
          >
            {versions.length}
          </Box>
        </Flex>
        <CreateVersionButton frameId={frameId} />
      </Flex>

      <Box overflowX="auto">
        <Table.Root size="md" variant="line" borderWidth="1px" borderColor="border">
          <Table.Header>
            <Table.Row bg="panelAlt">
              {VERSIONS_TABLE_COLUMNS.map((column) => (
                <Table.ColumnHeader
                  key={column.id}
                  color="blackAlpha.800"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="none"
                  letterSpacing="normal"
                  px="4"
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
            {isLoading && versions.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={VERSIONS_TABLE_COLUMNS.length}
                  py="12"
                  textAlign="center"
                  borderColor="border"
                >
                  <Spinner size="md" color="primary" />
                </Table.Cell>
              </Table.Row>
            ) : null}

            {!isLoading && versions.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={VERSIONS_TABLE_COLUMNS.length}
                  py="12"
                  textAlign="center"
                  borderColor="border"
                >
                  <Text fontSize="sm" color="muted">
                    Версии не найдены
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : null}

            {sortedVersions.map((version) => {
              const previewUrl = getVersionFileUrl(version.filename);

              return (
                <Table.Row key={version.id} bg="panel">
                  <Table.Cell px="4" py="3" borderColor="border">
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="heading"
                    >
                      {formatVersionLabel(version.version)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="4" py="3" borderColor="border">
                    <Box
                      w="24"
                      h="10"
                      borderRadius="md"
                      overflow="hidden"
                      bg="panelAlt"
                      borderWidth="1px"
                      borderColor="border"
                    >
                      <Image
                        src={previewUrl}
                        alt={formatVersionLabel(version.version)}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                  </Table.Cell>
                  <Table.Cell px="4" py="3" borderColor="border">
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="heading"
                      lineHeight="1.3"
                    >
                      {formatFrameDate(version.createdAt)}
                    </Text>
                    <Text mt="0.5" fontSize="xs" color="muted" lineHeight="1.3">
                      {formatUploadType(version.uploadType)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell px="4" py="3" borderColor="border">
                    <Flex justify="flex-end" align="center" gap="1">
                      <IconButton
                        aria-label={`Просмотреть ${formatVersionLabel(version.version)}`}
                        variant="ghost"
                        size="sm"
                        color="text"
                        onClick={() => openPreview(previewUrl)}
                        _hover={{ bg: 'panelAlt' }}
                      >
                        <Eye size={16} strokeWidth={1.75} />
                      </IconButton>
                      <IconButton
                        aria-label={`Скачать ${formatVersionLabel(version.version)}`}
                        variant="ghost"
                        size="sm"
                        color="text"
                        onClick={() => downloadVersion(version)}
                        _hover={{ bg: 'panelAlt' }}
                      >
                        <Download size={16} strokeWidth={1.75} />
                      </IconButton>
                      <DeleteVersionButton version={version} />
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
