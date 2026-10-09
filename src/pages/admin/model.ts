import { createRoute, redirect } from 'atomic-router';

import { chainAdmin } from '@/entities/session';

export const adminRoute = createRoute();
export const adminProjectsRoute = createRoute();
export const adminSectionsRoute = createRoute();
export const adminNodesRoute = createRoute();
export const adminSettingsRoute = createRoute();

export const adminRouteAdmin = chainAdmin(adminRoute);
export const adminProjectsRouteAdmin = chainAdmin(adminProjectsRoute);
export const adminSectionsRouteAdmin = chainAdmin(adminSectionsRoute);
export const adminNodesRouteAdmin = chainAdmin(adminNodesRoute);
export const adminSettingsRouteAdmin = chainAdmin(adminSettingsRoute);

redirect({
  clock: adminRouteAdmin.opened,
  route: adminProjectsRoute,
});
