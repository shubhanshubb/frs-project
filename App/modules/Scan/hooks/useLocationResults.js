import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';

const useLocationResults = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();

  const { data, isLoading, isError, error } = useCustomQuery(
    'get',
    `scanLocation`,
    API.SCAN_QR + params?.QRCodeData.type + `&id=${params?.QRCodeData?.id}`
  );

  const onPressButton = (type, value) => {
    if (type === 'Pick' || type === 'Put') {
      navigation.navigate('Put', {
        title: type,
        data: { ...value, from: 'scan' },
        params: value
      });
    } else {
      navigation.navigate(type, {
        title: type,
        data: { ...value, from: 'scan' },
        params: value
      });
    }
  };

  return {
    onPressButton,
    params,
    data: data?.inventory ?? [],
    location: data?.location ?? {},
    label: data?.label ?? {},
    isLoading,
    isError,
    error
  };
};

export default useLocationResults;
