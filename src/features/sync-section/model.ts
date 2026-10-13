import { sample } from 'effector';

import { sectionModel } from '@/entities/section';
import { notifyErrorFx, notifySuccessFx } from '@/shared/ui';

import { formatSyncResult } from './lib';

sample({
  clock: sectionModel.syncFx.doneData,
  filter: (result) => result.errors.length === 0,
  fn: (result) => ({
    title: 'Синхронизация завершена',
    description: formatSyncResult(result),
  }),
  target: notifySuccessFx,
});

sample({
  clock: sectionModel.syncFx.doneData,
  filter: (result) => result.errors.length > 0,
  fn: (result) => ({
    title: 'Синхронизация завершена с ошибками',
    description: result.errors.join('\n'),
  }),
  target: notifyErrorFx,
});

sample({
  clock: sectionModel.syncFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

export const syncSectionModel = {
  $syncingIds: sectionModel.$syncingIds,
  syncRequested: sectionModel.sectionSyncRequested,
};
