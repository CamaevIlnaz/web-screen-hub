import { createRoute } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { sectionModel } from '@/entities/section';
import { chainAdmin } from '@/entities/session';
import { notifyErrorFx } from '@/shared/ui';

export const adminSectionsRoute = createRoute<{ id: string }>();
export const chainAdminSectionsRoute = chainAdmin(adminSectionsRoute);

export const searchInputChanged = createEvent<string>();
export const refreshClicked = createEvent();

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(projectModel.findOneFx.doneData, (_, project) => project)
  .reset(adminSectionsRoute.opened, adminSectionsRoute.closed);

const debounceSearchFx = createEffect(async (value: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  return value;
});

const toProjectId = (id: string): number => Number(id);

const isValidProjectId = (id: string): boolean => {
  const projectId = toProjectId(id);
  return Number.isFinite(projectId) && projectId > 0;
};

sample({
  clock: adminSectionsRoute.opened,
  filter: ({ params }) => isValidProjectId(params.id),
  fn: ({ params }) => toProjectId(params.id),
  target: [sectionModel.sectionsRequested, projectModel.findOneFx],
});

sample({
  clock: searchInputChanged,
  target: [sectionModel.searchChanged, debounceSearchFx],
});

sample({
  clock: debounceSearchFx.doneData,
  source: {
    search: sectionModel.$search,
    params: adminSectionsRoute.$params,
  },
  filter: ({ search, params }, debounced) =>
    search === debounced && isValidProjectId(params.id),
  fn: ({ params }) => toProjectId(params.id),
  target: sectionModel.sectionsRequested,
});

sample({
  clock: refreshClicked,
  source: adminSectionsRoute.$params,
  filter: ({ id }) => isValidProjectId(id),
  fn: ({ id }) => toProjectId(id),
  target: sectionModel.sectionsRequested,
});

sample({
  clock: sectionModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});
