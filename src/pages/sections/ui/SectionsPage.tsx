import { Box, Stack, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { asNullableString } from '@/entities/project';
import { sectionModel } from '@/entities/section';
import { formatCardDate } from '@/shared/lib';
import { Card } from '@/shared/ui';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

import { $project, sectionOpened } from '../model';

export const SectionsPage = () => {
  const [sections, project, onSectionOpen] = useUnit([
    sectionModel.$sections,
    $project,
    sectionOpened,
  ]);

  const figmaUrl = asNullableString(project?.figmaLink);
  const updatedAt = project ? formatCardDate(project.lastModified) : undefined;

  return (
    <BaseLayout>
      <Stack gap={10}>
        <Header
          title={project?.name ?? 'Разделы'}
          figmaUrl={figmaUrl ?? undefined}
          updatedAt={updatedAt}
        />

        {sections.length === 0 ? (
          <Text color="whiteAlpha.700">Разделы не найдены</Text>
        ) : (
          <Box display="flex" gap="4" flexWrap="wrap">
            {sections.map((section) => {
              const description = asNullableString(section.description);

              return (
                <Card
                  key={section.id}
                  title={section.name}
                  description={description ?? undefined}
                  date={formatCardDate(section.lastModified)}
                  onClick={() => onSectionOpen(section.id)}
                />
              );
            })}
          </Box>
        )}
      </Stack>
    </BaseLayout>
  );
};
