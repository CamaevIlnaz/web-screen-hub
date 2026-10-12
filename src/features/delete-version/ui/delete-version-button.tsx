import { IconButton } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Trash2 } from 'lucide-react';

import type { VersionResponseDto } from '@/entities/version';

import { deleteVersionModel } from '../model';

interface DeleteVersionButtonProps {
  version: VersionResponseDto;
}

export function DeleteVersionButton({ version }: DeleteVersionButtonProps) {
  const open = useUnit(deleteVersionModel.openRequested);

  return (
    <IconButton
      aria-label={`Удалить версию v${version.version}`}
      variant="ghost"
      size="sm"
      color="danger"
      onClick={() => open(version)}
      _hover={{ bg: 'dangerBg' }}
    >
      <Trash2 size={16} strokeWidth={1.75} />
    </IconButton>
  );
}
