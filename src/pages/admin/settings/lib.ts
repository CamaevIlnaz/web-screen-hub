import { z } from 'zod';

export const settingValueFormSchema = z.object({
  value: z.string().min(1, 'Укажите значение'),
});

export type SettingValueFormValues = z.infer<typeof settingValueFormSchema>;
