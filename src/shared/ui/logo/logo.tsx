import { Image } from '@chakra-ui/react';

import logoSrc from '@/shared/assets/logo.png';

interface LogoProps {
  width?: string | number;
  alt?: string;
}

export function Logo({ width = '100px', alt = 'Super Unit Board' }: LogoProps) {
  return (
    <Image
      src={logoSrc}
      alt={alt}
      w={width}
      h="auto"
      display="block"
    />
  );
}
