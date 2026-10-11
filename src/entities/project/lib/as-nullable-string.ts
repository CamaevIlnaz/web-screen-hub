/** Приводит nullable-поля DTO (в OpenAPI сейчас object) к строке. */
export function asNullableString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
