import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { deleteSectionModel } from '../model';

export function DeleteSectionDialog() {
  const [section, isSubmitting, close, confirm] = useUnit([
    deleteSectionModel.$section,
    deleteSectionModel.$isSubmitting,
    deleteSectionModel.closeRequested,
    deleteSectionModel.confirmed,
  ]);

  return (
    <Dialog.Root
      open={Boolean(section)}
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
              <Dialog.Title>Удалить раздел?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Text fontSize="sm" color="text">
                Раздел «{section?.name}» будет удалён без возможности
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
