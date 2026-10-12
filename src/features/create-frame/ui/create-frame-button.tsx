import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { createFrameModel } from '../model';

interface CreateFrameButtonProps {
  groupId: number;
}

export function CreateFrameButton({ groupId }: CreateFrameButtonProps) {
  const open = useUnit(createFrameModel.openRequested);

  return (
    <Button
      variant="outline"
      borderColor="primary"
      color="primary"
      fontWeight="semibold"
      borderRadius="md"
      px="4"
      bg="panel"
      onClick={() => open(groupId)}
      _hover={{ bg: 'brandSoft' }}
    >
      <Plus size={18} strokeWidth={2} />
      Добавить новый фрейм
    </Button>
  );
}
