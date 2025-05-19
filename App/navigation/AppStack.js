import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  Adjust,
  CheckIn,
  CheckOut,
  Pick,
  Put,
  PutWidget,
  Report,
  Reserve
} from '../modules/ActionPages';
import HomeScreen from '../modules/Home/HomeScreen';
import MessageScreen from '../modules/Messages/MessageScreen';
import NotificationScreen from '../modules/Notification/NotificationScreen';
import InventoryReportScreen from '../modules/InventoryReport/InventoryReportScreen';
import { BarcodeScan, LocationResult } from '../modules/Scan';
import {
  LocationDetails,
  SearchInventoryScreen,
  SearchItemDetail,
  SearchRequest,
  SearchResult
} from '../modules/SearchInventory';
import SettingScreen from '../modules/Settings/SettingScreen';
import ReservationsScreen from '../modules/Reservations/ReservationsScreen';

export const PagesWithoutTabs = {
  SearchRequest: {
    component: SearchRequest,
    options: { headerShown: false }
  },
  SearchResult: {
    component: SearchResult,
    options: { headerShown: false }
  },
  SearchItemDetail: {
    component: SearchItemDetail,
    options: { headerShown: false }
  },
  Reserve: {
    component: Reserve,
    options: { headerShown: false }
  },
  Report: {
    component: Report,
    options: { headerShown: false }
  },
  Put: {
    component: Put,
    options: { headerShown: false }
  },
  PutWidget: {
    component: PutWidget,
    options: { headerShown: false }
  },
  Pick: {
    component: Pick,
    options: { headerShown: false }
  },
  CheckIn: {
    component: CheckIn,
    options: { headerShown: false }
  },
  CheckOut: {
    component: CheckOut,
    options: { headerShown: false }
  },
  Adjust: {
    component: Adjust,
    options: { headerShown: false }
  },
  LocationResult: {
    component: LocationResult,
    options: { headerShown: false }
  },
  LocationDetails: {
    component: LocationDetails,
    options: { headerShown: false }
  },
  BarcodeScan: {
    component: BarcodeScan,
    options: { headerShown: false }
  },
  ReservationsScreen: {
    component: ReservationsScreen,
    options: { headerShown: false }
  },
  InventoryReportScreen: {
    component: InventoryReportScreen,
    options: { headerShown: false }
  }
};

const homeScreens = {
  HomeScreen: {
    component: HomeScreen
  },
  SearchInventoryScreen: {
    component: SearchInventoryScreen
  }
};

const HomeScreenStack = createStackNavigator();

export const HomeStack = () => {
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {Object.entries(homeScreens).map(([name, screen]) => (
        <HomeScreenStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </HomeScreenStack.Navigator>
  );
};

const settingScreens = {
  SettingScreen: {
    component: SettingScreen
  }
};

const notificationScreens = {
  NotificationScreen: {
    component: NotificationScreen
  }
};

const SettingScreenStack = createStackNavigator();

export const SettingStack = () => {
  return (
    <SettingScreenStack.Navigator>
      {Object.entries(settingScreens).map(([name, screen]) => (
        <SettingScreenStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </SettingScreenStack.Navigator>
  );
};

const NotificationScreenStack = createStackNavigator();

export const NotificationStack = () => {
  return (
    <NotificationScreenStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {Object.entries(notificationScreens).map(([name, screen]) => (
        <NotificationScreenStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </NotificationScreenStack.Navigator>
  );
};

const messagesScreens = {
  MessageScreen: {
    component: MessageScreen
  }
};

const MessageScreenStack = createStackNavigator();

export const MessageStack = () => {
  return (
    <MessageScreenStack.Navigator>
      {Object.entries(messagesScreens).map(([name, screen]) => (
        <MessageScreenStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={screen?.options ?? {}}
        />
      ))}
    </MessageScreenStack.Navigator>
  );
};
