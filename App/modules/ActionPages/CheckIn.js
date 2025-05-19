import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import CheckInForm from './Forms/CheckInForm';
import useCCR from './hooks/useCCR';

const CheckInPage = ({ navigation }) => {
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
  } = useCCR();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter={QRData !== null}
      isLoading={isScanning}
      buttons={[
        {
          label: 'Complete Check In',
          bg: 'green.400',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('CheckIn')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: 'Check In',
        onPressBack: () => navigation.goBack()
      }}>
      <CheckInForm
        formik={formik}
        onSuccessScan={onSuccessScan}
        data={QRData}
        params={params}
        {...{ isOpenScanView, onOpen, onClose }}
      />
    </PageLayout>
  );
};

export default CheckInPage;
