import { createEvent, createStore, sample } from 'effector';

import { projectModel, type CreateProjectDto } from '@/entities/project';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<CreateProjectDto>();

export const $isOpen = createStore(false)
  .on(openRequested, () => true)
  .on(closeRequested, () => false)
  .on(projectModel.createFx.done, () => false);

export const $isSubmitting = projectModel.createFx.pending;

sample({
  clock: formSubmitted,
  target: projectModel.projectCreateSubmitted,
});

sample({
  clock: projectModel.createFx.done,
  fn: () => 'Проект создан',
  target: notifySuccessFx,
});

sample({
  clock: projectModel.createFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const createProjectModel = {
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
