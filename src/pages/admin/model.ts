import { createRoute, redirect } from 'atomic-router';
import { adminProjectsRoute } from './projects/model';
export const adminRoute = createRoute();

redirect({
  clock: adminRoute.opened,
  route: adminProjectsRoute,
});
