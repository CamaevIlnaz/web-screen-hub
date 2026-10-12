import { ProjectsPage, projectsRoute } from './projects';
import { AdminPage, adminRoute } from './admin';
import { AdminFramesPage, adminFramesRoute } from './admin/frames';
import { AdminGroupsPage, adminGroupsRoute } from './admin/groups';
import { AdminProjectsPage, adminProjectsRoute } from './admin/projects';
import { AdminSectionsPage, adminSectionsRoute } from './admin/sections';
import { AdminSettingsPage, adminSettingsRoute } from './admin/settings';
import { NotFoundPage, notFoundRoute } from './not-found';

export const routes = [
  {
    path: '/',
    route: projectsRoute,
    view: ProjectsPage,
  },
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
        path: '/settings',
        route: adminSettingsRoute,
        view: AdminSettingsPage,
      },
    ],
  },
]

export { notFoundRoute, NotFoundPage };
