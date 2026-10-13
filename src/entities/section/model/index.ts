import { createFx, findAllFx, findOneFx, removeFx, syncFx, updateFx } from './effects';
import {
  $isLoading,
  $isMutating,
  $search,
  $sections,
  $syncingIds,
  searchChanged,
  sectionCreateSubmitted,
  sectionRemoveRequested,
  sectionsRequested,
  sectionSyncRequested,
  sectionUpdateSubmitted,
} from './stores';

export const sectionModel = {
  $sections,
  $search,
  $isLoading,
  $isMutating,
  $syncingIds,
  searchChanged,
  sectionsRequested,
  sectionCreateSubmitted,
  sectionUpdateSubmitted,
  sectionRemoveRequested,
  sectionSyncRequested,
  findAllFx,
  findOneFx,
  createFx,
  updateFx,
  removeFx,
  syncFx,
};

export type {
  CreateSectionDto,
  CreateSectionParams,
  FigmaSyncResultDto,
  FindAllSectionsParams,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  SectionResponseDtoSyncStatus,
  UpdateSectionDto,
  UpdateSectionParams,
} from './types';
