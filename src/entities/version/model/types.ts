import type {
  CreateVersionDto,
  UpdateVersionDto,
  VersionResponseDto,
  VersionResponseDtoUploadType,
} from '@/shared/api/generated/model';

export type {
  CreateVersionDto,
  UpdateVersionDto,
  VersionResponseDto,
  VersionResponseDtoUploadType,
};

export type CreateVersionParams = {
  frameId: number;
  dto: CreateVersionDto;
};
