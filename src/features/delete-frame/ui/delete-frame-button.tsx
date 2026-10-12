import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';

import type { FrameResponseDto } from '@/entities/frame';

import { deleteFrameModel } from '../model';

interface DeleteFrameButtonProps {
  frame: FrameResponseDto;
}

export function DeleteFrameButton({ frame }: DeleteFrameButtonProps) {
  const open = useUnit(deleteFrameModel.openRequested);

  return (
    <IconButton
      aria-label={`Удалить ${frame.name}`}
      variant="outline"
      borderRadius="md"
      borderColor="danger"
      color="danger"
      bg="dangerBg"
      h="10"
      w="10"
      minW="10"
      onClick={() => open(frame)}
      _hover={{ opacity: 0.9 }}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
