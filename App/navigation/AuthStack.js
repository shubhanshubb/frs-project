import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from '../modules/Authentication/LoginScreen';

const authScreens = {
  LoginScreen: {
    component: LoginScreen,
    options: { headerShown: false }
  }
};

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      {Object.entries(authScreens).map(([name, screen]) => (
        <Stack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
