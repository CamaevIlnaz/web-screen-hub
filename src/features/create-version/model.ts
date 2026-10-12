import { createEvent, createStore, sample } from 'effector';

import { versionModel, type CreateVersionDto } from '@/entities/version';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<number>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<CreateVersionDto>();

export const $frameId = createStore<number | null>(null)
  .on(openRequested, (_, frameId) => frameId)
  .reset(closeRequested, versionModel.createFx.done);

export const $isOpen = $frameId.map(Boolean);

export const $isSubmitting = versionModel.createFx.pending;

sample({
  clock: formSubmitted,
  source: $frameId,
  filter: (frameId): frameId is number => frameId !== null,
  fn: (frameId, dto) => ({ frameId, dto }),
  target: versionModel.versionCreateSubmitted,
});

sample({
  clock: versionModel.createFx.done,
  fn: () => 'Версия создана',
  target: notifySuccessFx,
});

sample({
  clock: versionModel.createFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const createVersionModel = {
  $frameId,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
