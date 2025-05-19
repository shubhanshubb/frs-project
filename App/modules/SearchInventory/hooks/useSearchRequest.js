import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { getChild, getParent } from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const initialValues = {
  type: '',
  category: ''
};

const useSearchRequest = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();

  const [subCategory, setSubCategory] = useState(null);

  const [isSubmitting, setSubmitting] = useState(false);

  const { data, isLoading, isError, error } = useCustomQuery(
    'get',
    'inventory-items',
    API.INVENTORY_BY_ID + params?._id
  );

  const onSelectParent = (id) => {
    setSubCategory(getChild(data, id));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).searchRequest,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = (values) => {
    Keyboard.dismiss();
    setSubmitting(true);
    navigate('SearchResult', {
      data: { title: params?.name, inventory: params, filterValue: values }
    });
  };

  return {
    formik,
    params,
    getParent,
    onSelectParent,
    subCategory,
    data: data ?? [],
    isLoading,
    isError,
    error
  };
};

export default useSearchRequest;
