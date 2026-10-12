import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Pencil } from 'lucide-react';

import type { SectionResponseDto } from '@/entities/section';

import { editSectionModel } from '../model';

interface EditSectionButtonProps {
  section: SectionResponseDto;
}

export function EditSectionButton({ section }: EditSectionButtonProps) {
  const open = useUnit(editSectionModel.openRequested);

  return (
    <IconButton
      aria-label={`Редактировать ${section.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(section)}
      _hover={{ bg: 'panelAlt' }}
    >
      <Pencil size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
