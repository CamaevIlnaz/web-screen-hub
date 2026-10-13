const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const;

/** Формат: `17:43 26 августа 2026`. */
export function formatCardDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day} ${month} ${year}`;
}
