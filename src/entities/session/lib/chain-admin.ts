import {
  chainRoute,
  type RouteInstance,
  type RouteParams,
  type RouteParamsAndQuery,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { sessionModel } from '../model';

export function chainAdmin<Params extends RouteParams>(
  route: RouteInstance<Params>,
) {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAdmin = sample({
    clock: sessionCheckStarted,
    source: {
      status: sessionModel.$authStatus,
      user: sessionModel.$user,
    },
    filter: ({ status, user }) =>
      status === 'authenticated' && user?.role === 'admin',
  });

  const becameAdmin = sample({
    clock: [sessionModel.meFx.doneData, sessionModel.loginFx.doneData],
    filter: (user) => user.role === 'admin',
  });

  const accessDenied = sample({
    clock: sessionCheckStarted,
    source: {
      status: sessionModel.$authStatus,
      user: sessionModel.$user,
    },
    filter: ({ status, user }) =>
      status === 'authenticated' && user?.role !== 'admin',
  });

  const becameNonAdmin = sample({
    clock: [sessionModel.meFx.doneData, sessionModel.loginFx.doneData],
    filter: (user) => user.role !== 'admin',
  });

  const chainedRoute = chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAdmin, becameAdmin],
    cancelOn: [
      accessDenied,
      becameNonAdmin,
      sessionModel.logoutFx.done,
    ],
  });

  // chainRoute внутри использует захардкоженные SID сторов; при 4+ вызовах
  // openOn + $hasSameParams перестаёт открывать chained-роут после логина.
  sample({
    clock: becameAdmin,
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
