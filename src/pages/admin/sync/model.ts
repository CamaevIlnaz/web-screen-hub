import { createRoute } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { projectModel } from '@/entities/project';
import { sectionModel } from '@/entities/section';
import { chainAdmin } from '@/entities/session';
import { notifyErrorFx } from '@/shared/ui';

import type { SyncProject } from './lib';

export const adminSyncRoute = createRoute();
export const chainAdminSyncRoute = chainAdmin(adminSyncRoute);

export const refreshRequested = createEvent();

const loadSyncProjectsFx = createEffect<void, SyncProject[]>(async () => {
  const projects = await projectModel.findAllFx();
  const sections = await Promise.all(
    projects.map((project) => sectionModel.findAllFx({ projectId: project.id })),
  );

  return projects.map((project, index) => ({
    project,
    sections: sections[index],
  }));
});

const loadProjectSectionsFx = createEffect((projectId: number) =>
  sectionModel.findAllFx({ projectId }),
);

export const $syncProjects = createStore<SyncProject[]>([])
  .on(loadSyncProjectsFx.doneData, (_, items) => items)
  .on(loadProjectSectionsFx.done, (items, { params, result }) =>
    items.map((item) =>
      item.project.id === params ? { ...item, sections: result } : item,
    ),
  );

export const $isLoading = loadSyncProjectsFx.pending;

const findProjectIdBySection = (
  items: SyncProject[],
  sectionId: number,
): number | null =>
  items.find((item) => item.sections.some((section) => section.id === sectionId))
    ?.project.id ?? null;

sample({
  clock: [adminSyncRoute.opened, refreshRequested],
  target: loadSyncProjectsFx,
});

const syncFinished = sample({
  clock: sectionModel.syncFx.finally,
  source: $syncProjects,
  fn: (items, { params }) => findProjectIdBySection(items, params),
});

sample({
  clock: syncFinished,
  filter: (projectId): projectId is number => projectId !== null,
  target: loadProjectSectionsFx,
});

sample({
  clock: [loadSyncProjectsFx.failData, loadProjectSectionsFx.failData],
  fn: (error) => error.message,
  target: notifyErrorFx,
});
