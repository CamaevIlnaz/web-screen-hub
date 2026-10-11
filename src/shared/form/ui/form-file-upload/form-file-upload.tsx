import { Box, Button, FileUpload } from '@chakra-ui/react';
import { Upload } from 'lucide-react';

import { FormField } from '../form-field';

const PREVIEW_ACCEPT = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
] as const;

export interface FormFileUploadProps {
  label: string;
  helperText?: string;
  required?: boolean;
  accept?: string[];
  onFileChange: (file: File | null) => void;
}

export function FormFileUpload({
  label,
  helperText,
  required,
  accept = [...PREVIEW_ACCEPT],
  onFileChange,
}: FormFileUploadProps) {
  return (
    <FormField label={label} helperText={helperText} required={required}>
      <Box mt="1.5" w="100%">
        <FileUpload.Root
          maxFiles={1}
          accept={accept}
          onFileChange={(details) => {
            onFileChange(details.acceptedFiles[0] ?? null);
          }}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button
              variant="outline"
              borderColor="border"
              color="text"
              fontWeight="medium"
            >
              <Upload size={16} strokeWidth={1.75} />
              Выбрать файл
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List clearable showSize mt="3" />
        </FileUpload.Root>
      </Box>
    </FormField>
  );
}
