import { Box, Stack, Text } from '@chakra-ui/react';

import type { GroupListItem } from '../model';
import { Frame } from './frame';

interface GroupProps {
  group: GroupListItem;
}

export function Group({ group }: GroupProps) {
  const { name, frames } = group;

  return (
    <Box
      w="750px"
      minW="750px"
      h="fit-content"
      p="4"
      borderRadius="8px"
      bg="rgba(34, 34, 34)"
      display="flex"
      flexDirection="column"
      gap="4"
    >
      <Text color="white" fontSize="20px" fontWeight="600" lineHeight="1.3">
        {name}
      </Text>

      {frames.length === 0 ? (
        <Text color="whiteAlpha.500" fontSize="14px">
          Фреймы не найдены
        </Text>
      ) : (
        <Stack gap="4">
          {frames.map((frame) => (
            <Frame key={frame.id} frame={frame} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
