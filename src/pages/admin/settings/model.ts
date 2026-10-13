import { createRoute } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';

import { chainAdmin } from '@/entities/session';
import { settingModel } from '@/entities/setting';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

export const adminSettingsRoute = createRoute();
export const chainAdminSettingsRoute = chainAdmin(adminSettingsRoute);

export const createFormOpened = createEvent();
export const createFormClosed = createEvent();

export const $isCreateFormOpen = createStore(false)
  .on(createFormOpened, () => true)
  .on(createFormClosed, () => false)
  .reset(settingModel.createFx.done);

sample({
  clock: adminSettingsRoute.opened,
  target: [settingModel.settingsRequested, createFormClosed],
});

sample({
  clock: settingModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

sample({
  clock: settingModel.createFx.done,
  fn: () => 'Настройка добавлена',
  target: notifySuccessFx,
});

sample({
  clock: settingModel.createFx.failData,
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

sample({
  clock: settingModel.removeFx.done,
  fn: () => 'Настройка удалена',
  target: notifySuccessFx,
});

sample({
  clock: settingModel.removeFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});
