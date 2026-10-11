import { createFx, findAllFx, findOneFx, removeFx, updateFx } from './effects';
import {
  $isLoading,
  $isMutating,
  $projects,
  $search,
  projectCreateSubmitted,
  projectRemoveRequested,
  projectsRequested,
  projectUpdateSubmitted,
  searchChanged,
} from './stores';

export const projectModel = {
  $projects,
  $search,
  $isLoading,
  $isMutating,
  searchChanged,
  projectsRequested,
  projectCreateSubmitted,
  projectUpdateSubmitted,
  projectRemoveRequested,
  findAllFx,
  findOneFx,
  createFx,
  updateFx,
  removeFx,
};

export type {
  CreateProjectDto,
  ProjectResponseDto,
  ProjectsControllerFindAllParams,
  UpdateProjectDto,
  UpdateProjectParams,
} from './types';
