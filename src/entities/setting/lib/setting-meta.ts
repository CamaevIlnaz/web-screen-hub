import type { UpdatableSettingKey } from '../model/types';

export interface SettingMeta {
  description: string;
  editable: boolean;
}

const UPDATABLE_SETTING_KEYS = new Set<string>(['figma.token']);

const SETTING_META: Record<string, Pick<SettingMeta, 'description'>> = {
  'figma.token': {
    description: 'Personal Access Token для API Figma',
  },
};

export function isUpdatableSettingKey(key: string): key is UpdatableSettingKey {
  return UPDATABLE_SETTING_KEYS.has(key);
}

export function getSettingMeta(key: string): SettingMeta {
  return {
    description: SETTING_META[key]?.description ?? 'Системная настройка',
    editable: isUpdatableSettingKey(key),
  };
}
