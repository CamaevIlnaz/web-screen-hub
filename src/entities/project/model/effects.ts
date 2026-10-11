import { createEffect } from 'effector';

import {
  projectsControllerCreate,
  projectsControllerFindAll,
  projectsControllerFindOne,
  projectsControllerRemove,
  projectsControllerUpdate,
} from '@/shared/api/generated/projects/projects';

import type {
  CreateProjectDto,
  ProjectResponseDto,
  ProjectsControllerFindAllParams,
  UpdateProjectParams,
} from './types';

export const findAllFx = createEffect<
  ProjectsControllerFindAllParams | void,
  ProjectResponseDto[]
>((params) => projectsControllerFindAll(params || undefined));

export const findOneFx = createEffect<number, ProjectResponseDto>((id) =>
  projectsControllerFindOne(id),
);

export const createFx = createEffect<CreateProjectDto, ProjectResponseDto>((dto) =>
  projectsControllerCreate(dto),
);

export const updateFx = createEffect<UpdateProjectParams, ProjectResponseDto>(({ id, dto }) =>
  projectsControllerUpdate(id, dto),
);

export const removeFx = createEffect<number, number>(async (id) => {
  await projectsControllerRemove(id);
  return id;
});
