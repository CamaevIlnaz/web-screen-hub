import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Pencil } from 'lucide-react';

import type { FrameResponseDto } from '@/entities/frame';

import { editFrameModel } from '../model';

interface EditFrameButtonProps {
  frame: FrameResponseDto;
}

export function EditFrameButton({ frame }: EditFrameButtonProps) {
  const open = useUnit(editFrameModel.openRequested);

  return (
    <IconButton
      aria-label={`Редактировать ${frame.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="border"
      color="text"
      bg="panel"
      h="10"
      w="10"
      minW="10"
      onClick={() => open(frame)}
      _hover={{ bg: 'panelAlt' }}
    >
      <Pencil size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
