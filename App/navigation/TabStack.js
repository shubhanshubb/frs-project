import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { Badge, Icon, Image, VStack } from 'native-base';
import * as React from 'react';
import { Icons } from '../assets';
import { HomeStack, NotificationStack } from './AppStack';
import FeatureIcon from 'react-native-vector-icons/Feather';
import useNotification from '../modules/Notification/hooks/useNotification';

const Tab = createBottomTabNavigator();

export default function TabStack() {
  const { unreadCount } = useNotification();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 70 },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 15 }
      }}>
      <Tab.Screen
        name="HomeStack"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Icons.home}
              size={25}
              style={{ tintColor: color }}
              alt="home"
            />
          )
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="NotificationStack"
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <VStack>
              {unreadCount ? (
                <Badge
                  colorScheme="danger"
                  rounded="full"
                  mb={-4}
                  mr={-4}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  _text={{
                    fontSize: 12
                  }}>
                  {unreadCount}
                </Badge>
              ) : null}
              <Icon size="6" color={color} as={<FeatureIcon name="bell" />} />
            </VStack>
          )
        }}
        component={NotificationStack}
      />
      <Tab.Screen
        name="SettingStack"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.dispatch(DrawerActions.openDrawer());

            e.preventDefault();
          }
        })}
        component={() => <Box></Box>}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Icons.setting}
              size={25}
              style={{ tintColor: color }}
              alt="home"
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
