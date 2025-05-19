import { ScrollView, Stack } from 'native-base';
import React from 'react';
import { Icons } from '../../assets';
import { TileMenuList } from '../../components';
import AppLayout from '../../layouts/AppLayout';
import useInventoryTypes from './hooks/useInventoryTypes';

const SearchInventoryScreen = ({ navigation }) => {
  const { data, isLoading, isError, error, navigate, t } = useInventoryTypes();

  return (
    <AppLayout
      type="back"
      isLoading={isLoading}
      title={'Search Inventory'}
      onPressBack={() => navigation.goBack()}>
      <ScrollView
        paddingX={5}
        mt={5}
        pb={50}
        contentContainerStyle={{ paddingBottom: 50 }}>
        {data?.length > 0 && (
          <Stack space={5}>
            {data?.map((item) => (
              <TileMenuList
                key={item?._id + Date.now()}
                title={item?.name}
                subTitle={item?.widgetName}
                leftIcon={Icons[item.icon_slug]}
                onPress={() => navigation.navigate('SearchRequest', item)}
              />
            ))}
          </Stack>
        )}
      </ScrollView>
    </AppLayout>
  );
};

export default SearchInventoryScreen;
