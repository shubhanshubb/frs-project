import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { API } from '../constant';
import { showToast } from '../services/toastService';
import { makeAPIRequest } from '../services/Utils';

const useQRScan = (id) => {
  const [QRData, setQRData] = useState(null);
  const [isScanning, setScanning] = useState(false);

  const queryClient = useQueryClient();

  const onSuccessScan = async (values) => {
    setScanning(true);
    const QRCodeData = JSON.parse(values?.data);
    //TODO API.SCAN_QR + QRCodeData.type + `&id=${QRCodeData?.id}&itemId=${id}`
    try {
      const { data, success } = await queryClient.fetchQuery('scan-item', () =>
        makeAPIRequest(
          'get',
          API.SCAN_QR + QRCodeData.type + `&id=${QRCodeData?.id}`
        )
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

export default useQRScan;
