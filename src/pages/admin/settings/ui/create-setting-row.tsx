import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Controller, get } from 'react-hook-form';

import { settingModel } from '@/entities/setting';
import { useAppForm } from '@/shared/form';

import { createSettingFormSchema } from '../lib';
import { createFormClosed } from '../model';

export function CreateSettingRow() {
  const [isCreating, submit, close] = useUnit([
    settingModel.$isCreating,
    settingModel.settingCreateSubmitted,
    createFormClosed,
  ]);

  const form = useAppForm({
    schema: createSettingFormSchema,
    defaultValues: {
      key: '',
      value: '',
      publish: false,
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  const keyError = get(errors, 'key')?.message as string | undefined;
  const valueError = get(errors, 'value')?.message as string | undefined;

  const onSubmit = handleSubmit((values) => {
    submit({
      key: values.key.trim(),
      value: values.value.trim(),
      publish: values.publish,
    });
  });

  return (
    <Flex
      as="form"
      noValidate
      onSubmit={onSubmit}
      align={{ base: 'stretch', md: 'flex-start' }}
      gap="4"
      direction={{ base: 'column', md: 'row' }}
      px="6"
      py="5"
    >
      <Box flex="1" minW="0">
        <Input
          {...register('key')}
          type="text"
          placeholder="Ключ"
          disabled={isCreating}
          size="md"
          h="11"
          bg="panel"
          borderColor="border"
          fontSize="sm"
        />
        {keyError ? (
          <Text mt="1.5" fontSize="xs" color="danger">
            {keyError}
          </Text>
        ) : null}
      </Box>

      <Box flex="1.4" minW="0">
        <Input
          {...register('value')}
          type="text"
          placeholder="Значение"
          disabled={isCreating}
          size="md"
          h="11"
          bg="panel"
          borderColor="border"
          fontSize="sm"
        />
        {valueError ? (
          <Text mt="1.5" fontSize="xs" color="danger">
            {valueError}
          </Text>
        ) : null}
      </Box>

      <Flex
        align="center"
        justify="center"
        w={{ base: '100%', md: '110px' }}
        flexShrink={0}
        h="11"
      >
        <Controller
          name="publish"
          control={control}
          render={({ field }) => (
            <Checkbox.Root
              cursor="pointer"
              checked={field.value}
              disabled={isCreating}
              name={field.name}
              onCheckedChange={({ checked }) =>
                field.onChange(checked === true)
              }
              colorPalette="blue"
              size="md"
            >
              <Checkbox.HiddenInput ref={field.ref} onBlur={field.onBlur} />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox.Root>
          )}
        />
      </Flex>

      <Flex
        align="center"
        gap="3"
        w={{ base: '100%', md: '230px' }}
        flexShrink={0}
        justify={{ base: 'flex-start', md: 'flex-end' }}
      >
        <Button
          type="submit"
          bg="primary"
          color="primaryText"
          h="11"
          px="5"
          fontWeight="semibold"
          flexShrink={0}
          loading={isCreating}
          disabled={!isDirty}
          _hover={{ bg: 'heading' }}
        >
          Сохранить
        </Button>

        <Button
          type="button"
          variant="outline"
          borderColor="border"
          color="text"
          h="11"
          px="4"
          fontWeight="medium"
          flexShrink={0}
          disabled={isCreating}
          onClick={() => close()}
        >
          Отмена
        </Button>
      </Flex>
    </Flex>
  );
}
