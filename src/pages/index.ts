import {
  NodesPage,
  ProjectsPage,
  SectionsPage,
  SettingsPage,
  adminNodesRoute,
  adminNodesRouteAdmin,
  adminProjectsRoute,
  adminProjectsRouteAdmin,
  adminRoute,
  adminSectionsRoute,
  adminSectionsRouteAdmin,
  adminSettingsRoute,
  adminSettingsRouteAdmin,
} from './admin';
import { NotFoundPage, notFoundRoute } from './not-found';

export const historyRoutes = [
  { path: '/', route: adminProjectsRoute },
  { path: '/admin', route: adminRoute },
  { path: '/admin/projects', route: adminProjectsRoute },
  { path: '/admin/sections', route: adminSectionsRoute },
  { path: '/admin/nodes', route: adminNodesRoute },
  { path: '/admin/settings', route: adminSettingsRoute },
];

export const viewRoutes = [
  { route: adminProjectsRouteAdmin, view: ProjectsPage },
  { route: adminSectionsRouteAdmin, view: SectionsPage },
  { route: adminNodesRouteAdmin, view: NodesPage },
  { route: adminSettingsRouteAdmin, view: SettingsPage },
];

export { notFoundRoute, NotFoundPage };
