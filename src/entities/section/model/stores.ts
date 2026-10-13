import { combine, createEvent, createStore, sample } from 'effector';

import { createFx, findAllFx, removeFx, syncFx, updateFx } from './effects';
import type {
  CreateSectionParams,
  FindAllSectionsParams,
  SectionResponseDto,
  UpdateSectionParams,
} from './types';

export const searchChanged = createEvent<string>();
export const sectionsRequested = createEvent<number>();
export const sectionCreateSubmitted = createEvent<CreateSectionParams>();
export const sectionUpdateSubmitted = createEvent<UpdateSectionParams>();
export const sectionRemoveRequested = createEvent<number>();
export const sectionSyncRequested = createEvent<number>();

export const $search = createStore('').on(searchChanged, (_, search) => search);

export const $sections = createStore<SectionResponseDto[]>([])
  .on(findAllFx.doneData, (_, sections) => sections)
  .on(createFx.doneData, (sections, section) => [...sections, section])
  .on(updateFx.doneData, (sections, section) =>
    sections.map((item) => (item.id === section.id ? section : item)),
  )
  .on(removeFx.doneData, (sections, id) => sections.filter((item) => item.id !== id));

export const $isLoading = findAllFx.pending;

export const $isMutating = combine(
  createFx.pending,
  updateFx.pending,
  removeFx.pending,
  (isCreating, isUpdating, isRemoving) => isCreating || isUpdating || isRemoving,
);

export const $syncingIds = createStore<number[]>([])
  .on(syncFx, (ids, id) => [...ids, id])
  .on(syncFx.finally, (ids, { params }) => ids.filter((id) => id !== params));

sample({
  clock: sectionsRequested,
  source: $search,
  fn: (search, projectId): FindAllSectionsParams => ({
    projectId,
    params: search ? { search } : undefined,
  }),
  target: findAllFx,
});

sample({
  clock: sectionCreateSubmitted,
  target: createFx,
});

sample({
  clock: sectionUpdateSubmitted,
  target: updateFx,
});

sample({
  clock: sectionRemoveRequested,
  target: removeFx,
});

sample({
  clock: sectionSyncRequested,
  source: $syncingIds,
  filter: (ids, id) => !ids.includes(id),
  fn: (_, id) => id,
  target: syncFx,
});
