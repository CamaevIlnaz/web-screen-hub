import { Box, Heading, Stack, Separator } from '@chakra-ui/react';
import { FolderClosed } from 'lucide-react';

import { Card } from '@/shared/ui';
import { BaseLayout } from '@/widgets/base-layout';
import { Header } from '@/widgets/header';

export const ProjectsPage = () => {
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

        <Stack gap="6" direction="row" flexWrap="wrap">
          <Card
            image="https://placehold.co/640x360/0b5a8c/ffffff"
            title="Розничный банкинг"
            description="Вклады и накопительные счета"
            date="12:10 25.03.2026"
          />
        </Stack>
      </Stack>
    </BaseLayout>
  );
};
