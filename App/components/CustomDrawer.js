import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { Center, Stack, Text } from 'native-base';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Images } from '../assets';
import AuthActions from '../redux/AuthRedux';
import CustomButtonGroup from './CustomButtonGroup';

const CustomSidebarMenu = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure want to logout?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: async () => {
          navigation?.closeDrawer();
          await AsyncStorage.clear();
          dispatch(AuthActions.logout());
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image source={Images.logo} style={styles.sideMenuProfileIcon} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Search Inventory"
          onPress={() => navigation?.navigate('SearchInventoryScreen')}
        />
        <DrawerItem
          label="Scan"
          onPress={() => navigation?.navigate('BarcodeScan')}
        />
      </DrawerContentScrollView>
      <Stack px={5} pb={2}>
        <CustomButtonGroup
          onPressButton={onLogout}
          size="lg"
          buttons={[
            {
              label: 'Logout',
              bg: 'red.500'
            }
          ]}
        />
      </Stack>
      <Center>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://www.plaidwaresolutions.com/')}>
          <Text pb={2} color="blue.600">
            Powered by Plaidware
          </Text>
        </TouchableOpacity>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginTop: 10,
    resizeMode: 'contain',
    width: 200,
    height: 100,
    alignSelf: 'center'
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CustomSidebarMenu;
