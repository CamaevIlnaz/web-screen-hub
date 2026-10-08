import { ProjectsPage, projectsRoute } from './projects';
import { NotFoundPage, notFoundRoute } from './not-found';

export const routes = [
  {
    path: '/',
    route: projectsRoute,
    view: ProjectsPage,
  },
  {
    path: '/projects',
    route: projectsRoute,
    view: ProjectsPage,
  },
];

export { notFoundRoute, NotFoundPage };
