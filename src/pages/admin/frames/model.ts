import { createRoute } from 'atomic-router';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';

import { frameModel, type FrameResponseDto } from '@/entities/frame';
import { groupModel, type GroupResponseDto } from '@/entities/group';
import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { sectionModel, type SectionResponseDto } from '@/entities/section';
import { chainAdmin } from '@/entities/session';
import { versionModel } from '@/entities/version';
import { createFrameModel } from '@/features/create-frame';
import { createVersionModel } from '@/features/create-version';
import { deleteFrameModel } from '@/features/delete-frame';
import { deleteVersionModel } from '@/features/delete-version';
import { editFrameModel } from '@/features/edit-frame';
import { notifyErrorFx } from '@/shared/ui';

export type AdminFramesParams = {
  id: string;
  sectionId: string;
  groupId: string;
};

export const adminFramesRoute = createRoute<AdminFramesParams>();
export const chainAdminFramesRoute = chainAdmin(adminFramesRoute);

export const searchInputChanged = createEvent<string>();
export const frameSelected = createEvent<number>();
export const versionPreviewOpened = createEvent<string>();
export const versionPreviewClosed = createEvent();

export const $group = createStore<GroupResponseDto | null>(null)
  .on(groupModel.findOneFx.doneData, (_, group) => group)
  .reset(adminFramesRoute.closed);

export const $section = createStore<SectionResponseDto | null>(null)
  .on(sectionModel.findOneFx.doneData, (_, section) => section)
  .reset(adminFramesRoute.closed);

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(projectModel.findOneFx.doneData, (_, project) => project)
  .reset(adminFramesRoute.closed);

export const $previewUrl = createStore<string | null>(null)
  .on(versionPreviewOpened, (_, url) => url)
  .reset(versionPreviewClosed);

export const $selectedFrameId = createStore<number | null>(null)
  .on(frameSelected, (_, frameId) => frameId)
  .reset(adminFramesRoute.closed);

export const $selectedFrame = combine(
  frameModel.$frames,
  $selectedFrameId,
  (frames, selectedId): FrameResponseDto | null => {
    if (selectedId === null) {
      return null;
    }

    return frames.find((frame) => frame.id === selectedId) ?? null;
  },
);

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
  clock: adminFramesRoute.opened,
  filter: ({ params }) => isValidId(params.groupId),
  fn: ({ params }) => toId(params.groupId),
  target: [frameModel.framesRequested, groupModel.findOneFx],
});

sample({
  clock: groupModel.findOneFx.doneData,
  source: adminFramesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, group) => group.sectionId,
  target: sectionModel.findOneFx,
});

sample({
  clock: sectionModel.findOneFx.doneData,
  source: adminFramesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, section) => section.projectId,
  target: projectModel.findOneFx,
});

sample({
  clock: searchInputChanged,
  target: [frameModel.searchChanged, debounceSearchFx],
});

sample({
  clock: debounceSearchFx.doneData,
  source: {
    search: frameModel.$search,
    params: adminFramesRoute.$params,
  },
  filter: ({ search, params }, debounced) =>
    search === debounced && isValidId(params.groupId),
  fn: ({ params }) => toId(params.groupId),
  target: frameModel.framesRequested,
});

sample({
  clock: frameModel.findAllFx.doneData,
  fn: (frames) => frames.map((frame) => frame.id),
  target: versionModel.versionsByFrameIdsRequested,
});

sample({
  clock: frameModel.findAllFx.doneData,
  source: $selectedFrameId,
  fn: (selectedId, frames): number | null => {
    if (frames.length === 0) {
      return null;
    }

    if (
      selectedId !== null &&
      frames.some((frame) => frame.id === selectedId)
    ) {
      return selectedId;
    }

    return frames[0].id;
  },
  target: $selectedFrameId,
});

sample({
  clock: $selectedFrameId,
  filter: (frameId): frameId is number => frameId !== null,
  target: versionModel.versionsRequested,
});

sample({
  clock: [
    frameModel.createFx.done,
    frameModel.updateFx.done,
    frameModel.removeFx.done,
  ],
  source: adminFramesRoute.$params,
  filter: ({ groupId }) => isValidId(groupId),
  fn: ({ groupId }) => toId(groupId),
  target: frameModel.framesRequested,
});

sample({
  clock: frameModel.createFx.doneData,
  fn: (frame) => frame.id,
  target: frameSelected,
});

sample({
  clock: frameModel.removeFx.doneData,
  source: {
    frames: frameModel.$frames,
    selectedId: $selectedFrameId,
  },
  filter: ({ selectedId }, removedId) => selectedId === removedId,
  fn: ({ frames }) => frames[0]?.id ?? null,
  target: $selectedFrameId,
});

sample({
  clock: [versionModel.createFx.done, versionModel.removeFx.done],
  source: $selectedFrameId,
  filter: (frameId): frameId is number => frameId !== null,
  target: versionModel.versionsRequested,
});

sample({
  clock: [
    frameModel.findAllFx.failData,
    groupModel.findOneFx.failData,
    versionModel.findAllFx.failData,
    versionModel.findAllByFrameIdsFx.failData,
  ],
  fn: (error) => error.message,
  target: notifyErrorFx,
});

sample({
  clock: createFrameModel.openRequested,
  target: [
    createVersionModel.closeRequested,
    editFrameModel.closeRequested,
    deleteFrameModel.closeRequested,
    deleteVersionModel.closeRequested,
  ],
});

sample({
  clock: createVersionModel.openRequested,
  target: [
    createFrameModel.closeRequested,
    editFrameModel.closeRequested,
    deleteFrameModel.closeRequested,
    deleteVersionModel.closeRequested,
  ],
});

sample({
  clock: editFrameModel.openRequested,
  target: [
    createFrameModel.closeRequested,
    createVersionModel.closeRequested,
    deleteFrameModel.closeRequested,
    deleteVersionModel.closeRequested,
  ],
});

sample({
  clock: deleteFrameModel.openRequested,
  target: [
    createFrameModel.closeRequested,
    createVersionModel.closeRequested,
    editFrameModel.closeRequested,
    deleteVersionModel.closeRequested,
  ],
});

sample({
  clock: deleteVersionModel.openRequested,
  target: [
    createFrameModel.closeRequested,
    createVersionModel.closeRequested,
    editFrameModel.closeRequested,
    deleteFrameModel.closeRequested,
  ],
});
