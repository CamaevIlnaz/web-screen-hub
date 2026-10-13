import type { FigmaSyncResultDto } from '@/entities/section';

export function formatSyncResult(result: FigmaSyncResultDto): string {
  if (result.skipped) {
    return 'Файл в Figma не менялся, синхронизация пропущена';
  }

  return [
    `Групп создано: ${result.groupsCreated}`,
    `фреймов: ${result.framesCreated}`,
    `версий: ${result.versionsCreated}`,
    `без изменений: ${result.unchanged}`,
  ].join(', ');
}
