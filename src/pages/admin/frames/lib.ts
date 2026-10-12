import type { VersionResponseDtoUploadType } from '@/entities/version';

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
export function formatFrameDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export function formatVersionsCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} версия`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} версии`;
  }

  return `${count} версий`;
}

export function formatVersionLabel(version: number): string {
  return `v${version}`;
}

export function formatUploadType(
  uploadType: VersionResponseDtoUploadType,
): string {
  return uploadType === 'automatic'
    ? 'Загружено автоматически'
    : 'Загружено вручную';
}

export function getLatestVersionFilename(
  versions: { version: number; filename: string }[],
): string | null {
  if (versions.length === 0) {
    return null;
  }

  const latest = versions.reduce((best, current) =>
    current.version > best.version ? current : best,
  );

  return latest.filename;
}
