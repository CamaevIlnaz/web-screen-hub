import { combine, createEvent, createStore, sample } from 'effector';

import { createFx, findAllFx, removeFx, updateFx } from './effects';
import type {
  CreateFrameParams,
  FindAllFramesParams,
  FrameResponseDto,
  UpdateFrameParams,
} from './types';

export const framesRequested = createEvent<number>();
export const frameCreateSubmitted = createEvent<CreateFrameParams>();
export const frameUpdateSubmitted = createEvent<UpdateFrameParams>();
export const frameRemoveRequested = createEvent<number>();

export const $frames = createStore<FrameResponseDto[]>([])
  .on(findAllFx.doneData, (_, frames) => frames)
  .on(createFx.doneData, (frames, frame) => [...frames, frame])
  .on(updateFx.doneData, (frames, frame) =>
    frames.map((item) => (item.id === frame.id ? frame : item)),
  )
  .on(removeFx.doneData, (frames, id) => frames.filter((item) => item.id !== id));

export const $isLoading = findAllFx.pending;

export const $isMutating = combine(
  createFx.pending,
  updateFx.pending,
  removeFx.pending,
  (isCreating, isUpdating, isRemoving) => isCreating || isUpdating || isRemoving,
);

sample({
  clock: framesRequested,
  fn: (groupId): FindAllFramesParams => ({ groupId }),
  target: findAllFx,
});

sample({
  clock: frameCreateSubmitted,
  target: createFx,
});

sample({
  clock: frameUpdateSubmitted,
  target: updateFx,
});

sample({
  clock: frameRemoveRequested,
  target: removeFx,
});
