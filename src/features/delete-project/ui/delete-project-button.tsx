import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';

import type { ProjectResponseDto } from '@/entities/project';

import { deleteProjectModel } from '../model';

interface DeleteProjectButtonProps {
  project: ProjectResponseDto;
}

export function DeleteProjectButton({ project }: DeleteProjectButtonProps) {
  const open = useUnit(deleteProjectModel.openRequested);

  return (
    <IconButton
      aria-label={`Удалить ${project.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(project)}
      _hover={{ opacity: 0.9 }}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
