import { createEvent, createStore, sample } from 'effector';

import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<ProjectResponseDto>();
export const closeRequested = createEvent();
export const confirmed = createEvent();

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(openRequested, (_, project) => project)
  .reset(closeRequested, projectModel.removeFx.done);

export const $isOpen = $project.map(Boolean);

export const $isSubmitting = projectModel.removeFx.pending;

sample({
  clock: confirmed,
  source: $project,
  filter: (project): project is ProjectResponseDto => project !== null,
  fn: (project) => project.id,
  target: projectModel.projectRemoveRequested,
});

sample({
  clock: projectModel.removeFx.done,
  fn: () => 'Проект удалён',
  target: notifySuccessFx,
});

sample({
  clock: projectModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const deleteProjectModel = {
  $project,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  confirmed,
};
