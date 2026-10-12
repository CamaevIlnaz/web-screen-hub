import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { createGroupModel } from '../model';

interface CreateGroupButtonProps {
  sectionId: number;
}

export function CreateGroupButton({ sectionId }: CreateGroupButtonProps) {
  const open = useUnit(createGroupModel.openRequested);

  return (
    <Button
      bg="primary"
      color="primaryText"
      fontWeight="semibold"
      borderRadius="md"
      px="4"
      onClick={() => open(sectionId)}
      _hover={{ bg: 'heading' }}
    >
      <Plus size={18} strokeWidth={2} />
      Добавить группу
    </Button>
  );
}
