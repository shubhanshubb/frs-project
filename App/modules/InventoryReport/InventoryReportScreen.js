import { FlatList, Text, theme, View } from 'native-base';
import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Icons } from '../../assets';
import { InventoryItem, PageModal } from '../../components';
import AppLayout from '../../layouts/AppLayout';
import FilterInventoryModal from '../ActionPages/Forms/FilterInventoryModal';
import useReservations from './hooks/useInventoryReport';

const RenderFilterCard = ({
  inventoryReportsData,
  totalInventoryCost,
  onLoadMore,
  loadingNextPage,
  initialLoading
}) => {
  const renderItem = ({ item }) => (
    <InventoryItem onRequestCancel={() => null} mb={5} data={item} />
  );

  return (
    <FlatList
      _contentContainerStyle={{ pb: 100, m: 5 }}
      data={inventoryReportsData}
      renderItem={renderItem}
      keyExtractor={(item) => item?.key + Date.now()}
      ListHeaderComponent={() => (
        <View>
          <View bg="blue.400" mb={5} p={3} borderRadius={8}>
            <Text color={'white'} bold fontSize={'md'}>
              Total Inventory Cost: $
              {parseInt(totalInventoryCost).toLocaleString('en-US')}
            </Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => {
        if (loadingNextPage && !initialLoading) {
          return (
            <View justifyContent={'center'} alignItems={'center'} my={5}>
              <ActivityIndicator size={'large'} color={theme.colors.primary} />
            </View>
          );
        } else {
          return null;
        }
      }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.9}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={10} // Reduce initial render amount
      maxToRenderPerBatch={5} // Reduce number in each render batch
      updateCellsBatchingPeriod={100} // Increase time between renders
      windowSize={7} // Reduce the window size
    />
  );
};

const ReservationsScreen = ({ navigation }) => {
  const {
    initialLoading,
    loadingNextPage,
    totalInventoryCost,
    onLoadMore,
    inventoryReportsData,
    handleSearch,
    query,
    isFilterPageVisible,
    onOpenModal,
    onCloseModal,
    onFilterResult,
    onFilterClear,
    warehouses,
    defaultFormValues
  } = useReservations();

  return (
    <AppLayout
      isLoading={initialLoading}
      type="back"
      isRightIcon={!initialLoading}
      rightIcon={Icons.filter}
      onPressRightIcon={onOpenModal}
      // isSearchbar={!initialLoading}
      // onChangeSearchText={handleSearch}
      // searchText={query}
      title={'Inventory Reports' ?? ''}
      onPressBack={() => navigation.goBack()}>
      <PageModal
        title="Filter"
        visible={isFilterPageVisible}
        onBackPress={onCloseModal}>
        <FilterInventoryModal
          defaultFormValues={defaultFormValues}
          warehouses={warehouses}
          onFilterResult={onFilterResult}
          onFilterClear={onFilterClear}
        />
      </PageModal>
      <View flex={1}>
        {!initialLoading && inventoryReportsData?.length > 0 ? (
          <RenderFilterCard
            {...{
              inventoryReportsData,
              onLoadMore,
              loadingNextPage,
              initialLoading,
              totalInventoryCost
            }}
          />
        ) : (
          <View justifyContent={'center'} height="100%" alignItems={'center'}>
            {initialLoading ? (
              <ActivityIndicator size={'large'} color={theme.colors.primary} />
            ) : (
              <Text>No Reports found!!</Text>
            )}
          </View>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15
  }
});

export default ReservationsScreen;
