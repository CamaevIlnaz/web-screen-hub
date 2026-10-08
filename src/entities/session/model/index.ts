import { loginFx, logoutFx, meFx } from './effects';
import {
  $authStatus,
  $isAdmin,
  $isSubmitting,
  $submitError,
  $user,
  loginFormSubmitted,
  logoutRequested,
  sessionRequested,
} from './stores';

export const sessionModel = {
  $user,
  $isAdmin,
  $authStatus,
  $isSubmitting,
  $submitError,
  sessionRequested,
  loginFormSubmitted,
  logoutRequested,
  meFx,
  loginFx,
  logoutFx,
};

export type { AuthStatus, LoginDto, UserResponseDto } from './types';
