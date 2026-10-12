import { createEvent, createStore, sample } from 'effector';

import { groupModel, type GroupResponseDto } from '@/entities/group';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<GroupResponseDto>();
export const closeRequested = createEvent();
export const confirmed = createEvent();

export const $group = createStore<GroupResponseDto | null>(null)
  .on(openRequested, (_, group) => group)
  .reset(closeRequested, groupModel.removeFx.done);

export const $isOpen = $group.map(Boolean);

export const $isSubmitting = groupModel.removeFx.pending;

sample({
  clock: confirmed,
  source: $group,
  filter: (group): group is GroupResponseDto => group !== null,
  fn: (group) => group.id,
  target: groupModel.groupRemoveRequested,
});

sample({
  clock: groupModel.removeFx.done,
  fn: () => 'Группа удалена',
  target: notifySuccessFx,
});

sample({
  clock: groupModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const deleteGroupModel = {
  $group,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  confirmed,
};
