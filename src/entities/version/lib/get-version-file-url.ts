import { API_BASE_URL } from '@/shared/config';

/** Собирает URL файла версии: /uploads/{filename}. */
export function getVersionFileUrl(filename: string): string {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const normalized = filename.startsWith('/')
    ? filename
    : `/uploads/${filename}`;

  return `${base}${normalized}`;
}
