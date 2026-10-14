import { z } from 'zod';

import { asNullableString } from '@/entities/project';
import type { SectionResponseDto } from '@/entities/section';

export const editSectionFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
  figmaId: z.string().optional(),
  figmaLink: z.string().optional(),
});

export type EditSectionFormValues = z.infer<typeof editSectionFormSchema>;

export function getEditSectionDefaultValues(
  section: SectionResponseDto,
): EditSectionFormValues {
  return {
    name: section.name,
    description: asNullableString(section.description) ?? '',
    figmaId: asNullableString(section.figmaId) ?? '',
    figmaLink: asNullableString(section.figmaLink) ?? '',
  };
}
