import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Clock, LayoutGrid } from 'lucide-react';

interface CardProps {
  image?: string;
  title: string;
  description?: string;
  date: string;
  onClick?: () => void;
}

export function Card({ image, title, description, date, onClick }: CardProps) {
  return (
    <Box
      as="button"
      type="button"
      display="flex"
      flexDirection="column"
      position="relative"
      zIndex={100}
      overflow="hidden"
      bg="#ffffff0d"
      border="2px dashed"
      borderColor="whiteAlpha.300"
      borderRadius="12px"
      color="rgb(136, 136, 136)"
      textDecoration="none"
      cursor="pointer"
      transition="0.2s"
      w="100%"
      maxW="300px"
      p={0}
      textAlign="left"
      onClick={onClick}
      _hover={{ opacity: 0.92 }}
    >
      {image ? (
        <Box position="relative" p={2} pb={0} w="100%" overflow="hidden">
          <Image
            src={image}
            alt={title}
            w="100%"
            h="180px"
            objectFit="cover"
            display="block"
            borderRadius={6}
          />
        </Box>
      ) : null}

      <Box w="100%" px="4" py="4">
        <Text
          color="whiteAlpha.900"
          fontSize="xl"
          fontWeight="bold"
          lineHeight="1.3"
          mb="2"
        >
          {title}
        </Text>
        <Text fontSize="sm" mb="2" minHeight={45} color="whiteAlpha.700">
          {description}
        </Text>
        <Flex align="center" gap="1.5" color="rgb(136, 136, 136)">
          <Text fontSize="sm">Обновлено: {date}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
