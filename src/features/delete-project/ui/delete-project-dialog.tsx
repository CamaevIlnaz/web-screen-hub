import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { deleteProjectModel } from '../model';

export function DeleteProjectDialog() {
  const [project, isSubmitting, close, confirm] = useUnit([
    deleteProjectModel.$project,
    deleteProjectModel.$isSubmitting,
    deleteProjectModel.closeRequested,
    deleteProjectModel.confirmed,
  ]);

  return (
    <Dialog.Root
      open={Boolean(project)}
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
              <Dialog.Title>Удалить проект?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <Text fontSize="sm" color="text">
                Проект «{project?.name}» будет удалён без возможности
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
