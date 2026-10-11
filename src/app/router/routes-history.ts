import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { notFoundRoute, routes } from '@/pages';
import type { RouteConfig } from './route-config';

function createHistoryRoutes(configs: RouteConfig[], parentPath = ''): {
  path: string;
  route: RouteConfig['route'];
}[] {
  return configs.flatMap(({ path, route, routes: children = [] }) => {
    const fullPath = `${parentPath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    return [
      { path: fullPath, route },
      ...createHistoryRoutes(children, fullPath),
    ];
  });
}

export const router = createHistoryRouter({
  routes: createHistoryRoutes(routes),
  notFoundRoute,
});
console.log(createHistoryRoutes(routes))

router.setHistory(createBrowserHistory());
