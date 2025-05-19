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
  reportingFor: '',
  details: ''
};

const useReport = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const queryClient = useQueryClient();

  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).reportItem,
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
      details: values?.details,
      reportingFor: values?.reportingFor
    };
    const response = await queryClient.fetchQuery('report-item', () =>
      makeAPIRequest('post', API.REPORT_ITEM(params?.data?._id), payload)
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

export default useReport;
