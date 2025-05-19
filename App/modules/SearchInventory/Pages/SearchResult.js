import { Text, View, VStack } from 'native-base';
import React from 'react';
import { Icons } from '../../../assets';
import { MaterialInfo, PageModal } from '../../../components';
import PageLayout from '../../../layouts/PageLayout';
import FilterModalForm from '../../ActionPages/Forms/FilterModalForm';
import useSearchResult from '../hooks/useSearchResult';

const SearchResult = ({ navigation }) => {
  const {
    params,
    isLoading,
    data,
    query,
    handleSearch,
    pageTitle,
    isFilterPageVisible,
    toggleFilterPageModal,
    onFilterResult,
    onFilterClear
  } = useSearchResult();
  return (
    <PageLayout
      isLoading={isLoading}
      appLayoutProps={{
        type: 'back',
        isRightIcon: true,
        rightIcon: Icons.filter,
        onPressRightIcon: toggleFilterPageModal,
        isSearchbar: true,
        onChangeSearchText: handleSearch,
        searchText: query,
        title: pageTitle ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <PageModal
        title="Filter"
        visible={isFilterPageVisible}
        onBackPress={toggleFilterPageModal}>
        <FilterModalForm
          onFilterResult={onFilterResult}
          onFilterClear={onFilterClear}
        />
      </PageModal>
      <VStack space={5} pb={50}>
        {data?.map((item) => (
          <MaterialInfo
            key={item?._id ?? Math.random() + Date.now()}
            data={item}
            type={item?.inventory_process}
            onPress={() =>
              navigation.navigate(
                item?.inventory_process === 'PPR'
                  ? 'LocationDetails'
                  : 'SearchItemDetail',
                { ...item, ...params }
              )
            }
          />
        ))}
        {!data?.length ? (
          <View height={'100%'} justifyContent="center" alignItems={'center'}>
            <Text fontSize={15}>
              {isLoading ? 'Loading...' : 'No items found'}
            </Text>
          </View>
        ) : null}
      </VStack>
    </PageLayout>
  );
};

export default SearchResult;
