import {
  type LucideIcon,
  ChartColumn,
  FileText,
  Settings,
  SquareStack,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import {
  adminNodesRoute,
  adminProjectsRoute,
  adminSectionsRoute,
  adminSettingsRoute,
} from '../../model';

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { route: adminProjectsRoute, label: 'Проекты', icon: ChartColumn },
  { route: adminSectionsRoute, label: 'Страницы', icon: FileText },
  {
    route: adminNodesRoute,
    label: 'Ноды внутри групп',
    icon: SquareStack,
  },
];

export const settingsNavItem: NavItem = {
  route: adminSettingsRoute,
  label: 'Настройки',
  icon: Settings,
};
