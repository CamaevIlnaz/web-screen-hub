import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Pencil } from 'lucide-react';

import type { GroupResponseDto } from '@/entities/group';

import { editGroupModel } from '../model';

interface EditGroupButtonProps {
  group: GroupResponseDto;
}

export function EditGroupButton({ group }: EditGroupButtonProps) {
  const open = useUnit(editGroupModel.openRequested);

  return (
    <IconButton
      aria-label={`Редактировать ${group.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(group)}
      _hover={{ bg: 'panelAlt' }}
    >
      <Pencil size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
