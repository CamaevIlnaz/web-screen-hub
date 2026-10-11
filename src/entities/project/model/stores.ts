import { combine, createEvent, createStore, sample } from 'effector';

import { createFx, findAllFx, removeFx, updateFx } from './effects';
import type {
  CreateProjectDto,
  ProjectResponseDto,
  UpdateProjectParams,
} from './types';

export const searchChanged = createEvent<string>();
export const projectsRequested = createEvent();
export const projectCreateSubmitted = createEvent<CreateProjectDto>();
export const projectUpdateSubmitted = createEvent<UpdateProjectParams>();
export const projectRemoveRequested = createEvent<number>();

export const $search = createStore('').on(searchChanged, (_, search) => search);

export const $projects = createStore<ProjectResponseDto[]>([])
  .on(findAllFx.doneData, (_, projects) => projects)
  .on(createFx.doneData, (projects, project) => [...projects, project])
  .on(updateFx.doneData, (projects, project) =>
    projects.map((item) => (item.id === project.id ? project : item)),
  )
  .on(removeFx.doneData, (projects, id) => projects.filter((item) => item.id !== id));

export const $isLoading = findAllFx.pending;

export const $isMutating = combine(
  createFx.pending,
  updateFx.pending,
  removeFx.pending,
  (isCreating, isUpdating, isRemoving) => isCreating || isUpdating || isRemoving,
);

sample({
  clock: projectsRequested,
  source: $search,
  fn: (search): { search: string } | void => (search ? { search } : undefined),
  target: findAllFx,
});

sample({
  clock: projectCreateSubmitted,
  target: createFx,
});

sample({
  clock: projectUpdateSubmitted,
  target: updateFx,
});

sample({
  clock: projectRemoveRequested,
  target: removeFx,
});
