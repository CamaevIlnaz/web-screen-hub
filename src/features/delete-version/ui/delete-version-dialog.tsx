import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { deleteVersionModel } from '../model';

export function DeleteVersionDialog() {
  const [version, isSubmitting, close, confirm] = useUnit([
    deleteVersionModel.$version,
    deleteVersionModel.$isSubmitting,
    deleteVersionModel.closeRequested,
    deleteVersionModel.confirmed,
  ]);

  return (
    <Dialog.Root
      open={Boolean(version)}
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
              <Dialog.Title>Удалить версию?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Text fontSize="sm" color="text">
                Версия «v{version?.version}» будет удалена без возможности
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
