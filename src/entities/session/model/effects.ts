import { createEffect } from 'effector';

import {
  authControllerLogin,
  authControllerLogout,
  authControllerMe,
} from '@/shared/api/generated/auth/auth';

import type { LoginDto, UserResponseDto } from './types';

export const meFx = createEffect<void, UserResponseDto>(() => authControllerMe());

export const loginFx = createEffect<LoginDto, UserResponseDto>((dto) =>
  authControllerLogin(dto),
);

export const logoutFx = createEffect<void, void>(() => authControllerLogout());
