import { createRoute } from 'atomic-router';
import { chainAdmin } from '@/entities/session';

export const adminProjectsRoute = createRoute();
export const chainAdminProjectsRoute = chainAdmin(adminProjectsRoute);
