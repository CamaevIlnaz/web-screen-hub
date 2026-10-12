import type {
  CreateGroupDto,
  GroupResponseDto,
  SectionGroupsControllerFindAllParams,
  UpdateGroupDto,
} from '@/shared/api/generated/model';

export type {
  CreateGroupDto,
  GroupResponseDto,
  SectionGroupsControllerFindAllParams,
  UpdateGroupDto,
};

export type FindAllGroupsParams = {
  sectionId: number;
  params?: SectionGroupsControllerFindAllParams;
};

export type CreateGroupParams = {
  sectionId: number;
  dto: CreateGroupDto;
};

export type UpdateGroupParams = {
  id: number;
  dto: UpdateGroupDto;
};
