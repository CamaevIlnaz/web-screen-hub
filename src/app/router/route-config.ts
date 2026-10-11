import type { RouteInstance, RouteParams } from 'atomic-router';
import type { ComponentType, ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  route: RouteInstance<RouteParams>;
  view: ComponentType<{ children: ReactNode }>;
  routes?: RouteConfig[];
}
