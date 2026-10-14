import { createRoute } from 'atomic-router';
import { combine, createEffect, createStore, sample } from 'effector';

import type { FrameResponseDto } from '@/entities/frame';
import { groupModel, type GroupResponseDto } from '@/entities/group';
import { projectModel, type ProjectResponseDto } from '@/entities/project';
import { sectionModel, type SectionResponseDto } from '@/entities/section';
import { versionModel, type VersionResponseDto } from '@/entities/version';
import { groupFramesControllerFindAll } from '@/shared/api/generated/frames/frames';
import { notifyErrorFx } from '@/shared/ui';

export type FramesParams = {
  id: string;
  sectionId: string;
};

export type FrameListItem = FrameResponseDto & {
  versions: VersionResponseDto[];
};

export type GroupListItem = GroupResponseDto & {
  frames: FrameListItem[];
};

export const framesRoute = createRoute<FramesParams>();

export const $project = createStore<ProjectResponseDto | null>(null)
  .on(projectModel.findOneFx.doneData, (_, project) => project)
  .reset(framesRoute.opened, framesRoute.closed);

export const $section = createStore<SectionResponseDto | null>(null)
  .on(sectionModel.findOneFx.doneData, (_, section) => section)
  .reset(framesRoute.opened, framesRoute.closed);

export const $groups = createStore<GroupResponseDto[]>([]).reset(
  framesRoute.opened,
  framesRoute.closed,
);

const loadFramesByGroupIdsFx = createEffect<
  number[],
  Record<number, FrameResponseDto[]>
>(async (groupIds) => {
  const entries = await Promise.all(
    groupIds.map(async (groupId) => {
      try {
        const frames = await groupFramesControllerFindAll(groupId);
        return [groupId, frames] as const;
      } catch {
        return [groupId, []] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
});

export const $framesByGroupId = createStore<Record<number, FrameResponseDto[]>>(
  {},
).reset(framesRoute.opened, framesRoute.closed);

export const $groupList = combine(
  $groups,
  $framesByGroupId,
  versionModel.$versionsByFrameId,
  (groups, framesByGroupId, versionsByFrameId): GroupListItem[] =>
    groups.map((group) => ({
      ...group,
      frames: (framesByGroupId[group.id] ?? []).map((frame) => ({
        ...frame,
        versions: versionsByFrameId[frame.id] ?? [],
      })),
    })),
);

export const $isGroupListLoading = combine(
  groupModel.findAllFx.pending,
  loadFramesByGroupIdsFx.pending,
  versionModel.$isMapLoading,
  (isGroupsLoading, isFramesLoading, isVersionsLoading) =>
    isGroupsLoading || isFramesLoading || isVersionsLoading,
);

const toId = (id: string): number => Number(id);

const isValidId = (id: string): boolean => {
  const value = toId(id);
  return Number.isFinite(value) && value > 0;
};

sample({
  clock: framesRoute.opened,
  filter: ({ params }) => isValidId(params.id),
  fn: ({ params }) => toId(params.id),
  target: projectModel.findOneFx,
});

sample({
  clock: framesRoute.opened,
  filter: ({ params }) => isValidId(params.sectionId),
  fn: ({ params }) => toId(params.sectionId),
  target: sectionModel.findOneFx,
});

sample({
  clock: framesRoute.opened,
  filter: ({ params }) => isValidId(params.sectionId),
  fn: ({ params }) => ({ sectionId: toId(params.sectionId) }),
  target: groupModel.findAllFx,
});

sample({
  clock: groupModel.findAllFx.doneData,
  source: framesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, groups) => groups,
  target: $groups,
});

sample({
  clock: groupModel.findAllFx.doneData,
  source: framesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, groups) => groups.map((group) => group.id),
  target: loadFramesByGroupIdsFx,
});

sample({
  clock: loadFramesByGroupIdsFx.doneData,
  source: framesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, framesByGroupId) => framesByGroupId,
  target: $framesByGroupId,
});

sample({
  clock: loadFramesByGroupIdsFx.doneData,
  source: framesRoute.$isOpened,
  filter: (isOpened) => isOpened,
  fn: (_, framesByGroupId) =>
    Object.values(framesByGroupId)
      .flat()
      .map((frame) => frame.id),
  target: versionModel.versionsByFrameIdsRequested,
});

sample({
  clock: [
    groupModel.findAllFx.failData,
    loadFramesByGroupIdsFx.failData,
    versionModel.findAllByFrameIdsFx.failData,
  ],
  fn: (error) => error.message,
  target: notifyErrorFx,
});
