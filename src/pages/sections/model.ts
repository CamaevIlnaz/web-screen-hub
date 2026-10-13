import { createRoute } from 'atomic-router';
import { sample } from 'effector';

import { sectionModel } from '@/entities/section';
import { notifyErrorFx } from '@/shared/ui';

export const sectionsRoute = createRoute<{ id: string }>();

const toProjectId = (id: string): number => Number(id);

const isValidProjectId = (id: string): boolean => {
  const projectId = toProjectId(id);
  return Number.isFinite(projectId) && projectId > 0;
};

sample({
  clock: sectionsRoute.opened,
  filter: ({ params }) => isValidProjectId(params.id),
  fn: ({ params }) => toProjectId(params.id),
  target: sectionModel.sectionsRequested,
});

sample({
  clock: sectionModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});
