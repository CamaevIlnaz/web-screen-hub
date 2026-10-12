import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import type { GroupResponseDto } from '@/entities/group';
import { FormInput, FormProvider, FormTextarea, useAppForm } from '@/shared/form';

import { editGroupFormSchema, getEditGroupDefaultValues } from '../lib';
import { editGroupModel } from '../model';

function EditGroupForm({ group }: { group: GroupResponseDto }) {
  const [isSubmitting, submit, close] = useUnit([
    editGroupModel.$isSubmitting,
    editGroupModel.formSubmitted,
    editGroupModel.closeRequested,
  ]);

  const form = useAppForm({
    schema: editGroupFormSchema,
    defaultValues: getEditGroupDefaultValues(group),
  });

  const onSubmit = form.handleSubmit((values) => {
    submit({
      id: group.id,
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
        <Dialog.Title>Редактировать группу</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Header>

      <Dialog.Body>
        <FormProvider {...form}>
          <Box as="form" id="edit-group-form" noValidate onSubmit={onSubmit}>
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
          form="edit-group-form"
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

export function EditGroupDialog() {
  const [group, close] = useUnit([
    editGroupModel.$group,
    editGroupModel.closeRequested,
  ]);

  return (
    <Dialog.Root
      open={Boolean(group)}
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
            {group ? <EditGroupForm key={group.id} group={group} /> : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
