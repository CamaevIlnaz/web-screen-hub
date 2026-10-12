import { createEvent, createStore, sample } from 'effector';

import {
  groupModel,
  type GroupResponseDto,
  type UpdateGroupParams,
} from '@/entities/group';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const openRequested = createEvent<GroupResponseDto>();
export const closeRequested = createEvent();
export const formSubmitted = createEvent<UpdateGroupParams>();

export const $group = createStore<GroupResponseDto | null>(null)
  .on(openRequested, (_, group) => group)
  .reset(closeRequested, groupModel.updateFx.done);

export const $isOpen = $group.map(Boolean);

export const $isSubmitting = groupModel.updateFx.pending;

sample({
  clock: formSubmitted,
  target: groupModel.groupUpdateSubmitted,
});

sample({
  clock: groupModel.updateFx.done,
  fn: () => 'Группа обновлена',
  target: notifySuccessFx,
});

sample({
  clock: groupModel.updateFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const editGroupModel = {
  $group,
  $isOpen,
  $isSubmitting,
  openRequested,
  closeRequested,
  formSubmitted,
};
