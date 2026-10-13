import { createRoute, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { projectModel } from '@/entities/project';
import {
  getSettingValue,
  SETTING_KEYS,
  settingModel,
} from '@/entities/setting';

import { sectionsRoute } from '../sections/model';

export const projectsRoute = createRoute();

export const projectOpened = createEvent<number>();

export const $figmaLink = settingModel.$settings.map((settings) =>
  getSettingValue(settings, SETTING_KEYS.FIGMA_LINK),
);

sample({
  clock: projectsRoute.opened,
  target: [projectModel.projectsRequested, settingModel.settingsRequested],
});

redirect({
  clock: projectOpened,
  params: (projectId) => ({ id: String(projectId) }),
  route: sectionsRoute,
});
