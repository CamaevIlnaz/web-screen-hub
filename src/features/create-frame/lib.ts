import { z } from 'zod';

export const createFrameFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
});

export type CreateFrameFormValues = z.infer<typeof createFrameFormSchema>;

export const CREATE_FRAME_DEFAULT_VALUES: CreateFrameFormValues = {
  name: '',
  description: '',
  figmaId: '',
};
