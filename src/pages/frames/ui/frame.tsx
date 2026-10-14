import {
  Box,
  createListCollection,
  Flex,
  Image,
  Portal,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { getVersionFileUrl } from '@/entities/version';

import type { FrameListItem } from '../model';

interface FrameProps {
  frame: FrameListItem;
}

export function Frame({ frame }: FrameProps) {
  const { name, versions } = frame;

  const sortedVersions = useMemo(
    () => [...versions].sort((left, right) => right.version - left.version),
    [versions],
  );

  const versionsCollection = useMemo(
    () =>
      createListCollection({
        items: sortedVersions.map((version) => ({
          label: `Версия: ${version.version}`,
          value: String(version.id),
        })),
      }),
    [sortedVersions],
  );

  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(
    sortedVersions[0]?.id ?? null,
  );

  useEffect(() => {
    if (sortedVersions.length === 0) {
      setSelectedVersionId(null);
      return;
    }

    const hasSelected = sortedVersions.some(
      (version) => version.id === selectedVersionId,
    );

    if (!hasSelected) {
      setSelectedVersionId(sortedVersions[0].id);
    }
  }, [selectedVersionId, sortedVersions]);

  const selectedVersion =
    sortedVersions.find((version) => version.id === selectedVersionId) ??
    sortedVersions[0] ??
    null;

  const imageUrl = selectedVersion
    ? getVersionFileUrl(selectedVersion.filename)
    : null;

  return (
    <Box>
      <Flex align="center" justify="space-between" gap="3" mb="3">
        <Text color="white" fontSize="16px" fontWeight="600" lineHeight="1.3">
          {name}
        </Text>

        {sortedVersions.length > 0 ? (
          <Select.Root
            collection={versionsCollection}
            lazyMount
            unmountOnExit
            positioning={{ strategy: 'fixed' }}
            size="sm"
            width="auto"
            minW="120px"
            flexShrink={0}
            value={selectedVersionId ? [String(selectedVersionId)] : []}
            onValueChange={(details) => {
              const nextValue = details.value[0];
              setSelectedVersionId(nextValue ? Number(nextValue) : null);
            }}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger
                bg="#ffffff0d"
                borderColor="whiteAlpha.300"
                color="white"
                borderRadius="8px"
                cursor="pointer"
              >
                <Select.ValueText placeholder="Версия" />
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {versionsCollection.items.map((item) => (
                    <Select.Item item={item} key={item.value} cursor="pointer">
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        ) : null}
      </Flex>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          w="100%"
          h="auto"
          display="block"
          borderRadius="8px"
          css={{ imageRendering: 'crisp-edges' }}
        />
      ) : (
        <Box
          w="100%"
          minH="200px"
          borderRadius="8px"
          bg="whiteAlpha.50"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="whiteAlpha.500" fontSize="14px">
            Нет версии
          </Text>
        </Box>
      )}
    </Box>
  );
}
