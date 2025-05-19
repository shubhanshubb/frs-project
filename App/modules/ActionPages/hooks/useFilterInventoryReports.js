import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useRef } from 'react';
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
  category: '',
  warehouse: ''
};

const useFilterInventoryReports = (
  onFilterResult,
  onFilterClear,
  warehouses,
  defaultValues = initialValues
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { params } = useRoute();
  const [isSubmitting, setSubmitting] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState({});
  const formDataRef = useRef(initialValues);

  const { data, isLoading } = useCustomQuery(
    'get',
    'inventory-types',
    API.INVENTORY_TYPES
  );

  const getPayload = (values) => {
    const { inventory, category, warehouse, type } = values;

    let params = [];
    if (warehouse) params.push(`warehouseId=${warehouse}`);
    if (inventory) params.push(`inventoryId=${inventory}`);
    if (category) {
      params.push(`widgetFamilyId=${category}`);
    } else if (type) {
      params.push(`widgetFamilyId=${type}`);
    }
    return params.length ? `&${params.join('&')}` : '';
  };

  const formik = useFormik({
    initialValues: defaultValues ?? initialValues,
    validationSchema: schema(t).inventoryFilter,
    onSubmit: (values) => {
      onSubmitForm(values);
    }
  });

  const onSubmitForm = async (values) => {
    const payload = getPayload(values);
    formDataRef.current = values;
    setSubmitting(true);
    setTimeout(() => {
      onFilterResult(payload, values);
    }, 1000);
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

  const onSelectInventory = async (id, clean = true) => {
    if (clean) {
      setSelectedInventory({});
      setInventoryItems([]);
      setSubCategory([]);
      await formik.setFieldValue('type', '');
      await formik.setFieldValue('category', '');
    }
    const selectedItem = inventoryList?.find((item) => item?.value === id);
    if (selectedItem) {
      setSelectedInventory(selectedItem);
    }
    const response = await queryClient.fetchQuery('inventory-items', () =>
      makeAPIRequest('get', API.INVENTORY_BY_ID + id)
    );
    if (response?.success) {
      setInventoryItems(response?.data ?? []);
    }
  };

  const setSubFamily = async (id) => {
    const response = await queryClient.fetchQuery('inventory-items', () =>
      makeAPIRequest('get', API.INVENTORY_BY_ID + id)
    );
    if (response?.success) {
      setSubCategory(getChild(response?.data, id));
    }
  };

  useEffect(() => {
    if (defaultValues?.inventory) {
      onSelectInventory(defaultValues?.inventory, false);
    }
    if (defaultValues?.type) {
      setSubFamily(defaultValues?.type);
    }
  }, [defaultValues, inventoryList, data]);

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

  const getWarehouseData = useMemo(() => {
    return warehouses?.map((item) => {
      return {
        label: item?.name,
        value: item?._id
      };
    });
  }, [data]);

  return {
    formik,
    params,
    data,
    isLoading,
    inventoryList,
    inventoryItems,
    subCategory,
    selectedInventory,
    isSubmitting,
    warehouseList: getWarehouseData,
    getParent,
    onSelectInventory,
    onSelectParent,
    onPressButton
  };
};

export default useFilterInventoryReports;
