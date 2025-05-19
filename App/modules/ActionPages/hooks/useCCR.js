import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDisclose } from 'native-base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import useQRScan from '../../../hooks/useQRScan';
import { makeAPIRequest, manageAPIResponse } from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const useCCR = (type) => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { isOpen, onOpen, onClose } = useDisclose(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const [data, setData] = useState(null);
  const { QRData, isScanning, onSuccessScan } = useQRScan(params?.data?._id);

  useEffect(() => {
    setData(QRData);
  }, [QRData]);

  const initialValues = {
    subLevel: ''
  };

  if (type === 'checkout') {
    initialValues.job = '';
    initialValues.hasIssue = '';
    initialValues.usageReason = '';
    initialValues.checkOutMeterReading = '';
  } else {
    initialValues.hasIssue = false;
    initialValues.checkInMeterReading = '';
    initialValues.issueDescription = '';
  }

  const callAPI = (payload) => {
    if (type === 'checkout') {
      return queryClient.fetchQuery('check-out-item', () =>
        makeAPIRequest('post', API.CHECK_OUT_ITEM(params?.data?._id), payload)
      );
    } else {
      return queryClient.fetchQuery('check-in-item', () =>
        makeAPIRequest('post', API.CHECK_IN_ITEM(params?.data?._id), payload)
      );
    }
  };

  const onSubmitForm = async (payload) => {
    Keyboard.dismiss();
    setSubmitting(true);
    const data = {
      subLevel: payload?.subLevel ?? '',
      hasIssue: payload?.hasIssue ?? ''
    };

    if (type === 'checkout') {
      data.job = payload?.job ?? '';
      data.usageReason = payload?.usageReason ?? '';
      data.checkOutMeterReading = parseInt(payload?.checkOutMeterReading) ?? '';
      data.checkoutReason = payload?.hasIssue ?? '';
    } else {
      data.checkInMeterReading = parseInt(payload?.checkInMeterReading) ?? '';
      data.issueDescription = payload?.issueDescription ?? '';
    }

    const response = await callAPI(data);
    manageAPIResponse(response);
    if (response?.success) {
      setSubmitting(false);
      goBack();
    } else {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema:
      type === 'checkout' ? schema(t).checkOutItem : schema(t).checkInItem,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  return {
    formik,
    params,
    type,
    data,
    isSubmitting,
    QRData: data,
    isScanning,
    onSuccessScan,
    isOpenScanView: isOpen,
    onOpen,
    onClose
  };
};

export default useCCR;
