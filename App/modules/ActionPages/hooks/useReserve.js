import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import { makeAPIRequest, manageAPIResponse } from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const initialValues = {
  reserveQuantity: '',
  job: '',
  pickupDate: '',
  usageReason: '',
  warehouseId: ''
};

const useReserve = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const queryClient = useQueryClient();
  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).reverseItem,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    setSubmitting(true);
    onSubmit(values);
  };

  const onSubmit = async (values) => {
    setSubmitting(true);

    const payload = {
      reserveQuantity: parseInt(values?.reserveQuantity),
      job: values?.job,
      pickupDate: values?.pickupDate,
      usageReason: values?.usageReason,
      warehouseId: values?.warehouseId
    };
    const response = await queryClient.fetchQuery('reserve-item', () =>
      makeAPIRequest('post', API.RESERVE_ITEM(params?.data?._id), payload)
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
    data: params?.data,
    isSubmitting
  };
};

export default useReserve;
