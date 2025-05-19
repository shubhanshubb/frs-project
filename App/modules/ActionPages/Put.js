import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import PutForm from './Forms/PutForm';
import usePPR from './hooks/usePPR';

const PutPage = ({ navigation }) => {
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
    reserve
  } = usePPR();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter={QRData !== null}
      isLoading={isScanning}
      buttons={[
        {
          label: type === 'Put' ? 'Complete Put-In' : 'Complete Pick-Up',
          bg: type === 'Put' ? 'green.400' : 'orange.400',
          isLoading: isSubmitting,
          isDisabled: !checkPermission(type === 'Put' ? 'Put' : 'Pick')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: type ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <PutForm
        formik={formik}
        type={type}
        onSuccessScan={onSuccessScan}
        data={data}
        params={params}
        reserve={reserve}
        QRData={QRData}
        {...{ isOpenScanView, onOpen, onClose }}
      />
    </PageLayout>
  );
};

export default PutPage;
