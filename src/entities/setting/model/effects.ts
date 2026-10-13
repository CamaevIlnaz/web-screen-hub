import { createEffect } from 'effector';

import {
  settingsControllerFindAll,
  settingsControllerUpdate,
} from '@/shared/api/generated/settings/settings';

import type { SettingResponseDto, UpdateSettingParams } from './types';

export const findAllFx = createEffect<void, SettingResponseDto[]>(() =>
  settingsControllerFindAll(),
);

export const updateFx = createEffect<UpdateSettingParams, SettingResponseDto>(
  ({ key, dto }) => settingsControllerUpdate(key, dto),
);
