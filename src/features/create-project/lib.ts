import { z } from 'zod';

export const createProjectFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
});

export type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

export const CREATE_PROJECT_DEFAULT_VALUES: CreateProjectFormValues = {
  name: '',
  description: '',
  figmaId: '',
};
