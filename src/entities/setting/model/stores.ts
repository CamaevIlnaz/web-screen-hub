import { createEvent, createStore, sample } from 'effector';

import { createFx, findAllFx, removeFx, updateFx } from './effects';
import type {
  CreateSettingDto,
  SettingResponseDto,
  UpdateSettingParams,
} from './types';

export const settingsRequested = createEvent();
export const settingCreateSubmitted = createEvent<CreateSettingDto>();
export const settingUpdateSubmitted = createEvent<UpdateSettingParams>();
export const settingRemoveRequested = createEvent<string>();

export const $settings = createStore<SettingResponseDto[]>([])
  .on(findAllFx.doneData, (_, settings) => settings)
  .on(createFx.doneData, (settings, setting) => [...settings, setting])
  .on(updateFx.doneData, (settings, setting) =>
    settings.map((item) => (item.key === setting.key ? setting : item)),
  )
  .on(removeFx.doneData, (settings, key) =>
    settings.filter((item) => item.key !== key),
  );

export const $isLoading = findAllFx.pending;

export const $isCreating = createFx.pending;

export const $updatingKey = createStore<string | null>(null)
  .on(settingUpdateSubmitted, (_, params) => params.key)
  .reset(updateFx.finally);

export const $removingKey = createStore<string | null>(null)
  .on(settingRemoveRequested, (_, key) => key)
  .reset(removeFx.finally);

sample({
  clock: settingsRequested,
  target: findAllFx,
});

sample({
  clock: settingCreateSubmitted,
  target: createFx,
});

sample({
  clock: settingUpdateSubmitted,
  target: updateFx,
});

sample({
  clock: settingRemoveRequested,
  target: removeFx,
});
