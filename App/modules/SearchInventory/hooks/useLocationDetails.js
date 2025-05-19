import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { useEffect, useState } from 'react';

const useLocationDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [reserveDialogVisible, setReserveDialogVisible] = useState(false);
  const [openReserveList, setOpenReserveList] = useState(false);

  const { data, isLoading, isError, error } = useCustomQuery(
    'get',
    `item-for-transaction`,
    API.ITEM_DETAILS(params?._id)
  );

  const { data: reserves, refetch } = useCustomQuery(
    'get',
    'reserves-by-id',
    API.RESERVES_BY_ID(params?._id, false)
  );

  useEffect(() => {
    refetch();
  }, []);

  const onPressButton = (type) => {
    if (type === 'Pick' || type === 'Put') {
      if (type === 'Pick') {
        setReserveDialogVisible(true);
      } else {
        navigation.navigate('Put', { title: type, data, params });
      }
    } else {
      navigation.navigate(type, { title: type, data, params });
    }
  };

  const handleSelectReserve = (reserve) => {
    setReserveDialogVisible(false);
    setOpenReserveList(false);
    navigation.navigate('Put', {
      title: 'Pick',
      data,
      params,
      reserve: reserve
    });
  };

  const onCloseReserveDialog = (isCloseButton = false) => {
    setReserveDialogVisible(false);
    if (!isCloseButton) {
      navigation.navigate('Put', {
        title: 'Pick',
        data,
        params,
        reserve: null
      });
    }
  };
  /**
   * After the user accept to pick from reserve
   */
  const onAcceptPickFromReserve = () => {
    // TODO: list out all the reserve in modal and select one
    setOpenReserveList(true);
    // onCloseReserveDialog();
  };

  const getData = (values) => {
    return [
      {
        title: 'Formal Name',
        value: values?.formalName ?? ''
      },
      {
        title: 'Description',
        value: values?.description ?? ''
      },
      {
        title: 'Manufacturer',
        value: values?.manufacturer ?? ''
      },
      {
        title: 'Size | Type | Color',
        value: `${values?.size ?? ''} | ${values?.type ?? ''} | ${
          values?.color ?? ''
        }`
      },
      {
        title: 'Unit of Material',
        value: values?.unitOfMaterial ?? ''
      },
      {
        title: 'Unit cost',
        value: values?.unitCost ?? ''
      },
      {
        title: 'Count Per Pallet',
        value: values?.countPerPallet ?? ''
      },
      {
        title: 'Count Per Pallet Package',
        value: values?.countPerPalletPackage ?? ''
      },
      {
        title: 'Package Count',
        value: values?.packageCount ?? ''
      }
    ];
  };

  return {
    onPressButton,
    getData,
    params,
    data: data ?? [],
    isLoading,
    isError,
    error,
    reserveDialogVisible,
    onCloseReserveDialog,
    onAcceptPickFromReserve,
    openReserveList,
    setOpenReserveList,
    reserves,
    handleSelectReserve
  };
};

export default useLocationDetails;
