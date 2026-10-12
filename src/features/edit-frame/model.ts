import { createEvent, createStore, sample } from 'effector';

import {
  frameModel,
  type FrameResponseDto,
  type UpdateFrameParams,
} from '@/entities/frame';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<FrameResponseDto>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<UpdateFrameParams>();

export const $frame = createStore<FrameResponseDto | null>(null)
  .on(openRequested, (_, frame) => frame)
  .reset(closeRequested, frameModel.updateFx.done);

export const $isOpen = $frame.map(Boolean);

export const $isSubmitting = frameModel.updateFx.pending;

sample({
  clock: formSubmitted,
  target: frameModel.frameUpdateSubmitted,
});

sample({
  clock: frameModel.updateFx.done,
  fn: () => 'Фрейм обновлён',
  target: notifySuccessFx,
});

sample({
  clock: frameModel.updateFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const editFrameModel = {
  $frame,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
