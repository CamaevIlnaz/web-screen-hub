import { createRoute } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { groupModel } from '@/entities/group';
import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { sectionModel, type SectionResponseDto } from '@/entities/section';
import { chainAdmin } from '@/entities/session';
import { createGroupModel } from '@/features/create-group';
import { deleteGroupModel } from '@/features/delete-group';
import { editGroupModel } from '@/features/edit-group';
import { notifyErrorFx } from '@/shared/ui';

export const adminGroupsRoute = createRoute<{ id: string; sectionId: string }>();
export const chainAdminGroupsRoute = chainAdmin(adminGroupsRoute);

export const searchInputChanged = createEvent<string>();

export const $section = createStore<SectionResponseDto | null>(null)
  .on(sectionModel.findOneFx.doneData, (_, section) => section)
  .reset(adminGroupsRoute.opened, adminGroupsRoute.closed);

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(projectModel.findOneFx.doneData, (_, project) => project)
  .reset(adminGroupsRoute.opened, adminGroupsRoute.closed);

const debounceSearchFx = createEffect(async (value: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  return value;
});

const toId = (id: string): number => Number(id);

const isValidId = (id: string): boolean => {
  const value = toId(id);
  return Number.isFinite(value) && value > 0;
};

sample({
  clock: adminGroupsRoute.opened,
  filter: ({ params }) => isValidId(params.sectionId),
  fn: ({ params }) => toId(params.sectionId),
  target: [groupModel.groupsRequested, sectionModel.findOneFx],
});

sample({
  clock: sectionModel.findOneFx.doneData,
  source: adminGroupsRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, section) => section.projectId,
  target: projectModel.findOneFx,
});

sample({
  clock: searchInputChanged,
  target: [groupModel.searchChanged, debounceSearchFx],
});

sample({
  clock: debounceSearchFx.doneData,
  source: {
    search: groupModel.$search,
    params: adminGroupsRoute.$params,
  },
  filter: ({ search, params }, debounced) =>
    search === debounced && isValidId(params.sectionId),
  fn: ({ params }) => toId(params.sectionId),
  target: groupModel.groupsRequested,
});

sample({
  clock: [
    groupModel.createFx.done,
    groupModel.updateFx.done,
    groupModel.removeFx.done,
  ],
  source: adminGroupsRoute.$params,
  filter: ({ sectionId }) => isValidId(sectionId),
  fn: ({ sectionId }) => toId(sectionId),
  target: groupModel.groupsRequested,
});

sample({
  clock: groupModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

sample({
  clock: createGroupModel.openRequested,
  target: [
    editGroupModel.closeRequested,
    deleteGroupModel.closeRequested,
  ],
});

sample({
  clock: editGroupModel.openRequested,
  target: [
    createGroupModel.closeRequested,
    deleteGroupModel.closeRequested,
  ],
});

sample({
  clock: deleteGroupModel.openRequested,
  target: [
    createGroupModel.closeRequested,
    editGroupModel.closeRequested,
  ],
});
