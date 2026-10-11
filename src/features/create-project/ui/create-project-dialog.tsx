import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import {
  FormFileUpload,
  FormInput,
  FormProvider,
  FormTextarea,
  useAppForm,
} from '@/shared/form';

import {
  CREATE_PROJECT_DEFAULT_VALUES,
  createProjectFormSchema,
} from '../lib';
import { createProjectModel } from '../model';

function CreateProjectForm() {
  const [isSubmitting, submit, close] = useUnit([
    createProjectModel.$isSubmitting,
    createProjectModel.formSubmitted,
    createProjectModel.closeRequested,
  ]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const form = useAppForm({
    schema: createProjectFormSchema,
    defaultValues: CREATE_PROJECT_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      figmaId: values.figmaId?.trim() || undefined,
      preview: previewFile ?? undefined,
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Добавить проект</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="create-project-form" noValidate onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column" gap="4">
              <FormInput
                name="name"
                label="Название"
                placeholder="Design System"
                required
              />
              <FormTextarea
                name="description"
                label="Описание"
                placeholder="Краткое описание проекта"
                rows={3}
              />
              <FormInput
                name="figmaId"
                label="Figma ID"
                placeholder="1234567890"
              />
              <FormFileUpload label="Превью" onFileChange={setPreviewFile} />
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
          form="create-project-form"
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

export function CreateProjectDialog() {
  const [isOpen, close] = useUnit([
    createProjectModel.$isOpen,
    createProjectModel.closeRequested,
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
            {isOpen ? <CreateProjectForm key="create-project" /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
