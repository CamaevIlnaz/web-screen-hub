import { Box, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Layout } from './layout';

interface ProjectsPageProps {
  children?: ReactNode;
}

export const ProjectsPage = ({ children }: ProjectsPageProps) => {
  return (
    <Layout>
      {children ?? (
        <Box px="4" pt="20" gapX={2}>
          <Heading as="h1" color="white" fontSize="3xl">
            Проекты
          </Heading>
        </Box>
      )}
    </Layout>
  );
};
