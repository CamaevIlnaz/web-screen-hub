import { createEvent, createStore, sample } from 'effector';

import { loginFx, logoutFx, meFx } from './effects';
import type { AuthStatus, LoginDto, UserResponseDto } from './types';

export const sessionRequested = createEvent();
export const loginFormSubmitted = createEvent<LoginDto>();
export const logoutRequested = createEvent();

export const $user = createStore<UserResponseDto | null>(null)
  .on(meFx.doneData, (_, user) => user)
  .on(loginFx.doneData, (_, user) => user)
  .on(logoutFx.done, () => null)
  .on(meFx.fail, () => null);

export const $isAdmin = $user.map((user) => user?.role === 'admin');

export const $authStatus = createStore<AuthStatus>('pending')
  .on(meFx.done, () => 'authenticated')
  .on(meFx.fail, () => 'anonymous')
  .on(loginFx.done, () => 'authenticated')
  .on(logoutFx.done, () => 'anonymous');

export const $isSubmitting = loginFx.pending;

export const $submitError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error) => error.message)
  .reset(loginFormSubmitted, loginFx.done);

sample({
  clock: sessionRequested,
  target: meFx,
});

sample({
  clock: loginFormSubmitted,
  target: loginFx,
});

sample({
  clock: logoutRequested,
  target: logoutFx,
});

sessionRequested();
