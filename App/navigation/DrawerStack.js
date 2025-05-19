import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import * as React from 'react';
import { CustomDrawer } from '../components';
import { PagesWithoutTabs } from './AppStack';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'TabStack'}
        component={TabStack}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      {Object.entries(PagesWithoutTabs).map(([name, screen]) => (
        <Stack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            ...(screen?.options ?? {})
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

const drawerScreens = {
  Home: {
    component: MainNav,
    options: { headerShown: false }
  }
};

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 }
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      {Object.entries(drawerScreens).map(([name, screen]) => (
        <Drawer.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerStack;
