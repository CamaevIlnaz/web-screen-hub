import { createEffect } from 'effector';

import { sectionFigmaSyncControllerSync } from '@/shared/api/generated/figma/figma';
import {
  projectSectionsControllerCreate,
  projectSectionsControllerFindAll,
  sectionsControllerFindOne,
  sectionsControllerRemove,
  sectionsControllerUpdate,
} from '@/shared/api/generated/sections/sections';

import type {
  CreateSectionParams,
  FigmaSyncResultDto,
  FindAllSectionsParams,
  SectionResponseDto,
  UpdateSectionParams,
} from './types';

export const findAllFx = createEffect<FindAllSectionsParams, SectionResponseDto[]>(
  ({ projectId, params }) => projectSectionsControllerFindAll(projectId, params),
);

export const findOneFx = createEffect<number, SectionResponseDto>((id) =>
  sectionsControllerFindOne(id),
);

export const createFx = createEffect<CreateSectionParams, SectionResponseDto>(
  ({ projectId, dto }) => projectSectionsControllerCreate(projectId, dto),
);

export const updateFx = createEffect<UpdateSectionParams, SectionResponseDto>(
  ({ id, dto }) => sectionsControllerUpdate(id, dto),
);

export const removeFx = createEffect<number, number>(async (id) => {
  await sectionsControllerRemove(id);
  return id;
});

export const syncFx = createEffect<number, FigmaSyncResultDto>((id) =>
  sectionFigmaSyncControllerSync(id),
);
