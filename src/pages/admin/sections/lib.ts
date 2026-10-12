const MONTHS = [
  'jan.',
  'feb.',
  'mar.',
  'apr.',
  'may',
  'jun.',
  'jul.',
  'aug.',
  'sept.',
  'oct.',
  'nov.',
  'dec.',
] as const;

/** Формат как в макете: `12 oct. 2025, 14:32`. */
export function formatSectionDate(value: string): string {
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

export function formatSectionsCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `Всего ${count} раздел`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `Всего ${count} раздела`;
  }

  return `Всего ${count} разделов`;
}
