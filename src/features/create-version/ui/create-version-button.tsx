import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { createVersionModel } from '../model';

interface CreateVersionButtonProps {
  frameId: number;
}

export function CreateVersionButton({ frameId }: CreateVersionButtonProps) {
  const open = useUnit(createVersionModel.openRequested);

  return (
    <Button
      variant="outline"
      borderColor="primary"
      color="primary"
      fontWeight="semibold"
      borderRadius="md"
      size="sm"
      px="3"
      bg="panel"
      onClick={() => open(frameId)}
      _hover={{ bg: 'brandSoft' }}
    >
      <Plus size={16} strokeWidth={2} />
      Добавить новую версию
    </Button>
  );
}
