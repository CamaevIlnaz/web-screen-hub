import type {
  CreateSettingDto,
  SettingResponseDto,
  UpdateSettingDto,
} from '@/shared/api/generated/model';

export type { CreateSettingDto, SettingResponseDto, UpdateSettingDto };

export type UpdateSettingParams = {
  key: string;
  dto: UpdateSettingDto;
};
