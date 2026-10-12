import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $frames,
  $isLoading,
  $isMutating,
  frameCreateSubmitted,
  frameRemoveRequested,
  framesRequested,
  frameUpdateSubmitted,
} from './stores';

export const frameModel = {
  $frames,
  $isLoading,
  $isMutating,
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
  UpdateFrameDto,
  UpdateFrameParams,
} from './types';
