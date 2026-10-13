import { Box, Heading, Stack, Separator, Text } from '@chakra-ui/react';
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

import { projectOpened } from '../model';

export const ProjectsPage = () => {
  const [projects, onProjectOpen] = useUnit([
    projectModel.$projects,
    projectOpened,
  ]);

  return (
    <BaseLayout>
      <Stack gap={10}>
        <Stack direction="row" gap={6} alignItems="center">
          <Header />
          <Separator orientation="vertical" borderColor="#858585" height="7" />
          <Heading as="h1" color="white" fontSize="4xl" fontWeight="bold">
            Проекты
          </Heading>
        </Stack>

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
