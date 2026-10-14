import { Box, Separator, Stack, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import type { ReactNode } from 'react';

import { asNullableString } from '@/entities/project';
import { formatCardDate } from '@/shared/lib';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

import { $groupList, $project, $section } from '../model';
import { Group } from './group';

interface FramesPageProps {
  children?: ReactNode;
}

export const FramesPage = ({ children }: FramesPageProps) => {
  const [project, section, groupList] = useUnit([
    $project,
    $section,
    $groupList,
  ]);

  if (children) {
    return children;
  }

  const title =
    project && section ? (
      <Stack direction="row" alignItems="center" gap="3">
        {project.name}
        <Separator orientation="vertical" height="4" borderColor="#636363" />
        {section.name}
      </Stack>
    ) : (
      (project?.name ?? section?.name ?? 'Группы')
    );

  const figmaUrl = asNullableString(section?.figmaLink);
  const updatedAt = section ? formatCardDate(section.lastModified) : undefined;

  return (
    <Box
      minH="100vh"
      fontFamily="body"
      css={{
        backgroundColor: "#0a0a0a",
        backgroundImage: 'radial-gradient(#ffffff12 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Stack gap="10">
        <Box p={7} pb={0}>
          <Header
            title={title}
            figmaUrl={figmaUrl ?? undefined}
            updatedAt={updatedAt}
          />
        </Box>

        {groupList.length === 0 ? (
          <Text color="whiteAlpha.700">Группы не найдены</Text>
        ) : (
          <Box
            position="relative"
            w="100%"
            overflowX="auto"
            display="flex"
            gap="6"
            p="7"
            pt={0}
            flexWrap="nowrap"
          >
            {groupList.map((group) => (
              <Group key={group.id} group={group} />
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
