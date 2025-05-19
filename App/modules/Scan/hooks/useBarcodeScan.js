import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import { makeAPIRequest } from '../../../services/Utils';

const useBarcodeScan = () => {
  const navigation = useNavigation();
  const [isSubmitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = async ({ data }) => {
    console.log('data', data);
    const QRData = JSON.parse(data);
    if (QRData?.type === 'Sublevel') {
      navigation.replace('LocationResult', { QRCodeData: QRData });
    } else {
      const response = await queryClient.fetchQuery(
        'item-for-transaction',
        () => makeAPIRequest('get', API.ITEM_DETAILS(QRData?.id))
      );
      if (response?.success) {
        const type =
          response?.data?.widgetFamily?.inventory?.policies
            ?.inventory_process ?? null;
        if (type === 'PPR' || type === 'CCR') {
          navigation.replace(
            type === 'PPR' ? 'LocationDetails' : 'SearchItemDetail',
            {
              data: {
                ...response?.data,
                title: response?.data?.widgetFamily?.inventory?.name,
                from: 'scan'
              },
              ...response?.data
            }
          );
        }
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  };

  return { onSuccess, isSubmitting };
};

export default useBarcodeScan;
