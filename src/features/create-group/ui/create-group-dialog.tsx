import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import {
  CREATE_GROUP_DEFAULT_VALUES,
  createGroupFormSchema,
} from '../lib';
import { createGroupModel } from '../model';

function CreateGroupForm() {
  const [isSubmitting, submit, close] = useUnit([
    createGroupModel.$isSubmitting,
    createGroupModel.formSubmitted,
    createGroupModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: createGroupFormSchema,
    defaultValues: CREATE_GROUP_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      figmaId: values.figmaId?.trim() || undefined,
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Добавить группу</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="create-group-form" noValidate onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column" gap="4">
              <FormInput
                name="name"
                label="Название"
                placeholder="Мобильные экраны"
                required
              />
              <FormTextarea
                name="description"
                label="Описание"
                placeholder="Краткое описание группы"
                rows={3}
              />
              <FormInput
                name="figmaId"
                label="Figma ID"
                placeholder="123:456"
              />
            </Box>
          </Box>
        </FormProvider>
      </Dialog.Body>

      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant="outline" onClick={() => close()}>
            Отмена
          </Button>
        </Dialog.ActionTrigger>
        <Button
          type="submit"
          form="create-group-form"
          bg="primary"
          color="primaryText"
          loading={isSubmitting}
          _hover={{ bg: 'heading' }}
        >
          Создать
        </Button>
      </Dialog.Footer>
    </>
  );
}

export function CreateGroupDialog() {
  const [isOpen, close] = useUnit([
    createGroupModel.$isOpen,
    createGroupModel.closeRequested,
  ]);

  return (
    <Dialog.Root
      open={isOpen}
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
            {isOpen ? <CreateGroupForm key="create-group" /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
