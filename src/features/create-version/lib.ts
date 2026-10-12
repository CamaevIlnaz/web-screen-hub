import { z } from 'zod';

export const createVersionFormSchema = z.object({
  description: z.string().optional(),
});

export type CreateVersionFormValues = z.infer<typeof createVersionFormSchema>;

export const CREATE_VERSION_DEFAULT_VALUES: CreateVersionFormValues = {
  description: '',
};
