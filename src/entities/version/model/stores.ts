import { combine, createEvent, createStore, sample } from 'effector';

import {
  createFx,
  findAllByFrameIdsFx,
  findAllFx,
  removeFx,
} from './effects';
import type { CreateVersionParams, VersionResponseDto } from './types';

export const versionsRequested = createEvent<number>();
export const versionsByFrameIdsRequested = createEvent<number[]>();
export const versionCreateSubmitted = createEvent<CreateVersionParams>();
export const versionRemoveRequested = createEvent<number>();

export const $versions = createStore<VersionResponseDto[]>([])
  .on(findAllFx.doneData, (_, versions) => versions)
  .on(createFx.doneData, (versions, version) => [...versions, version])
  .on(removeFx.doneData, (versions, id) =>
    versions.filter((item) => item.id !== id),
  );

export const $versionsByFrameId = createStore<
  Record<number, VersionResponseDto[]>
>({})
  .on(findAllByFrameIdsFx.doneData, (_, map) => map)
  .on(findAllFx.done, (map, { params: frameId, result }) => ({
    ...map,
    [frameId]: result,
  }))
  .on(createFx.doneData, (map, version) => ({
    ...map,
    [version.frameId]: [...(map[version.frameId] ?? []), version],
  }))
  .on(removeFx.doneData, (map, id) => {
    const next: Record<number, VersionResponseDto[]> = {};

    for (const [frameId, versions] of Object.entries(map)) {
      next[Number(frameId)] = versions.filter((item) => item.id !== id);
    }

    return next;
  });

export const $isLoading = findAllFx.pending;
export const $isMapLoading = findAllByFrameIdsFx.pending;

export const $isMutating = combine(
  createFx.pending,
  removeFx.pending,
  (isCreating, isRemoving) => isCreating || isRemoving,
);

sample({
  clock: versionsRequested,
  target: findAllFx,
});

sample({
  clock: versionsByFrameIdsRequested,
  target: findAllByFrameIdsFx,
});

sample({
  clock: versionCreateSubmitted,
  target: createFx,
});

sample({
  clock: versionRemoveRequested,
  target: removeFx,
});
