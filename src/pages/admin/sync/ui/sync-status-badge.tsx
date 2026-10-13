import { Badge } from '@chakra-ui/react';
import { CircleAlert, CircleCheck, Clock, type LucideIcon, RefreshCw } from 'lucide-react';

import type { SectionResponseDtoSyncStatus } from '@/entities/section';

interface SyncStatusMeta {
  label: string;
  colorPalette: string;
  icon: LucideIcon;
}

const PENDING_STATUS_META: SyncStatusMeta = {
  label: 'Ожидает',
  colorPalette: 'orange',
  icon: Clock,
};

const SYNC_STATUS_META: Record<NonNullable<SectionResponseDtoSyncStatus>, SyncStatusMeta> = {
  success: { label: 'Успешно', colorPalette: 'green', icon: CircleCheck },
  error: { label: 'Ошибка', colorPalette: 'red', icon: CircleAlert },
  in_progress: { label: 'В процессе', colorPalette: 'blue', icon: RefreshCw },
};

interface SyncStatusBadgeProps {
  status: SectionResponseDtoSyncStatus | undefined;
}

export function SyncStatusBadge({ status }: SyncStatusBadgeProps) {
  const meta = status ? SYNC_STATUS_META[status] : PENDING_STATUS_META;
  const Icon = meta.icon;

  return (
    <Badge
      colorPalette={meta.colorPalette}
      variant="subtle"
      size="md"
      px="2.5"
      py="1"
      gap="1.5"
      borderRadius="md"
      fontWeight="medium"
    >
      <Icon size={14} strokeWidth={2} />
      {meta.label}
    </Badge>
  );
}
