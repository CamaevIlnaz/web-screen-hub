import {
  adminNodesRoute,
  adminProjectsRoute,
  adminRoute,
  adminSectionsRoute,
  adminSettingsRoute,
} from '@/pages/admin';
import { notFoundRoute } from '@/pages/not-found';

export const routes = {
  admin: adminRoute,
  adminProjects: adminProjectsRoute,
  adminSections: adminSectionsRoute,
  adminNodes: adminNodesRoute,
  adminSettings: adminSettingsRoute,
  notFound: notFoundRoute,
};
