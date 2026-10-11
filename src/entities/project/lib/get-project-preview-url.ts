import { API_BASE_URL } from '@/shared/config';

import { asNullableString } from './as-nullable-string';

/** Собирает URL превью: /uploads/{preview}. */
export function getProjectPreviewUrl(preview: unknown): string | null {
  const path = asNullableString(preview);

  if (!path) {
    return null;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/uploads/${path}`;

  return `${base}${normalized}`;
}
