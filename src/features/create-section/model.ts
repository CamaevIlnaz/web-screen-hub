import { createEvent, createStore, sample } from 'effector';

import {
  sectionModel,
  type CreateSectionDto,
} from '@/entities/section';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<number>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<CreateSectionDto>();

export const $projectId = createStore<number | null>(null)
  .on(openRequested, (_, projectId) => projectId)
  .reset(closeRequested, sectionModel.createFx.done);

export const $isOpen = $projectId.map(Boolean);

export const $isSubmitting = sectionModel.createFx.pending;

sample({
  clock: formSubmitted,
  source: $projectId,
  filter: (projectId): projectId is number => projectId !== null,
  fn: (projectId, dto) => ({ projectId, dto }),
  target: sectionModel.sectionCreateSubmitted,
});

sample({
  clock: sectionModel.createFx.done,
  fn: () => 'Раздел создан',
  target: notifySuccessFx,
});

sample({
  clock: sectionModel.createFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const createSectionModel = {
  $projectId,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
