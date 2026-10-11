import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Pencil } from 'lucide-react';

import type { ProjectResponseDto } from '@/entities/project';

import { editProjectModel } from '../model';

interface EditProjectButtonProps {
  project: ProjectResponseDto;
}

export function EditProjectButton({ project }: EditProjectButtonProps) {
  const open = useUnit(editProjectModel.openRequested);

  return (
    <IconButton
      aria-label={`Редактировать ${project.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(project)}
      _hover={{ bg: 'panelAlt' }}
    >
      <Pencil size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
