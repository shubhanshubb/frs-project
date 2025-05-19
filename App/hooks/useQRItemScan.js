import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { API } from '../constant';
import { showToast } from '../services/toastService';
import { makeAPIRequest } from '../services/Utils';

const useQRItemScan = (id) => {
  const [QRData, setQRData] = useState(null);
  const [isScanning, setScanning] = useState(false);

  const queryClient = useQueryClient();

  const onSuccessScan = async (values) => {
    setScanning(true);

    try {
      const QRCodeData = JSON.parse(values?.data);
      const { data, success } = await queryClient.fetchQuery('scan-item', () =>
        makeAPIRequest('get', API.ITEM_DETAILS(QRCodeData?.id))
      );
      if (!success) {
        showToast({
          type: 'error',
          text1: 'Something went wrong. Please try again!!'
        });
      }
      setQRData(data ?? []);
    } catch (e) {
      setQRData([]);
      setScanning(false);
      showToast({
        type: 'error',
        text1: 'Something went wrong. Please try again!!'
      });
    }
    setScanning(false);
  };

  return {
    QRData,
    isScanning,
    onSuccessScan
  };
};

export default useQRItemScan;
