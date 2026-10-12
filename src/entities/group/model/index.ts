import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $groups,
  $isLoading,
  $isMutating,
  $search,
  groupCreateSubmitted,
  groupRemoveRequested,
  groupsRequested,
  groupUpdateSubmitted,
  searchChanged,
} from './stores';

export const groupModel = {
  $groups,
  $search,
  $isLoading,
  $isMutating,
  searchChanged,
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
  SectionGroupsControllerFindAllParams,
  UpdateGroupDto,
  UpdateGroupParams,
} from './types';
