import { Box, Spinner } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import type { ReactNode } from 'react';

import { sessionModel } from '../model';

interface AuthProviderProps {
  children: ReactNode;
  loginPage: ReactNode;
  pendingFallback?: ReactNode;
}

export function AuthProvider({
  children,
  loginPage,
  pendingFallback,
}: AuthProviderProps) {
  const authStatus = useUnit(sessionModel.$authStatus);

  if (authStatus === 'pending') {
    return (
      pendingFallback ?? (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="page"
        >
          <Spinner size="lg" color="primary" />
        </Box>
      )
    );
  }

  if (authStatus === 'anonymous') {
    return loginPage;
  }

  return children;
}
