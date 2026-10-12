import { createEvent, createStore, sample } from 'effector';

import { groupModel, type CreateGroupDto } from '@/entities/group';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<number>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<CreateGroupDto>();

export const $sectionId = createStore<number | null>(null)
  .on(openRequested, (_, sectionId) => sectionId)
  .reset(closeRequested, groupModel.createFx.done);

export const $isOpen = $sectionId.map(Boolean);

export const $isSubmitting = groupModel.createFx.pending;

sample({
  clock: formSubmitted,
  source: $sectionId,
  filter: (sectionId): sectionId is number => sectionId !== null,
  fn: (sectionId, dto) => ({ sectionId, dto }),
  target: groupModel.groupCreateSubmitted,
});

sample({
  clock: groupModel.createFx.done,
  fn: () => 'Группа создана',
  target: notifySuccessFx,
});

sample({
  clock: groupModel.createFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const createGroupModel = {
  $sectionId,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
