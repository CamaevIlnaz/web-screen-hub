import { ProjectsPage, projectsRoute } from './projects';
import { AdminPage, adminRoute } from './admin';
import { AdminProjectsPage, adminProjectsRoute } from './admin/projects';
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
      },
    ]
  },
]

export { notFoundRoute, NotFoundPage };
