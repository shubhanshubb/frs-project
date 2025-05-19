import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import _ from 'underscore';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { showToast } from '../../../services/toastService';
import { makeAPIRequest } from '../../../services/Utils';

const useReservations = () => {
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const dataRef = useRef([]);
  const queryClient = useQueryClient();

  const mapHeadsToResponse = (reservations) => {
    return reservations?.map((item) => {
      const attributeText = `${item?.performedOn?.type || 'NIL'} - ${
        item?.performedOn?.size || 'NIL'
      } - ${item?.performedOn?.color || 'NIL'}`;
      return {
        _id: item?._id,
        name: item?.performedOn?.commonName || '-',
        family:
          item?.performedOn?.widgetFamily?.parent?.name ||
          item?.performedOn?.widgetFamily?.name ||
          '-',
        subFamily: item?.performedOn?.widgetFamily?.parent?.name
          ? item?.performedOn?.widgetFamily?.name || '-'
          : '-',
        typeSizeColor: attributeText,
        warehouse: item?.warehouse_id?.name || '-',
        totalQuantity: item?.availableAtWarehouse || '-',
        reservedQuantity: item?.reserveQuantity || '-',
        pickedQuantity: item?.pickedQuantity || '-',
        remainingQuantity: item?.remainingQuantity || '-',
        forJob: item?.job || '-',
        pickupDate: item?.pickupDate
          ? new Date(item?.pickupDate).toLocaleDateString()
          : '-',
        reservationDate: item?.createdAt
          ? new Date(item?.createdAt).toLocaleDateString()
          : '-',
        reservedBy: item?.performedBy?.fullName || '-',
        usageReason: item?.usageReason || '-'
      };
    });
  };

  const {
    data: reservationsList,
    refetch,
    isLoading,
    isError
  } = useCustomQuery('get', 'reservations-list', API.REPORT_RESERVES);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isLoading && !isError) {
      setFullData(mapHeadsToResponse(reservationsList));
      dataRef.current = mapHeadsToResponse(reservationsList) ?? [];
    }
  }, [reservationsList, isLoading, isError]);

  const contains = (
    {
      name,
      family,
      subFamily,
      typeSizeColor,
      warehouse,
      forJob,
      reservedBy,
      usageReason
    },
    query
  ) => {
    const text = query?.toLowerCase();

    if (
      name?.toLowerCase().includes(text) ||
      family?.toLowerCase().includes(text) ||
      subFamily?.toLowerCase().includes(text) ||
      typeSizeColor?.toLowerCase().includes(text) ||
      warehouse?.toLowerCase().includes(text) ||
      forJob?.toLowerCase().includes(text) ||
      reservedBy?.toLowerCase().includes(text) ||
      usageReason?.toLowerCase().includes(text)
    ) {
      return true;
    }

    return false;
  };

  const handleSearch = (text) => {
    if (text?.trim()?.length === 0) {
      setFullData(dataRef.current);
      setQuery(text);
      return true;
    }
    const formattedQuery = text.toLowerCase();
    const filteredData = _.filter(dataRef.current ?? [], (item) => {
      return contains(item, formattedQuery);
    });
    setFullData(filteredData);
    setQuery(text);
  };

  const cancelReservation = async (id, name) => {
    try {
      const response = await queryClient.fetchQuery('cancel-reservation', () =>
        makeAPIRequest('delete', API.CANCEL_RESERVATION(id))
      );
      console.log('response', response);
      if (response?.success) {
        showToast({
          type: 'success',
          text1: `${name} has been cancelled.`
        });
      } else {
        showToast({
          type: 'error',
          text1: 'Something went wrong. Please try again!!'
        });
      }
    } catch {
      showToast({
        type: 'error',
        text1: 'Something went wrong. Please try again!!'
      });
    }
  };

  const onRequestCancel = (item) => {
    Alert.alert(item?.name ?? '', 'Are you sure want to cancel?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => cancelReservation(item?._id, item?.name ?? 'Reservation')
      }
    ]);
  };

  return {
    isError,
    isLoading,
    reservationsList: fullData,
    handleSearch,
    query,
    onRequestCancel
  };
};

export default useReservations;
