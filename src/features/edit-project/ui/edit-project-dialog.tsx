import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import type { ProjectResponseDto } from '@/entities/project';
import {
  FormFileUpload,
  FormInput,
  FormProvider,
  FormTextarea,
  useAppForm,
} from '@/shared/form';

import { editProjectFormSchema, getEditProjectDefaultValues } from '../lib';
import { editProjectModel } from '../model';

function EditProjectForm({ project }: { project: ProjectResponseDto }) {
  const [isSubmitting, submit, close] = useUnit([
    editProjectModel.$isSubmitting,
    editProjectModel.formSubmitted,
    editProjectModel.closeRequested,
  ]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const form = useAppForm({
    schema: editProjectFormSchema,
    defaultValues: getEditProjectDefaultValues(project),
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      id: project.id,
      dto: {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        figmaId: values.figmaId?.trim() || undefined,
        figmaLink: values.figmaLink?.trim() || undefined,
        preview: previewFile ?? undefined,
      },
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Редактировать проект</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="edit-project-form" noValidate onSubmit={onSubmit}>
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
              <FormInput
                name="figmaLink"
                label="Ссылка на Figma"
                placeholder="https://www.figma.com/file/..."
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
          form="edit-project-form"
          bg="primary"
          color="primaryText"
          loading={isSubmitting}
          _hover={{ bg: 'heading' }}
        >
          Сохранить
        </Button>
      </Dialog.Footer>
    </>
  );
}

export function EditProjectDialog() {
  const [project, close] = useUnit([
    editProjectModel.$project,
    editProjectModel.closeRequested,
  ]);

  return (
    <Dialog.Root
      open={Boolean(project)}
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
            {project ? (
              <EditProjectForm key={project.id} project={project} />
            ) : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
