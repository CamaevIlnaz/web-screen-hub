import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $groups,
  $isLoading,
  $isMutating,
  groupCreateSubmitted,
  groupRemoveRequested,
  groupsRequested,
  groupUpdateSubmitted,
} from './stores';

export const groupModel = {
  $groups,
  $isLoading,
  $isMutating,
  groupsRequested,
  groupCreateSubmitted,
  groupUpdateSubmitted,
  groupRemoveRequested,
  findAllFx,
  findOneFx,
  createFx,
  updateFx,
  removeFx,
};

export type {
  CreateGroupDto,
  CreateGroupParams,
  FindAllGroupsParams,
  GroupResponseDto,
  UpdateGroupDto,
  UpdateGroupParams,
} from './types';
