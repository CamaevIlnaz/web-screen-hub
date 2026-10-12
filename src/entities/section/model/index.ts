import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $isLoading,
  $isMutating,
  $search,
  $sections,
  searchChanged,
  sectionCreateSubmitted,
  sectionRemoveRequested,
  sectionsRequested,
  sectionUpdateSubmitted,
} from './stores';

export const sectionModel = {
  $sections,
  $search,
  $isLoading,
  $isMutating,
  searchChanged,
  sectionsRequested,
  sectionCreateSubmitted,
  sectionUpdateSubmitted,
  sectionRemoveRequested,
  findAllFx,
  findOneFx,
  createFx,
  updateFx,
  removeFx,
};

export type {
  CreateSectionDto,
  CreateSectionParams,
  FindAllSectionsParams,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  UpdateSectionDto,
  UpdateSectionParams,
} from './types';
