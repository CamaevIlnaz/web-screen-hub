import { CloseButton, Dialog, Image, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { $previewUrl, versionPreviewClosed } from '../model';

export function VersionPreviewDialog() {
  const [previewUrl, close] = useUnit([$previewUrl, versionPreviewClosed]);

  return (
    <Dialog.Root
      open={Boolean(previewUrl)}
      size="xl"
      onOpenChange={(details) => {
        if (!details.open) {
          close();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Превью версии</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body pb="6">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Превью версии"
                  maxH="70vh"
                  w="100%"
                  objectFit="contain"
                  borderRadius="md"
                />
              ) : null}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
