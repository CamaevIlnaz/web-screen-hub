import { createEffect } from 'effector';

import {
  framesControllerFindOne,
  framesControllerRemove,
  framesControllerUpdate,
  groupFramesControllerCreate,
  groupFramesControllerFindAll,
} from '@/shared/api/generated/frames/frames';

import type {
  CreateFrameParams,
  FindAllFramesParams,
  FrameResponseDto,
  UpdateFrameParams,
} from './types';

export const findAllFx = createEffect<FindAllFramesParams, FrameResponseDto[]>(
  ({ groupId }) => groupFramesControllerFindAll(groupId),
);

export const findOneFx = createEffect<number, FrameResponseDto>((id) =>
  framesControllerFindOne(id),
);

export const createFx = createEffect<CreateFrameParams, FrameResponseDto>(
  ({ groupId, dto }) => groupFramesControllerCreate(groupId, dto),
);

export const updateFx = createEffect<UpdateFrameParams, FrameResponseDto>(
  ({ id, dto }) => framesControllerUpdate(id, dto),
);

export const removeFx = createEffect<number, number>(async (id) => {
  await framesControllerRemove(id);
  return id;
});
