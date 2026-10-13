/** Приводит nullable-поле value (в OpenAPI сейчас object) к строке. */
export function asSettingValue(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
