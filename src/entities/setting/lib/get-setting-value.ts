import type { SettingResponseDto } from '../model/types';

import { asSettingValue } from './as-setting-value';

export function getSettingValue(
  settings: SettingResponseDto[],
  key: string,
): string | null {
  const setting = settings.find((item) => item.key === key);

  if (!setting) {
    return null;
  }

  return asSettingValue(setting.value);
}
