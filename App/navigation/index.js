import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuthentication from '../hooks/useAuthentication';
import { theme } from '../theme';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';

const queryClient = new QueryClient();

export default function AppNavigation() {
  const { isAuthenticated } = useAuthentication();
  return (
    <NativeBaseProvider
      theme={theme}
      config={{
        suppressColorAccessibilityWarning: true
      }}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {isAuthenticated && <DrawerStack />}
          {!isAuthenticated && <AuthStack />}
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
