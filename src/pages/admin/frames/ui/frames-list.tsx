import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';

import type { FrameResponseDto } from '@/entities/frame';
import { asNullableString } from '@/entities/project';
import { getVersionFileUrl, type VersionResponseDto } from '@/entities/version';

import {
  formatVersionsCount,
  getLatestVersionFilename,
} from '../lib';

interface FramesListProps {
  frames: FrameResponseDto[];
  versionsByFrameId: Record<number, VersionResponseDto[]>;
  selectedFrameId: number | null;
  search: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onSelect: (frameId: number) => void;
}

export function FramesList({
  frames,
  versionsByFrameId,
  selectedFrameId,
  search,
  isLoading,
  onSearchChange,
  onSelect,
}: FramesListProps) {
  return (
    <Box
      bg="panel"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Box px="4" py="4">
        <InputGroup
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
            placeholder="Поиск по названию фрейма..."
            bg="panelAlt"
            borderColor="border"
            borderRadius="md"
            h="11"
            fontSize="sm"
            color="text"
            _placeholder={{ color: 'muted' }}
          />
        </InputGroup>
      </Box>

      <Box flex="1" overflowY="auto" px="4" pb="4">
        {isLoading && frames.length === 0 ? (
          <Flex justify="center" py="16">
            <Spinner size="md" color="primary" />
          </Flex>
        ) : null}

        {!isLoading && frames.length === 0 ? (
          <Text fontSize="sm" color="muted" textAlign="center" py="16">
            Фреймы не найдены
          </Text>
        ) : null}

        <Flex direction="column" gap="2">
          {frames.map((frame) => {
            const isSelected = frame.id === selectedFrameId;
            const versions = versionsByFrameId[frame.id] ?? [];
            const description = asNullableString(frame.description);
            const filename = getLatestVersionFilename(versions);
            const previewUrl = filename ? getVersionFileUrl(filename) : null;

            return (
              <Box
                key={frame.id}
                as="button"
                type="button"
                textAlign="left"
                w="100%"
                px="3"
                py="3"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={isSelected ? 'primary' : 'border'}
                bg={isSelected ? 'brandSoft' : 'panel'}
                cursor="pointer"
                onClick={() => onSelect(frame.id)}
                _hover={{ bg: isSelected ? 'brandSoft' : 'panelAlt' }}
              >
                <Flex align="center" gap="3">
                  <Box
                    w="12"
                    h="12"
                    minW="12"
                    borderRadius="md"
                    overflow="hidden"
                    bg="panelAlt"
                    borderWidth="1px"
                    borderColor="border"
                  >
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt={frame.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    ) : null}
                  </Box>

                  <Box flex="1" minW="0">
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="heading"
                      lineHeight="1.3"
                      truncate
                    >
                      {frame.name}
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

                  <Text
                    fontSize="xs"
                    color="muted"
                    whiteSpace="nowrap"
                    flexShrink={0}
                  >
                    {formatVersionsCount(versions.length)}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
