import { Box, Flex, Image, Text } from '@chakra-ui/react';

import type { FrameResponseDto } from '@/entities/frame';
import { asNullableString } from '@/entities/project';
import { getVersionFileUrl } from '@/entities/version';
import { DeleteFrameButton } from '@/features/delete-frame';
import { EditFrameButton } from '@/features/edit-frame';

interface FrameDetailsProps {
  frame: FrameResponseDto;
  previewFilename: string | null;
}

export function FrameDetails({ frame, previewFilename }: FrameDetailsProps) {
  const description = asNullableString(frame.description);
  const previewUrl = previewFilename
    ? getVersionFileUrl(previewFilename)
    : null;

  return (
    <Flex align="flex-start" gap="4" mb="6">
      <Box
        w="20"
        h="20"
        minW="20"
        borderRadius="lg"
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
          fontSize="lg"
          fontWeight="bold"
          color="heading"
          lineHeight="1.3"
          truncate
        >
          {frame.name}
        </Text>
        <Text mt="1" fontSize="sm" color="muted" lineHeight="1.4" truncate>
          {description ?? 'Без описания'}
        </Text>
      </Box>

      <Flex align="center" gap="2" flexShrink={0}>
        <EditFrameButton frame={frame} />
        <DeleteFrameButton frame={frame} />
      </Flex>
    </Flex>
  );
}
