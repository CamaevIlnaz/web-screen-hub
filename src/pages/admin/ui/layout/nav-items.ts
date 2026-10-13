import {
  type LucideIcon,
  ChartColumn,
  RefreshCw,
  Settings,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import { adminProjectsRoute } from "../../projects/model"
import { adminSettingsRoute } from "../../settings/model"
import { adminSyncRoute } from "../../sync/model"

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { route: adminProjectsRoute, label: 'Проекты', icon: ChartColumn },
  { route: adminSyncRoute, label: 'Синхронизация', icon: RefreshCw },
  { route: adminSettingsRoute, label: 'Настройки', icon: Settings },
];