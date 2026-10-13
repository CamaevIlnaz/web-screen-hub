import type {
  CreateSectionDto,
  FigmaSyncResultDto,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  SectionResponseDtoSyncStatus,
  UpdateSectionDto,
} from '@/shared/api/generated/model';

export type {
  CreateSectionDto,
  FigmaSyncResultDto,
  ProjectSectionsControllerFindAllParams,
  SectionResponseDto,
  SectionResponseDtoSyncStatus,
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
