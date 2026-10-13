import { Box, Heading, Stack, Separator, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { asNullableString } from '@/entities/project';
import { sectionModel } from '@/entities/section';
import { formatCardDate } from '@/shared/lib';
import { Card } from '@/shared/ui';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

export const SectionsPage = () => {
  const [sections] = useUnit([
    sectionModel.$sections
  ]);

  return (
    <BaseLayout>
      <Stack gap={10}>
        <Stack direction="row" gap={6} alignItems="center">
          <Header />
          <Separator orientation="vertical" borderColor="#858585" height="7" />
          <Heading as="h1" color="white" fontSize="4xl" fontWeight="bold">
            Разделы
          </Heading>
        </Stack>

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
                />
              );
            })}
          </Box>
        )}
      </Stack>
    </BaseLayout>
  );
};
