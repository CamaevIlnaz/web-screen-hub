import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import {
  CREATE_FRAME_DEFAULT_VALUES,
  createFrameFormSchema,
} from '../lib';
import { createFrameModel } from '../model';

function CreateFrameForm() {
  const [isSubmitting, submit, close] = useUnit([
    createFrameModel.$isSubmitting,
    createFrameModel.formSubmitted,
    createFrameModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: createFrameFormSchema,
    defaultValues: CREATE_FRAME_DEFAULT_VALUES,
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
        <Dialog.Title>Добавить фрейм</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="create-frame-form" noValidate onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column" gap="4">
              <FormInput
                name="name"
                label="Название"
                placeholder="Hero Section"
                required
              />
              <FormTextarea
                name="description"
                label="Описание"
                placeholder="Краткое описание фрейма"
                rows={3}
              />
              <FormInput
                name="figmaId"
                label="Figma ID"
                placeholder="12:78"
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
          form="create-frame-form"
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

export function CreateFrameDialog() {
  const [isOpen, close] = useUnit([
    createFrameModel.$isOpen,
    createFrameModel.closeRequested,
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
            {isOpen ? <CreateFrameForm key="create-frame" /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
