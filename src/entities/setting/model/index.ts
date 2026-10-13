import { createFx, findAllFx, removeFx, updateFx } from './effects';
import {
  $isCreating,
  $isLoading,
  $removingKey,
  $settings,
  $updatingKey,
  settingCreateSubmitted,
  settingRemoveRequested,
  settingsRequested,
  settingUpdateSubmitted,
} from './stores';

export const settingModel = {
  $settings,
  $isLoading,
  $isCreating,
  $updatingKey,
  $removingKey,
  settingsRequested,
  settingCreateSubmitted,
  settingUpdateSubmitted,
  settingRemoveRequested,
  findAllFx,
  createFx,
  updateFx,
  removeFx,
};

export type {
  CreateSettingDto,
  SettingResponseDto,
  UpdateSettingDto,
  UpdateSettingParams,
} from './types';
