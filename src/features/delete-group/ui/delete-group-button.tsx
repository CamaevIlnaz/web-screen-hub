import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';

import type { GroupResponseDto } from '@/entities/group';

import { deleteGroupModel } from '../model';

interface DeleteGroupButtonProps {
  group: GroupResponseDto;
}

export function DeleteGroupButton({ group }: DeleteGroupButtonProps) {
  const open = useUnit(deleteGroupModel.openRequested);

  return (
    <IconButton
      aria-label={`Удалить ${group.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(group)}
      _hover={{ opacity: 0.9 }}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
