import { z } from 'zod';

import { asNullableString } from '@/entities/project';
import type { GroupResponseDto } from '@/entities/group';

export const editGroupFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
});

export type EditGroupFormValues = z.infer<typeof editGroupFormSchema>;

export function getEditGroupDefaultValues(
  group: GroupResponseDto,
): EditGroupFormValues {
  return {
    name: group.name,
    description: asNullableString(group.description) ?? '',
    figmaId: asNullableString(group.figmaId) ?? '',
  };
}
