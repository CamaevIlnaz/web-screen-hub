import { Avatar } from '@chakra-ui/react';

import type { UserResponseDto } from '../model';

interface UserAvatarProps {
  user: UserResponseDto | null;
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  const name = user?.name ?? '';
  const initial = name.charAt(0).toUpperCase();

  return (
    <Avatar.Root size={size} bg="avatar" color="primaryText" flexShrink={0}>
      <Avatar.Fallback name={name}>{initial}</Avatar.Fallback>
    </Avatar.Root>
  );
}
