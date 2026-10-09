import type { ComponentType } from 'react';

import { AdminLayout } from './layout';

export function withAdminLayout(Page: ComponentType): ComponentType {
  return function AdminPageView() {
    return (
      <AdminLayout>
        <Page />
      </AdminLayout>
    );
  };
}

export function AdminEmptyPage() {
  return null;
}
