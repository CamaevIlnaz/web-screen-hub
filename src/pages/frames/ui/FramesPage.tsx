import type { ReactNode } from 'react';

interface FramesPageProps {
  children?: ReactNode;
}

export const FramesPage = ({ children }: FramesPageProps) => {
  if (children) {
    return children;
  }

  return (
    <div>
      <h1>Группы</h1>
    </div>
  );
};
