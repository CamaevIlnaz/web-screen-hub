import { createRoute } from 'atomic-router';
import { sample } from 'effector';

import { chainAdmin } from '@/entities/session';
import { settingModel } from '@/entities/setting';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const adminSettingsRoute = createRoute();
export const chainAdminSettingsRoute = chainAdmin(adminSettingsRoute);

sample({
  clock: adminSettingsRoute.opened,
  target: settingModel.settingsRequested,
});

sample({
  clock: settingModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

sample({
  clock: settingModel.updateFx.done,
  fn: () => 'Настройка сохранена',
  target: notifySuccessFx,
});

sample({
  clock: settingModel.updateFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});
