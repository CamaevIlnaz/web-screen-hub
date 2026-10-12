import type {
  CreateFrameDto,
  FrameResponseDto,
  UpdateFrameDto,
} from '@/shared/api/generated/model';

export type {
  CreateFrameDto,
  FrameResponseDto,
  UpdateFrameDto,
};

export type FindAllFramesParams = {
  groupId: number;
};

export type CreateFrameParams = {
  groupId: number;
  dto: CreateFrameDto;
};

export type UpdateFrameParams = {
  id: number;
  dto: UpdateFrameDto;
};
