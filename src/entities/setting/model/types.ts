import type {
  SettingResponseDto,
  UpdateSettingDto,
} from '@/shared/api/generated/model';

export type { SettingResponseDto, UpdateSettingDto };

/** Ключи, которые можно изменять через PATCH /api/settings/{key} */
export type UpdatableSettingKey = 'figma.token';

export type UpdateSettingParams = {
  key: UpdatableSettingKey;
  dto: UpdateSettingDto;
};
