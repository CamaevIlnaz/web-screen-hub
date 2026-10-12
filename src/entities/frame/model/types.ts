import type {
  CreateFrameDto,
  FrameResponseDto,
  GroupFramesControllerFindAllParams,
  UpdateFrameDto,
} from '@/shared/api/generated/model';

export type {
  CreateFrameDto,
  FrameResponseDto,
  GroupFramesControllerFindAllParams,
  UpdateFrameDto,
};

export type FindAllFramesParams = {
  groupId: number;
  params?: GroupFramesControllerFindAllParams;
};

export type CreateFrameParams = {
  groupId: number;
  dto: CreateFrameDto;
};

export type UpdateFrameParams = {
  id: number;
  dto: UpdateFrameDto;
};
