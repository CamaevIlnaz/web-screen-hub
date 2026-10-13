import { z } from 'zod';

export const settingValueFormSchema = z.object({
  value: z.string().min(1, 'Укажите значение'),
  publish: z.boolean(),
});

export type SettingValueFormValues = z.infer<typeof settingValueFormSchema>;

export const createSettingFormSchema = z.object({
  key: z.string().min(1, 'Укажите ключ'),
  value: z.string().min(1, 'Укажите значение'),
  publish: z.boolean(),
});

export type CreateSettingFormValues = z.infer<typeof createSettingFormSchema>;
