import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $frames,
  $isLoading,
  $isMutating,
  $search,
  frameCreateSubmitted,
  frameRemoveRequested,
  framesRequested,
  frameUpdateSubmitted,
  searchChanged,
} from './stores';

export const frameModel = {
  $frames,
  $search,
  $isLoading,
  $isMutating,
  searchChanged,
  framesRequested,
  frameCreateSubmitted,
  frameUpdateSubmitted,
  frameRemoveRequested,
  findAllFx,
  findOneFx,
  createFx,
  updateFx,
  removeFx,
};

export type {
  CreateFrameDto,
  CreateFrameParams,
  FindAllFramesParams,
  FrameResponseDto,
  GroupFramesControllerFindAllParams,
  UpdateFrameDto,
  UpdateFrameParams,
} from './types';
