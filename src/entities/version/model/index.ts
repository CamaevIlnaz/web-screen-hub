import {
  createFx,
  findAllByFrameIdsFx,
  findAllFx,
  findCurrentFx,
  removeFx,
} from './effects';
import {
  $isLoading,
  $isMapLoading,
  $isMutating,
  $versions,
  $versionsByFrameId,
  versionCreateSubmitted,
  versionRemoveRequested,
  versionsByFrameIdsRequested,
  versionsRequested,
} from './stores';

export const versionModel = {
  $versions,
  $versionsByFrameId,
  $isLoading,
  $isMapLoading,
  $isMutating,
  versionsRequested,
  versionsByFrameIdsRequested,
  versionCreateSubmitted,
  versionRemoveRequested,
  findAllFx,
  findAllByFrameIdsFx,
  findCurrentFx,
  createFx,
  removeFx,
};

export type {
  CreateVersionDto,
  CreateVersionParams,
  UpdateVersionDto,
  VersionResponseDto,
  VersionResponseDtoUploadType,
} from './types';
