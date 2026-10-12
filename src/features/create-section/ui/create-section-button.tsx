import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { createSectionModel } from '../model';

interface CreateSectionButtonProps {
  projectId: number;
}

export function CreateSectionButton({ projectId }: CreateSectionButtonProps) {
  const open = useUnit(createSectionModel.openRequested);

  return (
    <Button
      bg="primary"
      color="primaryText"
      fontWeight="semibold"
      borderRadius="md"
      px="4"
      onClick={() => open(projectId)}
      _hover={{ bg: 'heading' }}
    >
      <Plus size={18} strokeWidth={2} />
      Добавить раздел
    </Button>
  );
}
