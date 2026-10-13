import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { get } from 'react-hook-form';

import {
  asSettingValue,
  getSettingMeta,
  isUpdatableSettingKey,
  settingModel,
  type SettingResponseDto,
} from '@/entities/setting';
import { useAppForm } from '@/shared/form';

import { settingValueFormSchema } from '../lib';

interface SettingRowProps {
  setting: SettingResponseDto;
}

export function SettingRow({ setting }: SettingRowProps) {
  const [updatingKey, submit] = useUnit([
    settingModel.$updatingKey,
    settingModel.settingUpdateSubmitted,
  ]);

  const meta = getSettingMeta(setting.key);
  const currentValue = asSettingValue(setting.value) ?? '';
  const isEditable = meta.editable;
  const isSubmitting = updatingKey === setting.key;

  const form = useAppForm({
    schema: settingValueFormSchema,
    defaultValues: {
      value: currentValue,
    },
  });

  const { reset, register, handleSubmit, formState } = form;
  const { isDirty, errors } = formState;

  useEffect(() => {
    reset({ value: currentValue });
  }, [currentValue, reset, setting.key]);

  const errorMessage = get(errors, 'value')?.message as string | undefined;
  const showSaveButton = isEditable && isDirty;

  const onSubmit = handleSubmit((values) => {
    if (!isUpdatableSettingKey(setting.key)) {
      return;
    }

    submit({
      key: setting.key,
      dto: { value: values.value.trim() },
    });
  });

  return (
    <Flex
      as="form"
      noValidate
      onSubmit={onSubmit}
      align={{ base: 'stretch', md: 'center' }}
      justify="space-between"
      gap="6"
      direction={{ base: 'column', md: 'row' }}
      px="6"
      py="5"
    >
      <Box minW="0" flex="1">
        <Text fontSize="sm" fontWeight="semibold" color="heading">
          {setting.key}
        </Text>
        <Text mt="1" fontSize="sm" color="muted">
          {meta.description}
        </Text>
      </Box>

      <Flex
        align="flex-start"
        gap="3"
        w={{ base: '100%', md: 'auto' }}
        minW={{ md: '420px' }}
        flexShrink={0}
      >
        <Box flex="1" minW="0">
          <Input
            {...register('value')}
            type="text"
            placeholder="Введите значение"
            disabled={!isEditable || isSubmitting}
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

        {showSaveButton ? (
          <Button
            type="submit"
            bg="primary"
            color="primaryText"
            h="11"
            px="5"
            fontWeight="semibold"
            flexShrink={0}
            loading={isSubmitting}
            _hover={{ bg: 'heading' }}
          >
            Сохранить
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
