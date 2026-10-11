import {
  type LucideIcon,
  ChartColumn,
  Settings,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import { adminProjectsRoute } from "../../projects/model"
import { adminSettingsRoute } from "../../settings/model"

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { route: adminProjectsRoute, label: 'Проекты', icon: ChartColumn },
  { route: adminSettingsRoute, label: 'Настройки', icon: Settings },
];