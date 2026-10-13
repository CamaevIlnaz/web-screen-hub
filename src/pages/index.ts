import { ProjectsPage, projectsRoute } from './projects';
import { SectionsPage, sectionsRoute } from './sections';
import { FramesPage, framesRoute } from './frames';
import { AdminPage, adminRoute } from './admin';
import { AdminFramesPage, adminFramesRoute } from './admin/frames';
import { AdminGroupsPage, adminGroupsRoute } from './admin/groups';
import { AdminProjectsPage, adminProjectsRoute } from './admin/projects';
import { AdminSectionsPage, adminSectionsRoute } from './admin/sections';
import { AdminSettingsPage, adminSettingsRoute } from './admin/settings';
import { AdminSyncPage, adminSyncRoute } from './admin/sync';
import { NotFoundPage, notFoundRoute } from './not-found';

export const routes = [
  {
    path: '/admin',
    route: adminRoute,
    view: AdminPage,
    routes: [
      {
        path: '/projects',
        route: adminProjectsRoute,
        view: AdminProjectsPage,
        routes: [
          {
            path: '/:id',
            route: adminSectionsRoute,
            view: AdminSectionsPage,
            routes: [
              {
                path: '/:sectionId',
                route: adminGroupsRoute,
                view: AdminGroupsPage,
                routes: [
                  {
                    path: '/:groupId',
                    route: adminFramesRoute,
                    view: AdminFramesPage,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/sync',
        route: adminSyncRoute,
        view: AdminSyncPage,
      },
      {
        path: '/settings',
        route: adminSettingsRoute,
        view: AdminSettingsPage,
      },
    ],
  },
  {
    path: '/',
    route: projectsRoute,
    view: ProjectsPage,
    routes: [
      {
        path: '/:id',
        route: sectionsRoute,
        view: SectionsPage,
        routes: [
          {
            path: '/:sectionId',
            route: framesRoute,
            view: FramesPage,
          },
        ],
      },
    ],
  },
]

export { notFoundRoute, NotFoundPage };
