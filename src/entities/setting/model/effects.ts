import { createEffect } from 'effector';

import {
  settingsControllerCreate,
  settingsControllerFindAll,
  settingsControllerRemove,
  settingsControllerUpdate,
} from '@/shared/api/generated/settings/settings';

import type {
  CreateSettingDto,
  SettingResponseDto,
  UpdateSettingParams,
} from './types';

export const findAllFx = createEffect<void, SettingResponseDto[]>(() =>
  settingsControllerFindAll(),
);

export const createFx = createEffect<CreateSettingDto, SettingResponseDto>(
  (dto) => settingsControllerCreate(dto),
);

export const updateFx = createEffect<UpdateSettingParams, SettingResponseDto>(
  ({ key, dto }) => settingsControllerUpdate(key, dto),
);

export const removeFx = createEffect<string, string>(async (key) => {
  await settingsControllerRemove(key);
  return key;
});
