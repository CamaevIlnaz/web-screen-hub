import { RouterProvider } from 'atomic-router-react';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '@/entities/session';
import { LoginPage } from '@/pages/login';
import { Toaster } from '@/shared/ui';

import { RoutesView, router } from './router';
import { system } from './styles/chakra-system';

export function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider loginPage={<LoginPage />}>
        <RouterProvider router={router}>
          <RoutesView />
        </RouterProvider>
      </AuthProvider>
      <Toaster />
    </ChakraProvider>
  );
}
