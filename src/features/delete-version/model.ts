import { createEvent, createStore, sample } from 'effector';

import { versionModel, type VersionResponseDto } from '@/entities/version';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<VersionResponseDto>();
export const closeRequested = createEvent();
export const confirmed = createEvent();

export const $version = createStore<VersionResponseDto | null>(null)
  .on(openRequested, (_, version) => version)
  .reset(closeRequested, versionModel.removeFx.done);

export const $isOpen = $version.map(Boolean);

export const $isSubmitting = versionModel.removeFx.pending;

sample({
  clock: confirmed,
  source: $version,
  filter: (version): version is VersionResponseDto => version !== null,
  fn: (version) => version.id,
  target: versionModel.versionRemoveRequested,
});

sample({
  clock: versionModel.removeFx.done,
  fn: () => 'Версия удалена',
  target: notifySuccessFx,
});

sample({
  clock: versionModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const deleteVersionModel = {
  $version,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  confirmed,
};
