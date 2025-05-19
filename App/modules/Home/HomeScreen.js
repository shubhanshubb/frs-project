import { ScrollView, Stack } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icons } from '../../assets';
import { TileMenuList } from '../../components';
import AppLayout from '../../layouts/AppLayout';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      // dispatch(AuthActions.logout());
    }, 5000);
  }, []);

  return (
    <AppLayout>
      <ScrollView paddingX={5} mt={5}>
        <Stack space={5}>
          <TileMenuList
            title={'Search Inventory'}
            subTitle={'Search All Inventory'}
            leftIcon={Icons.searchInventory}
            onPress={() => navigation.navigate('SearchInventoryScreen')}
          />
          <TileMenuList
            title={'Scan'}
            subTitle={'Scan location/widget'}
            leftIcon={Icons.scanner}
            onPress={() => navigation.navigate('BarcodeScan')}
          />
          <TileMenuList
            title={'Reservations'}
            subTitle={'All Reserved Items'}
            leftIcon={Icons.reservation}
            onPress={() => navigation.navigate('ReservationsScreen')}
          />

          <TileMenuList
            title={'Inventory Report'}
            subTitle={'Get Inventory Report here'}
            leftIcon={Icons.reservation}
            onPress={() => navigation.navigate('InventoryReportScreen')}
          />
        </Stack>
      </ScrollView>
    </AppLayout>
  );
};

export default HomeScreen;
