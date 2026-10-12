import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';

import type { SectionResponseDto } from '@/entities/section';

import { deleteSectionModel } from '../model';

interface DeleteSectionButtonProps {
  section: SectionResponseDto;
}

export function DeleteSectionButton({ section }: DeleteSectionButtonProps) {
  const open = useUnit(deleteSectionModel.openRequested);

  return (
    <IconButton
      aria-label={`Удалить ${section.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="12"
      w="12"
      minW="12"
      onClick={() => open(section)}
      _hover={{ opacity: 0.9 }}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
