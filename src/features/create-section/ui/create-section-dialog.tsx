import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import {
  CREATE_SECTION_DEFAULT_VALUES,
  createSectionFormSchema,
} from '../lib';
import { createSectionModel } from '../model';

function CreateSectionForm() {
  const [isSubmitting, submit, close] = useUnit([
    createSectionModel.$isSubmitting,
    createSectionModel.formSubmitted,
    createSectionModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: createSectionFormSchema,
    defaultValues: CREATE_SECTION_DEFAULT_VALUES,
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
        <Dialog.Title>Добавить раздел</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="create-section-form" noValidate onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column" gap="4">
              <FormInput
                name="name"
                label="Название"
                placeholder="Авторизация"
                required
              />
              <FormTextarea
                name="description"
                label="Описание"
                placeholder="Краткое описание раздела"
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
          form="create-section-form"
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

export function CreateSectionDialog() {
  const [isOpen, close] = useUnit([
    createSectionModel.$isOpen,
    createSectionModel.closeRequested,
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
            {isOpen ? <CreateSectionForm key="create-section" /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
