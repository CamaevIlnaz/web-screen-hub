import { combine, createEvent, createStore, sample } from 'effector';

import { createFx, findAllFx, removeFx, updateFx } from './effects';
import type {
  CreateGroupParams,
  FindAllGroupsParams,
  GroupResponseDto,
  UpdateGroupParams,
} from './types';

export const groupsRequested = createEvent<number>();
export const groupCreateSubmitted = createEvent<CreateGroupParams>();
export const groupUpdateSubmitted = createEvent<UpdateGroupParams>();
export const groupRemoveRequested = createEvent<number>();

export const $groups = createStore<GroupResponseDto[]>([])
  .on(findAllFx.doneData, (_, groups) => groups)
  .on(createFx.doneData, (groups, group) => [...groups, group])
  .on(updateFx.doneData, (groups, group) =>
    groups.map((item) => (item.id === group.id ? group : item)),
  )
  .on(removeFx.doneData, (groups, id) => groups.filter((item) => item.id !== id));

export const $isLoading = findAllFx.pending;

export const $isMutating = combine(
  createFx.pending,
  updateFx.pending,
  removeFx.pending,
  (isCreating, isUpdating, isRemoving) => isCreating || isUpdating || isRemoving,
);

sample({
  clock: groupsRequested,
  fn: (sectionId): FindAllGroupsParams => ({ sectionId }),
  target: findAllFx,
});

sample({
  clock: groupCreateSubmitted,
  target: createFx,
});

sample({
  clock: groupUpdateSubmitted,
  target: updateFx,
});

sample({
  clock: groupRemoveRequested,
  target: removeFx,
});
