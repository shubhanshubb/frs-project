import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList, Text, theme, View } from 'native-base';
import useReservations from './hooks/useReservations';
import { ReserveItemInfo } from '../../components';
import PageLayout from '../../layouts/PageLayout';

const ReservationsScreen = ({ navigation }) => {
  const {
    isError,
    isLoading,
    reservationsList,
    onRequestCancel,
    handleSearch,
    query
  } = useReservations();

  const renderItem = ({ item }) => (
    <ReserveItemInfo onRequestCancel={onRequestCancel} mb={5} data={item} />
  );

  return (
    <PageLayout
      isLoading={isLoading}
      appLayoutProps={{
        type: 'back',
        isSearchbar: true,
        onChangeSearchText: handleSearch,
        searchText: query,
        title: 'Reservations' ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <View flex={1}>
        {!isLoading && !isError && reservationsList?.length ? (
          <>
            <FlatList
              _contentContainerStyle={{ pb: 100 }}
              data={reservationsList}
              renderItem={renderItem}
              keyExtractor={(item) => item?._id ?? Math.random() + Date.now()}
            />
          </>
        ) : (
          <View justifyContent={'center'} height="100%" alignItems={'center'}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={theme.colors.primary} />
            ) : (
              <Text>No reservation found!!</Text>
            )}
          </View>
        )}
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15
  }
});

export default ReservationsScreen;
