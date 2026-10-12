import { createEvent, createStore, sample } from 'effector';

import { frameModel, type FrameResponseDto } from '@/entities/frame';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<FrameResponseDto>();
export const closeRequested = createEvent();
export const confirmed = createEvent();

export const $frame = createStore<FrameResponseDto | null>(null)
  .on(openRequested, (_, frame) => frame)
  .reset(closeRequested, frameModel.removeFx.done);

export const $isOpen = $frame.map(Boolean);

export const $isSubmitting = frameModel.removeFx.pending;

sample({
  clock: confirmed,
  source: $frame,
  filter: (frame): frame is FrameResponseDto => frame !== null,
  fn: (frame) => frame.id,
  target: frameModel.frameRemoveRequested,
});

sample({
  clock: frameModel.removeFx.done,
  fn: () => 'Фрейм удалён',
  target: notifySuccessFx,
});

sample({
  clock: frameModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const deleteFrameModel = {
  $frame,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  confirmed,
};
