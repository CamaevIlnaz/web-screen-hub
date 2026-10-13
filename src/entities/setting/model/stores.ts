import { createEvent, createStore, sample } from 'effector';

import { findAllFx, updateFx } from './effects';
import type { SettingResponseDto, UpdateSettingParams } from './types';

export const settingsRequested = createEvent();
export const settingUpdateSubmitted = createEvent<UpdateSettingParams>();

export const $settings = createStore<SettingResponseDto[]>([])
  .on(findAllFx.doneData, (_, settings) => settings)
  .on(updateFx.doneData, (settings, setting) =>
    settings.map((item) => (item.key === setting.key ? setting : item)),
  );

export const $isLoading = findAllFx.pending;

export const $isUpdating = updateFx.pending;

export const $updatingKey = createStore<string | null>(null)
  .on(settingUpdateSubmitted, (_, params) => params.key)
  .reset(updateFx.finally);

sample({
  clock: settingsRequested,
  target: findAllFx,
});

sample({
  clock: settingUpdateSubmitted,
  target: updateFx,
});
