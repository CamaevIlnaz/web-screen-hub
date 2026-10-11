import type {
  CreateProjectDto,
  ProjectResponseDto,
  ProjectsControllerFindAllParams,
  UpdateProjectDto,
} from '@/shared/api/generated/model';

export type {
  CreateProjectDto,
  ProjectResponseDto,
  ProjectsControllerFindAllParams,
  UpdateProjectDto,
};

export type UpdateProjectParams = {
  id: number;
  dto: UpdateProjectDto;
};
