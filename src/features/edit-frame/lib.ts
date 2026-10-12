import { z } from 'zod';

import type { FrameResponseDto } from '@/entities/frame';
import { asNullableString } from '@/entities/project';

export const editFrameFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  description: z.string().optional(),
});

export type EditFrameFormValues = z.infer<typeof editFrameFormSchema>;

export function getEditFrameDefaultValues(
  frame: FrameResponseDto,
): EditFrameFormValues {
  return {
    name: frame.name,
    description: asNullableString(frame.description) ?? '',
  };
}
