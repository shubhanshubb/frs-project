import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDisclose } from 'native-base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import useQRScan from '../../../hooks/useQRScan';
import { showToast } from '../../../services/toastService';
import {
  getFormikValue,
  makeAPIRequest,
  manageAPIResponse
} from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const initialValues = {
  putQuantity: '',
  subLevel: '',
  usageReason: '',
  confirmation: '',
  variance: '',
  varianceType: '',
  comment: ''
};

const usePPR = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const [data, setData] = useState(null);
  const queryClient = useQueryClient();
  const [isSubmitting, setSubmitting] = useState(false);
  const { QRData, isScanning, onSuccessScan } = useQRScan(params?.data?._id);
  const from = params?.data?.from ?? null;
  const { isOpen, onOpen, onClose } = useDisclose(
    from === 'scan' ? false : true
  );
  const reserve = params?.reserve ?? null;
  useEffect(() => {
    setData(getInventory(QRData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QRData]);

  const getInventory = (data) => {
    const inventoryData = data?.inventory ?? [];
    if (inventoryData?.length > 0) {
      const item = inventoryData?.find(
        (item) => item?.item_id?._id === params?.data?._id
      );
      return {
        available: item?.availableQuantity ?? 0,
        total: item?.totalQuantity ?? 0
      };
    }
    return {
      available: 0,
      total: 0
    };
  };

  const type = params?.title ?? '';

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).putItem(
      (reserve
        ? Math.min(reserve?.remainingQuantity, data?.total)
        : data?.available) || 0,
      type === 'Pick'
    ),
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  useEffect(() => {
    if (
      reserve?.remainingQuantity &&
      type === 'Pick' &&
      getFormikValue(formik, 'putQuantity') === '' &&
      data?.total
    ) {
      formik.setFieldValue(
        'putQuantity',
        Math.min(data?.total, reserve?.remainingQuantity).toString()
      );
    }
  }, [reserve, formik, type, data?.total]);

  useEffect(() => {
    if (from === 'scan') {
      formik.setFieldValue('subLevel', params?.data?.sub_level_id);
      formik.handleBlur('subLevel');
      onSuccessScan({
        data: JSON.stringify({
          type: 'Sublevel',
          id: params?.data?.sub_level_id
        })
      });
    }
  }, [from]);

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    setSubmitting(true);
    onSubmit(values);
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    //TODO API.SCAN_QR + QRCodeData.type + `&id=${QRCodeData?.id}&itemId=${id}`
    const payload = {
      subLevel: values?.subLevel ?? '',
      usageReason: values?.usageReason ?? '',
      countConfirmation: {
        countType: values?.confirmation ?? '',
        countResult: {
          varianceFound: values?.variance === 'report' ? true : false,
          varianceType: values?.varianceType ?? '',
          varianceComments: values?.comment?.trim() ?? ''
        }
      }
    };
    if (type === 'Put') {
      payload.putQuantity = parseInt(values?.putQuantity, 10) ?? 0;
    } else {
      if (reserve?._id) {
        payload.reservationId = reserve?._id;
      }
      payload.pickupQuantity = parseInt(values?.putQuantity, 10) ?? 0;
    }
    try {
      const response = await makeAPIRequest(
        'post',
        API[type === 'Put' ? 'PUT_ITEM' : 'PICK_ITEM'](params?.data?._id),
        payload
      );
      manageAPIResponse(response);
      queryClient.resetQueries('reserves-by-id');
      if (response?.success) {
        goBack();
      } else {
        showToast({
          type: 'error',
          text1: 'Error',
          text2: response?.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formik,
    params,
    type,
    data,
    isScanning,
    isSubmitting,
    QRData,
    onSuccessScan,
    isOpenScanView: isOpen,
    onOpen,
    onClose,
    reserve
  };
};

export default usePPR;
