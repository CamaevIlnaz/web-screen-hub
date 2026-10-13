import { asNullableString, type ProjectResponseDto } from '@/entities/project';
import type { SectionResponseDto } from '@/entities/section';

export interface SyncProject {
  project: ProjectResponseDto;
  sections: SectionResponseDto[];
}

const MONTHS = [
  'янв.',
  'февр.',
  'мар.',
  'апр.',
  'мая',
  'июн.',
  'июл.',
  'авг.',
  'сент.',
  'окт.',
  'нояб.',
  'дек.',
] as const;

/** Формат как в макете: `12 окт. 2025, 14:32`. */
export function formatSyncDate(value: unknown): string {
  const raw = asNullableString(value);

  if (!raw) {
    return '—';
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

/** `syncError` в OpenAPI описан как object, но фактически приходит строкой или списком строк. */
export function formatSyncError(value: unknown): string | null {
  if (Array.isArray(value)) {
    const messages = value.filter((item): item is string => typeof item === 'string');
    return messages.length > 0 ? messages.join('; ') : null;
  }

  if (value && typeof value === 'object') {
    const message = (value as { message?: unknown }).message;
    return asNullableString(message) ?? JSON.stringify(value);
  }

  return asNullableString(value);
}
