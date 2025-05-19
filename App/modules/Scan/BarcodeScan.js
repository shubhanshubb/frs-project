import React from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';
import AppLayout from '../../layouts/AppLayout';
import useBarcodeScan from './hooks/useBarcodeScan';

const BarcodeScan = ({ navigation }) => {
  const { onSuccess } = useBarcodeScan();

  return (
    <AppLayout
      px={0}
      mx={0}
      type="back"
      title="Scan"
      onPressBack={() => navigation.goBack()}>
      <BarcodeScanner onSuccess={onSuccess} />
    </AppLayout>
  );
};

export default BarcodeScan;
