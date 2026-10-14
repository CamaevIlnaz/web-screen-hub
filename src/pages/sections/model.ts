import { createRoute } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';

import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { sectionModel } from '@/entities/section';
import { notifyErrorFx } from '@/shared/ui';

import { framesRoute } from '../frames/model';

export const sectionsRoute = createRoute<{ id: string }>();

export const sectionOpened = createEvent<number>();

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(projectModel.findOneFx.doneData, (_, project) => project)
  .reset(sectionsRoute.opened, sectionsRoute.closed);

const toProjectId = (id: string): number => Number(id);

const isValidProjectId = (id: string): boolean => {
  const projectId = toProjectId(id);
  return Number.isFinite(projectId) && projectId > 0;
};

sample({
  clock: sectionsRoute.opened,
  filter: ({ params }) => isValidProjectId(params.id),
  fn: ({ params }) => toProjectId(params.id),
  target: [sectionModel.sectionsRequested, projectModel.findOneFx],
});

sample({
  clock: sectionOpened,
  source: sectionsRoute.$params,
  fn: (routeParams, sectionId) => ({
    id: routeParams.id,
    sectionId: String(sectionId),
  }),
  target: framesRoute.open,
});

sample({
  clock: sectionModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});
