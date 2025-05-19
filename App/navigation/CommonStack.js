import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const Stack = createNativeStackNavigator();

const commonScreens = {};

const CommonStack = () => {
  return (
    <Stack.Navigator>
      {Object.entries(commonScreens).map(([name, screen]) => (
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

export default CommonStack;
