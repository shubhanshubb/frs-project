import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { API } from '../../../constant';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { showToast } from '../../../services/toastService';
import { getChild, getParent, makeAPIRequest } from '../../../services/Utils';
import schema from '../../../services/ValidationServices';

const initialValues = {
  inventory: '',
  type: '',
  category: ''
};

const useFilterForm = (onFilterResult, onFilterClear) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { params } = useRoute();
  const [isSubmitting, setSubmitting] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState({});
  const { data } = useCustomQuery(
    'get',
    'inventory-types',
    API.INVENTORY_TYPES
  );
  const getPayload = (values) => {
    const { inventory, category, type } = values;
    let payload = inventory ?? '';
    if (category !== '') {
      payload += '&family=' + category;
    } else if (type !== '') {
      payload += '&family=' + type;
    }
    return payload;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema(t).searchRequest,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = async (values) => {
    const payload = getPayload(values);
    setSubmitting(true);
    const response = await queryClient.fetchQuery('item-lists-filter', () =>
      makeAPIRequest('get', API.FILTER_ITEMS + payload)
    );
    if (response?.success) {
      setSubmitting(false);
      onFilterResult(response?.data?.result ?? [], selectedInventory?.label);
    } else {
      showToast({
        type: 'error',
        text1: 'Something went wrong. Please try again!!'
      });
      setSubmitting(false);
    }
  };
  const getInventoryOptions = useMemo(() => {
    return data?.map((item) => {
      return {
        label: item?.name,
        value: item?._id
      };
    });
  }, [data]);

  useEffect(() => {
    if (data?.length) {
      setInventoryList(getInventoryOptions);
    }
  }, [data, getInventoryOptions]);

  const onSelectParent = (id) => {
    setSubCategory(getChild(inventoryItems, id));
  };

  const onSelectInventory = async (id) => {
    setSelectedInventory({});
    setInventoryItems([]);
    setSubCategory([]);
    await formik.setFieldValue('type', '');
    await formik.setFieldValue('category', '');
    const selectedItem = inventoryList?.find((item) => item?.value === id);
    setSelectedInventory(selectedItem);
    const response = await queryClient.fetchQuery('inventory-items', () =>
      makeAPIRequest('get', API.INVENTORY_BY_ID + id)
    );
    if (response?.success) {
      setInventoryItems(response?.data ?? []);
    }
  };

  const onPressButton = async (type) => {
    if (type === 'Apply') {
      formik.submitForm();
    } else {
      setSelectedInventory({});
      setInventoryItems([]);
      setSubCategory([]);
      formik.resetForm();
      onFilterClear();
    }
  };

  return {
    formik,
    params,
    data,
    inventoryList,
    inventoryItems,
    subCategory,
    selectedInventory,
    isSubmitting,
    getParent,
    onSelectInventory,
    onSelectParent,
    onPressButton
  };
};

export default useFilterForm;
