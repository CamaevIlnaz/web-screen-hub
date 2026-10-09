import { createRoutesView } from 'atomic-router-react';

import { NotFoundPage, viewRoutes } from '@/pages';

export const RoutesView = createRoutesView({
  routes: viewRoutes,
  otherwise: NotFoundPage,
});
