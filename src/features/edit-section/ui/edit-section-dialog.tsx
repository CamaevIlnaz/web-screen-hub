import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import type { SectionResponseDto } from '@/entities/section';
import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import { editSectionFormSchema, getEditSectionDefaultValues } from '../lib';
import { editSectionModel } from '../model';

function EditSectionForm({ section }: { section: SectionResponseDto }) {
  const [isSubmitting, submit, close] = useUnit([
    editSectionModel.$isSubmitting,
    editSectionModel.formSubmitted,
    editSectionModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: editSectionFormSchema,
    defaultValues: getEditSectionDefaultValues(section),
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      id: section.id,
      dto: {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        figmaId: values.figmaId?.trim() || undefined,
      },
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Редактировать раздел</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="edit-section-form" noValidate onSubmit={onSubmit}>
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
          form="edit-section-form"
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

export function EditSectionDialog() {
  const [section, close] = useUnit([
    editSectionModel.$section,
    editSectionModel.closeRequested,
  ]);

  return (
    <Dialog.Root
      open={Boolean(section)}
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
            {section ? (
              <EditSectionForm key={section.id} section={section} />
            ) : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
