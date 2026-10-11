import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { createProjectModel } from '../model';

export function CreateProjectButton() {
  const open = useUnit(createProjectModel.openRequested);

  return (
    <Button
      bg="primary"
      color="primaryText"
      fontWeight="semibold"
      borderRadius="md"
      px="4"
      onClick={() => open()}
      _hover={{ bg: 'heading' }}
    >
      <Plus size={18} strokeWidth={2} />
      Добавить проект
    </Button>
  );
}
