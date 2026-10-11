import { z } from 'zod';

import { asNullableString, type ProjectResponseDto } from '@/entities/project';

export const editProjectFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
});

export type EditProjectFormValues = z.infer<typeof editProjectFormSchema>;

export function getEditProjectDefaultValues(
  project: ProjectResponseDto,
): EditProjectFormValues {
  return {
    name: project.name,
    description: asNullableString(project.description) ?? '',
    figmaId: asNullableString(project.figmaId) ?? '',
  };
}
