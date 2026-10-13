import { Button } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Play } from 'lucide-react';

import type { SectionResponseDto } from '@/entities/section';

import { syncSectionModel } from '../model';

interface SyncSectionButtonProps {
  section: SectionResponseDto;
}

export function SyncSectionButton({ section }: SyncSectionButtonProps) {
  const [syncingIds, sync] = useUnit([
    syncSectionModel.$syncingIds,
    syncSectionModel.syncRequested,
  ]);

  return (
    <Button
      variant="outline"
      size="sm"
      borderRadius="md"
      borderColor="primary"
      color="primary"
      bg="panel"
      fontWeight="semibold"
      loading={syncingIds.includes(section.id)}
      onClick={() => sync(section.id)}
      _hover={{ bg: 'brandSoft' }}
    >
      <Play size={14} strokeWidth={2} />
      Запустить вручную
    </Button>
  );
}
