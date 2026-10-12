import { createEvent, createStore, sample } from 'effector';

import { frameModel, type CreateFrameDto } from '@/entities/frame';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<number>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<CreateFrameDto>();

export const $groupId = createStore<number | null>(null)
  .on(openRequested, (_, groupId) => groupId)
  .reset(closeRequested, frameModel.createFx.done);

export const $isOpen = $groupId.map(Boolean);

export const $isSubmitting = frameModel.createFx.pending;

sample({
  clock: formSubmitted,
  source: $groupId,
  filter: (groupId): groupId is number => groupId !== null,
  fn: (groupId, dto) => ({ groupId, dto }),
  target: frameModel.frameCreateSubmitted,
});

sample({
  clock: frameModel.createFx.done,
  fn: () => 'Фрейм создан',
  target: notifySuccessFx,
});

sample({
  clock: frameModel.createFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const createFrameModel = {
  $groupId,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
