import { createRoute } from 'atomic-router';
import { createEffect, createEvent, sample } from 'effector';

import { projectModel } from '@/entities/project';
import { chainAdmin } from '@/entities/session';
import { createProjectModel } from '@/features/create-project';
import { deleteProjectModel } from '@/features/delete-project';
import { editProjectModel } from '@/features/edit-project';
import { notifyErrorFx } from '@/shared/ui';

export const adminProjectsRoute = createRoute();
export const chainAdminProjectsRoute = chainAdmin(adminProjectsRoute);

export const searchInputChanged = createEvent<string>();
export const refreshClicked = createEvent();

const debounceSearchFx = createEffect(async (value: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  return value;
});

sample({
  clock: adminProjectsRoute.opened,
  target: projectModel.projectsRequested,
});

sample({
  clock: searchInputChanged,
  target: [projectModel.searchChanged, debounceSearchFx],
});

sample({
  clock: debounceSearchFx.doneData,
  source: projectModel.$search,
  filter: (search, debounced) => search === debounced,
  target: projectModel.projectsRequested,
});

sample({
  clock: refreshClicked,
  target: projectModel.projectsRequested,
});

sample({
  clock: [
    projectModel.createFx.done,
    projectModel.updateFx.done,
    projectModel.removeFx.done,
  ],
  target: projectModel.projectsRequested,
});

sample({
  clock: projectModel.findAllFx.failData,
  fn: (error) => error.message,
  target: notifyErrorFx,
});

sample({
  clock: createProjectModel.openRequested,
  target: [
    editProjectModel.closeRequested,
    deleteProjectModel.closeRequested,
  ],
});

sample({
  clock: editProjectModel.openRequested,
  target: [
    createProjectModel.closeRequested,
    deleteProjectModel.closeRequested,
  ],
});

sample({
  clock: deleteProjectModel.openRequested,
  target: [
    createProjectModel.closeRequested,
    editProjectModel.closeRequested,
  ],
});
