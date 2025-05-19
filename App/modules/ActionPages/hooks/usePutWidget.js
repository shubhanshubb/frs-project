import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDisclose } from 'native-base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import useQRItemScan from '../../../hooks/useQRItemScan';
import { makeAPIRequest, manageAPIResponse } from '../../../services/Utils';

const initialValues = {
  putQuantity: '',
  usageReason: '',
  confirmation: '',
  variance: '',
  varianceType: '',
  comment: '',
  item_id: ''
};

const usePutWidget = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const [data, setData] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredResult, setFilteredResult] = useState(null);
  const queryClient = useQueryClient();
  const [isSubmitting, setSubmitting] = useState(false);
  const { QRData, isScanning, onSuccessScan } = useQRItemScan(
    params?.data?._id
  );
  const { isOpen, onOpen, onClose } = useDisclose(false);

  useEffect(() => {
    const inventoryData = getInventory(QRData);
    setData(inventoryData);
  }, [QRData]);

  const getInventory = (qrData) => ({
    available: qrData?.availableQuantity ?? 0,
    total: qrData?.totalQuantity ?? 0
  });

  const type = params?.title ?? '';

  const formik = useFormik({
    initialValues,
    // validationSchema: schema(t).searchRequest,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    setSubmitting(true);
    onSubmit(values);
  };

  const onFilteredResult = (filterData) => {
    if (filterData?.length <= 0) {
      return;
    }
    setFilteredResult(filterData);
  };

  const onBackPressSearchModal = () => {
    setFilteredResult(null);
    setFilteredResult(null);
    formik.resetForm();
    setOpenFilter(false);
  };

  const onClickSearchItem = (item) => {
    onBackPressSearchModal();
    formik.setFieldValue('item_id', item._id);
    onSuccessScan({ data: JSON.stringify({ id: item._id, type: 'Widget' }) });
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    const payload = {
      subLevel: params?.params?.QRCodeData?.id ?? '',
      usageReason: values?.usageReason ?? '',
      putQuantity: parseInt(values?.putQuantity) ?? 0,
      countConfirmation: {
        countType: values?.confirmation ?? '',
        countResult: {
          varianceFound: values?.variance === 'report' ? true : false,
          varianceType: values?.varianceType ?? '',
          varianceComments: values?.comment?.trim() ?? ''
        }
      }
    };

    const response = await queryClient.fetchQuery('put-item', () =>
      makeAPIRequest('post', API.PUT_ITEM(QRData?._id), payload)
    );
    manageAPIResponse(response);
    if (response?.success) {
      setSubmitting(false);
      goBack();
    } else {
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
    openFilter,
    setOpenFilter,
    onBackPressSearchModal,
    onFilteredResult,
    filteredResult,
    onClickSearchItem
  };
};

export default usePutWidget;
