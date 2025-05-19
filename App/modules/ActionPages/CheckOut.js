import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import CheckOutForm from './Forms/CheckOutForm';
import useCCR from './hooks/useCCR';

const CheckOutPage = ({ navigation }) => {
  const {
    formik,
    params,
    QRData,
    isScanning,
    isOpenScanView,
    onOpen,
    onClose,
    onSuccessScan,
    isSubmitting
  } = useCCR('checkout');
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter={QRData !== null}
      isLoading={isScanning}
      buttons={[
        {
          label: 'Complete Check-Out',
          bg: 'red.400',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('CheckOut')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: 'Check Out',
        onPressBack: () => navigation.goBack()
      }}>
      <CheckOutForm
        formik={formik}
        onSuccessScan={onSuccessScan}
        data={QRData}
        params={params}
        {...{ isOpenScanView, onOpen, onClose }}
      />
    </PageLayout>
  );
};

export default CheckOutPage;
