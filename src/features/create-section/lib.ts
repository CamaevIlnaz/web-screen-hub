import { z } from 'zod';

export const createSectionFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
  figmaLink: z.string().optional(),
});

export type CreateSectionFormValues = z.infer<typeof createSectionFormSchema>;

export const CREATE_SECTION_DEFAULT_VALUES: CreateSectionFormValues = {
  name: '',
  description: '',
  figmaId: '',
  figmaLink: '',
};
