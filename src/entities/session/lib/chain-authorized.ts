import {
  chainRoute,
  type RouteInstance,
  type RouteParams,
  type RouteParamsAndQuery,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { sessionModel } from '../model';

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: sessionModel.$authStatus,
    filter: (status) => status === 'authenticated',
  });

  const becameAuthorized = sample({
    clock: [sessionModel.meFx.doneData, sessionModel.loginFx.doneData],
  });

  const chainedRoute = chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, becameAuthorized],
    cancelOn: [sessionModel.logoutFx.done],
  });

  sample({
    clock: becameAuthorized,
    source: {
      isParentOpened: route.$isOpened,
      isChainedOpened: chainedRoute.$isOpened,
      params: route.$params,
      query: route.$query,
    },
    filter: ({ isParentOpened, isChainedOpened }) =>
      isParentOpened && !isChainedOpened,
    fn: ({ params, query }) => ({ params, query }),
    target: chainedRoute.opened,
  });

  return chainedRoute;
}
