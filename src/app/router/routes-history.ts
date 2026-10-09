import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { historyRoutes, notFoundRoute } from '@/pages';

export const router = createHistoryRouter({
  routes: historyRoutes,
  notFoundRoute,
});

router.setHistory(createBrowserHistory());
