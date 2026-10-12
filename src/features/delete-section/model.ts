import { createEvent, createStore, sample } from 'effector';

import { sectionModel, type SectionResponseDto } from '@/entities/section';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<SectionResponseDto>();
export const closeRequested = createEvent();
export const confirmed = createEvent();

export const $section = createStore<SectionResponseDto | null>(null)
  .on(openRequested, (_, section) => section)
  .reset(closeRequested, sectionModel.removeFx.done);

export const $isOpen = $section.map(Boolean);

export const $isSubmitting = sectionModel.removeFx.pending;

sample({
  clock: confirmed,
  source: $section,
  filter: (section): section is SectionResponseDto => section !== null,
  fn: (section) => section.id,
  target: sectionModel.sectionRemoveRequested,
});

sample({
  clock: sectionModel.removeFx.done,
  fn: () => 'Раздел удалён',
  target: notifySuccessFx,
});

sample({
  clock: sectionModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const deleteSectionModel = {
  $section,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  confirmed,
};
