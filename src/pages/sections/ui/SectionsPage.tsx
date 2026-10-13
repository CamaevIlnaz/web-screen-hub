import type { ReactNode } from 'react';

interface SectionsPageProps {
  children?: ReactNode;
}

export const SectionsPage = ({ children }: SectionsPageProps) => {
  if (children) {
    return children;
  }

  return (
    <div>
      <h1>Разделы</h1>
    </div>
  );
};
