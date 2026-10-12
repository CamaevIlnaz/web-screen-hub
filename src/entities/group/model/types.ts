import type {
  CreateGroupDto,
  GroupResponseDto,
  UpdateGroupDto,
} from '@/shared/api/generated/model';

export type {
  CreateGroupDto,
  GroupResponseDto,
  UpdateGroupDto,
};

export type FindAllGroupsParams = {
  sectionId: number;
};

export type CreateGroupParams = {
  sectionId: number;
  dto: CreateGroupDto;
};

export type UpdateGroupParams = {
  id: number;
  dto: UpdateGroupDto;
};
