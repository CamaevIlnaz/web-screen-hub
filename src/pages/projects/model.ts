import { createRoute, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { projectModel } from '@/entities/project';

import { sectionsRoute } from '../sections/model';

export const projectsRoute = createRoute();

export const projectOpened = createEvent<number>();

sample({
  clock: projectsRoute.opened,
  target: projectModel.projectsRequested,
});

redirect({
  clock: projectOpened,
  params: (projectId) => ({ id: String(projectId) }),
  route: sectionsRoute,
});
