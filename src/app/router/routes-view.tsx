import { createRoutesView } from 'atomic-router-react';
import type { ComponentType, ReactNode } from 'react';

import { NotFoundPage, routes } from '@/pages';
import type { RouteConfig } from './route-config';

function createViewRoutes(
  configs: RouteConfig[],
  parents: RouteConfig['view'][] = [],
): { route: RouteConfig['route']; view: ComponentType }[] {
  return configs.flatMap(({ route, view: View, routes: children = [] }) => {
    const RouteView = () => parents.reduceRight<ReactNode>(
      (content, Parent) => <Parent>{content}</Parent>,
      <View>{null}</View>,
    );

    return [
      ...createViewRoutes(children, [...parents, View]),
      { route, view: RouteView },
    ];
  });
}

console.log(createViewRoutes(routes))

export const RoutesView = createRoutesView({
  routes: createViewRoutes(routes),
  otherwise: NotFoundPage,
});
