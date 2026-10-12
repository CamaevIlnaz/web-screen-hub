import { createEvent, createStore, sample } from 'effector';

import {
  sectionModel,
  type SectionResponseDto,
  type UpdateSectionParams,
} from '@/entities/section';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<SectionResponseDto>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<UpdateSectionParams>();

export const $section = createStore<SectionResponseDto | null>(null)
  .on(openRequested, (_, section) => section)
  .reset(closeRequested, sectionModel.updateFx.done);

export const $isOpen = $section.map(Boolean);

export const $isSubmitting = sectionModel.updateFx.pending;

sample({
  clock: formSubmitted,
  target: sectionModel.sectionUpdateSubmitted,
});

sample({
  clock: sectionModel.updateFx.done,
  fn: () => 'Раздел обновлён',
  target: notifySuccessFx,
});

sample({
  clock: sectionModel.updateFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const editSectionModel = {
  $section,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
