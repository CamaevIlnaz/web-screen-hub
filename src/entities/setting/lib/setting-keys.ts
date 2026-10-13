export const SETTING_KEYS = {
  FIGMA_LINK: 'figma.link',
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];
