import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { deleteFrameModel } from '../model';

export function DeleteFrameDialog() {
  const [frame, isSubmitting, close, confirm] = useUnit([
    deleteFrameModel.$frame,
    deleteFrameModel.$isSubmitting,
    deleteFrameModel.closeRequested,
    deleteFrameModel.confirmed,
  ]);

  return (
    <Dialog.Root
      open={Boolean(frame)}
      role="alertdialog"
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
              <Dialog.Title>Удалить фрейм?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Text fontSize="sm" color="text">
                Фрейм «{frame?.name}» будет удалён без возможности
                восстановления.
              </Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => close()}>
                  Отмена
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg="danger"
                color="primaryText"
                loading={isSubmitting}
                onClick={() => confirm()}
                _hover={{ opacity: 0.9 }}
              >
                Удалить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
