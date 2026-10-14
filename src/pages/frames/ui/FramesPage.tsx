import type { ReactNode } from 'react';
import {Header} from "@/widgets/header";
import {Stack} from "@chakra-ui/react";
import {BaseLayout} from "@/widgets/base-layout";

interface FramesPageProps {
  children?: ReactNode;
}

export const FramesPage = ({ children }: FramesPageProps) => {
  if (children) {
    return children;
  }

  return (
    <BaseLayout>
      <Stack gap={10}>
        <Header
          title="Раздел | Группы"
        />
      </Stack>
    </BaseLayout>
  );
};
