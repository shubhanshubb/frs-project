import { VStack } from 'native-base';
import React from 'react';
import { MaterialInfo, PageModal } from '../../components';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import FilterModalForm from './Forms/FilterModalForm';
import PutWidgetForm from './Forms/PutWidgetForm';
import usePutWidget from './hooks/usePutWidget';

const PutWidget = ({ navigation }) => {
  const {
    formik,
    params,
    type,
    data,
    isScanning,
    QRData,
    onSuccessScan,
    isOpenScanView,
    onOpen,
    onClose,
    isSubmitting,
    openFilter,
    setOpenFilter,
    onBackPressSearchModal,
    onFilteredResult,
    filteredResult,
    onClickSearchItem
  } = usePutWidget();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter={QRData !== null}
      isLoading={isScanning}
      buttons={[
        {
          label: 'Complete Putting',
          bg: 'green.400',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('Put')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: type ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <PutWidgetForm
        formik={formik}
        type={type}
        onSuccessScan={onSuccessScan}
        data={data}
        params={params}
        onClickSearch={() => setOpenFilter(true)}
        {...{ isOpenScanView, onOpen, onClose }}
      />
      <PageModal
        visible={openFilter}
        title="Search Item"
        onBackPress={onBackPressSearchModal}>
        {filteredResult ? (
          <VStack space={5}>
            {filteredResult.map((widget, index) => (
              <MaterialInfo
                data={widget}
                onPress={() => onClickSearchItem(widget)}
                type={widget?.inventory_process}
              />
            ))}
          </VStack>
        ) : (
          <FilterModalForm onFilterResult={onFilteredResult} hideClearButton />
        )}
      </PageModal>
    </PageLayout>
  );
};

export default PutWidget;
