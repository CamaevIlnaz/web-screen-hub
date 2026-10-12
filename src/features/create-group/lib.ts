import { z } from 'zod';

export const createGroupFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
});

export type CreateGroupFormValues = z.infer<typeof createGroupFormSchema>;

export const CREATE_GROUP_DEFAULT_VALUES: CreateGroupFormValues = {
  name: '',
  description: '',
  figmaId: '',
};
