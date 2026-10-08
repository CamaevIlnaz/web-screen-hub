import type { LoginDto, UserResponseDto } from '@/shared/api/generated/model';

export type { LoginDto, UserResponseDto };

export type AuthStatus = 'pending' | 'anonymous' | 'authenticated';
