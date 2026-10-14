import { Box, Separator, Stack } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { type ReactNode, useEffect } from 'react';

import { asNullableString } from '@/entities/project';
import { formatCardDate } from '@/shared/lib';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

import { $groupList, $project, $section } from '../model';

interface FramesPageProps {
  children?: ReactNode;
}

export const FramesPage = ({ children }: FramesPageProps) => {
  const [project, section, groupList] = useUnit([
    $project,
    $section,
    $groupList,
  ]);

  useEffect(() => {
    console.log('groupList', groupList);
  }, [groupList]);

  if (children) {
    return children;
  }

  const title =
    project && section
      ? (
        <Stack direction="row" alignItems="center">
          {project.name}
          <Separator orientation="vertical" height="4" borderColor="#636363"/>
          {section.name}
        </Stack>
      )
      : project?.name ?? section?.name ?? 'Группы';

  const figmaUrl = asNullableString(section?.figmaLink);
  const updatedAt = section ? formatCardDate(section.lastModified) : undefined;

  return (
    <BaseLayout>
      <Header
        title={title}
        figmaUrl={figmaUrl ?? undefined}
        updatedAt={updatedAt}
      />
      <Box
        width="100vh"
        height="100vh"
        overflow="auto"
        display="flex"
        gap="4"
        flexWrap="wrap"
      >

      </Box>
    </BaseLayout>
  );
};
