import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import {
  makeAPIRequest,
  manageAPIResponse,
  Numeric
} from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const initialValues = {
  recountedQuantity: '',
  damagedQuantity: '',
  removedDamagedQuantity: ''
};

const useAdjust = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const queryClient = useQueryClient();

  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).adjustItem,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    onSubmit(values);
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    const payload = {
      recountedQuantity: Numeric(values?.recountedQuantity ?? 0),
      damagedQuantity: Numeric(values?.damagedQuantity ?? 0),
      subLevel: params?.data?.sub_level_id,
      removedDamagedQuantity: values?.removedDamagedQuantity
    };
    const response = await queryClient.fetchQuery('adjust-item', () =>
      makeAPIRequest('post', API.ADJUST_ITEM(params?.data?._id), payload)
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

export default useAdjust;
