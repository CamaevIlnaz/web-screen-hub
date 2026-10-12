import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import type { FrameResponseDto } from '@/entities/frame';
import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import { editFrameFormSchema, getEditFrameDefaultValues } from '../lib';
import { editFrameModel } from '../model';

function EditFrameForm({ frame }: { frame: FrameResponseDto }) {
  const [isSubmitting, submit, close] = useUnit([
    editFrameModel.$isSubmitting,
    editFrameModel.formSubmitted,
    editFrameModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: editFrameFormSchema,
    defaultValues: getEditFrameDefaultValues(frame),
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      id: frame.id,
      dto: {
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
      },
    });
  });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Редактировать фрейм</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="edit-frame-form" noValidate onSubmit={onSubmit}>
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
          form="edit-frame-form"
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

export function EditFrameDialog() {
  const [frame, close] = useUnit([
    editFrameModel.$frame,
    editFrameModel.closeRequested,
  ]);

  return (
    <Dialog.Root
      open={Boolean(frame)}
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
            {frame ? <EditFrameForm key={frame.id} frame={frame} /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
