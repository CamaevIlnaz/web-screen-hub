import { findAllFx, updateFx } from './effects';
import {
  $isLoading,
  $isUpdating,
  $settings,
  $updatingKey,
  settingsRequested,
  settingUpdateSubmitted,
} from './stores';

export const settingModel = {
  $settings,
  $isLoading,
  $isUpdating,
  $updatingKey,
  settingsRequested,
  settingUpdateSubmitted,
  findAllFx,
  updateFx,
};

export type {
  SettingResponseDto,
  UpdatableSettingKey,
  UpdateSettingDto,
  UpdateSettingParams,
} from './types';
