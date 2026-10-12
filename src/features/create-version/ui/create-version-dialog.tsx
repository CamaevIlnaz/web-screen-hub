import { Box, Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import {
  FormFileUpload,
  FormProvider,
  FormTextarea,
  useAppForm,
} from '@/shared/form';

import {
  CREATE_VERSION_DEFAULT_VALUES,
  createVersionFormSchema,
} from '../lib';
import { createVersionModel } from '../model';

function CreateVersionForm() {
  const [isSubmitting, submit, close] = useUnit([
    createVersionModel.$isSubmitting,
    createVersionModel.formSubmitted,
    createVersionModel.closeRequested,
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const form = useAppForm({
    schema: createVersionFormSchema,
    defaultValues: CREATE_VERSION_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit((values) => {
    if (!file) {
      setFileError('Выберите файл макета');
      return;
    }

    setFileError(null);
    submit({
      file,
      description: values.description?.trim() || undefined,
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Добавить версию</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="create-version-form" noValidate onSubmit={onSubmit}>
            <Box display="flex" flexDirection="column" gap="4">
              <Box>
                <FormFileUpload
                  label="Файл макета"
                  helperText="png, jpg, webp или svg"
                  required
                  onFileChange={(nextFile) => {
                    setFile(nextFile);
                    setFileError(null);
                  }}
                />
                {fileError ? (
                  <Text fontSize="sm" color="danger" mt="1.5">
                    {fileError}
                  </Text>
                ) : null}
              </Box>
              <FormTextarea
                name="description"
                label="Описание"
                placeholder="Краткое описание версии"
                rows={3}
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
          form="create-version-form"
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

export function CreateVersionDialog() {
  const [isOpen, close] = useUnit([
    createVersionModel.$isOpen,
    createVersionModel.closeRequested,
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
            {isOpen ? <CreateVersionForm key="create-version" /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
