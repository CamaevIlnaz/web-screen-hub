import { createEvent, createStore, sample } from 'effector';

import {
  projectModel,
  type ProjectResponseDto,
  type UpdateProjectParams,
} from '@/entities/project';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<ProjectResponseDto>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<UpdateProjectParams>();

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(openRequested, (_, project) => project)
  .reset(closeRequested, projectModel.updateFx.done);

export const $isOpen = $project.map(Boolean);

export const $isSubmitting = projectModel.updateFx.pending;

sample({
  clock: formSubmitted,
  target: projectModel.projectUpdateSubmitted,
});

sample({
  clock: projectModel.updateFx.done,
  fn: () => 'Проект обновлён',
  target: notifySuccessFx,
});

sample({
  clock: projectModel.updateFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const editProjectModel = {
  $project,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
