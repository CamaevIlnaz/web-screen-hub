import { createRoute } from 'atomic-router';
import { chainAdmin } from '@/entities/session';

export const adminSettingsRoute = createRoute();
export const chainAdminSettingsRoute = chainAdmin(adminSettingsRoute);
