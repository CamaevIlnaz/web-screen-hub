import { createEffect } from 'effector';

import {
  groupsControllerFindOne,
  groupsControllerRemove,
  groupsControllerUpdate,
  sectionGroupsControllerCreate,
  sectionGroupsControllerFindAll,
} from '@/shared/api/generated/groups/groups';

import type {
  CreateGroupParams,
  FindAllGroupsParams,
  GroupResponseDto,
  UpdateGroupParams,
} from './types';

export const findAllFx = createEffect<FindAllGroupsParams, GroupResponseDto[]>(
  ({ sectionId }) => sectionGroupsControllerFindAll(sectionId),
);

export const findOneFx = createEffect<number, GroupResponseDto>((id) =>
  groupsControllerFindOne(id),
);

export const createFx = createEffect<CreateGroupParams, GroupResponseDto>(
  ({ sectionId, dto }) => sectionGroupsControllerCreate(sectionId, dto),
);

export const updateFx = createEffect<UpdateGroupParams, GroupResponseDto>(
  ({ id, dto }) => groupsControllerUpdate(id, dto),
);

export const removeFx = createEffect<number, number>(async (id) => {
  await groupsControllerRemove(id);
  return id;
});
