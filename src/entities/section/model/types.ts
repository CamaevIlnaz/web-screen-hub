import type {
  CreateSectionDto,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  UpdateSectionDto,
} from '@/shared/api/generated/model';

export type {
  CreateSectionDto,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  UpdateSectionDto,
};

export type FindAllSectionsParams = {
  projectId: number;
  params?: ProjectSectionsControllerFindAllParams;
};

export type CreateSectionParams = {
  projectId: number;
  dto: CreateSectionDto;
};

export type UpdateSectionParams = {
  id: number;
  dto: UpdateSectionDto;
};
