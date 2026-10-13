import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Controller, get } from 'react-hook-form';

import {
  asSettingValue,
  settingModel,
  type SettingResponseDto,
} from '@/entities/setting';
import { useAppForm } from '@/shared/form';

import { settingValueFormSchema } from '../lib';

interface SettingRowProps {
  setting: SettingResponseDto;
}

export function SettingRow({ setting }: SettingRowProps) {
  const [updatingKey, removingKey, submit, remove] = useUnit([
    settingModel.$updatingKey,
    settingModel.$removingKey,
    settingModel.settingUpdateSubmitted,
    settingModel.settingRemoveRequested,
  ]);

  const currentValue = asSettingValue(setting.value) ?? '';
  const currentPublish = Boolean(setting.publish);
  const isSubmitting = updatingKey === setting.key;
  const isRemoving = removingKey === setting.key;

  const form = useAppForm({
    schema: settingValueFormSchema,
    defaultValues: {
      value: currentValue,
      publish: currentPublish,
    },
  });

  const { reset, register, control, handleSubmit, formState } = form;
  const { isDirty, errors } = formState;

  useEffect(() => {
    reset({
      value: currentValue,
      publish: currentPublish,
    });
  }, [currentPublish, currentValue, reset, setting.key]);

  const errorMessage = get(errors, 'value')?.message as string | undefined;

  const onSubmit = handleSubmit((values) => {
    submit({
      key: setting.key,
      dto: {
        value: values.value.trim(),
        publish: values.publish,
      },
    });
  });

  return (
    <Flex
      as="form"
      noValidate
      onSubmit={onSubmit}
      align={{ base: 'stretch', md: 'center' }}
      gap="4"
      direction={{ base: 'column', md: 'row' }}
      px="6"
      py="5"
    >
      <Box flex="1" minW="0">
        <Text fontSize="sm" fontWeight="semibold" color="heading">
          {setting.key}
        </Text>
      </Box>

      <Box flex="1.4" minW="0">
        <Input
          {...register('value')}
          type="text"
          placeholder="Введите значение"
          disabled={isSubmitting || isRemoving}
          size="md"
          h="11"
          bg="panel"
          borderColor="border"
          fontSize="sm"
        />
        {errorMessage ? (
          <Text mt="1.5" fontSize="xs" color="danger">
            {errorMessage}
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
              disabled={isSubmitting || isRemoving}
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
          loading={isSubmitting}
          disabled={!isDirty || isRemoving}
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
          loading={isRemoving}
          disabled={isSubmitting}
          onClick={() => remove(setting.key)}
          _hover={{ color: 'danger', borderColor: 'danger' }}
        >
          Удалить
        </Button>
      </Flex>
    </Flex>
  );
}
