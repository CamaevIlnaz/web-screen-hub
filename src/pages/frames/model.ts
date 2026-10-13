import { createRoute } from 'atomic-router';

export type FramesParams = {
  id: string;
  sectionId: string;
};

export const framesRoute = createRoute<FramesParams>();
