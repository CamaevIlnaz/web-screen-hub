import { createEffect } from 'effector';

import {
  frameVersionsControllerCreate,
  frameVersionsControllerFindAll,
  frameVersionsControllerFindCurrent,
  versionsControllerRemove,
} from '@/shared/api/generated/versions/versions';

import type { CreateVersionParams, VersionResponseDto } from './types';

export const findAllFx = createEffect<number, VersionResponseDto[]>((frameId) =>
  frameVersionsControllerFindAll(frameId),
);

export const findCurrentFx = createEffect<number, VersionResponseDto>(
  (frameId) => frameVersionsControllerFindCurrent(frameId),
);

export const findAllByFrameIdsFx = createEffect<
  number[],
  Record<number, VersionResponseDto[]>
>(async (frameIds) => {
  const entries = await Promise.all(
    frameIds.map(async (frameId) => {
      try {
        const versions = await frameVersionsControllerFindAll(frameId);
        return [frameId, versions] as const;
      } catch {
        return [frameId, []] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
});

export const createFx = createEffect<CreateVersionParams, VersionResponseDto>(
  ({ frameId, dto }) => frameVersionsControllerCreate(frameId, dto),
);

export const removeFx = createEffect<number, number>(async (id) => {
  await versionsControllerRemove(id);
  return id;
});
