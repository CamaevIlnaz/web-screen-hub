import { Box, Stack, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import {
  asNullableString,
  getProjectPreviewUrl,
  projectModel,
} from '@/entities/project';
import { formatCardDate } from '@/shared/lib';
import { Card } from '@/shared/ui';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

import { $figmaLink, projectOpened } from '../model';

export const ProjectsPage = () => {
  const [projects, figmaLink, onProjectOpen] = useUnit([
    projectModel.$projects,
    $figmaLink,
    projectOpened,
  ]);

  return (
    <BaseLayout>
      <Stack gap={10}>
        <Header title="Проекты" figmaUrl={figmaLink ?? undefined} />

        {projects.length === 0 ? (
          <Text color="whiteAlpha.700">Проекты не найдены</Text>
        ) : (
          <Box display="flex" gap="4" flexWrap="wrap">
            {projects.map((project) => {
              const previewUrl = getProjectPreviewUrl(project.preview);
              const description = asNullableString(project.description);

              return (
                <Card
                  key={project.id}
                  image={previewUrl ?? undefined}
                  title={project.name}
                  description={description ?? undefined}
                  date={formatCardDate(project.lastModified)}
                  onClick={() => onProjectOpen(project.id)}
                />
              );
            })}
          </Box>
        )}
      </Stack>
    </BaseLayout>
  );
};
