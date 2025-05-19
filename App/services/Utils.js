import _ from 'underscore';
import { AuthorizedAPI } from '../config';
import ApiServices from './API/ApiServices';
import { showToast } from './toastService';

export const getErrorValue = (data, type) => {
  try {
    return _.omit(data, type);
  } catch {
    return data;
  }
};

export const getFetchingValue = (data, type) => {
  try {
    return _.without(data, type);
  } catch (error) {
    return data;
  }
};

export const getFormikError = (formik, key) => {
  return formik?.touched?.[key] && formik?.errors?.[key];
};

export const getFormikValue = (formik, key) => {
  return formik?.values?.[key] === '' ? '' : formik?.values?.[key];
};

export const manageRequest = ({
  slug = '',
  data = [],
  error = [],
  fetching = []
}) => {
  let isError = false;
  let isLoading = false;
  if (fetching?.includes(slug)) {
    isError = false;
    isLoading = true;
  } else if (error?.[slug]) {
    isError = true;
    isLoading = false;
  }
  return { slug, data, error: isError, loading: isLoading };
};

export const makeAPIRequest = async (type, slug, data, API = AuthorizedAPI) => {
  try {
    const result = await ApiServices[type](API, slug, data);
    return result?.data ?? result;
  } catch (error) {
    return error;
  }
};

export const Numeric = (value) => (value ? parseInt(value) : '');

export const manageAPIResponse = (response) => {
  if (!response?.success) {
    showToast({
      type: 'error',
      text1: 'Something went wrong. Please try again!!'
    });
  } else if (response?.data && response?.success) {
    showToast({
      text1: 'Record has been updated successfully.'
    });
  }
};

export const getParent = (items) => {
  return items?.filter((item) => {
    if (!item?.parent) {
      item.label = item?.name;
      item.value = item?._id;
      return true;
    }
    return false;
  });
};

export const getChild = (items, parent_id) => {
  return items?.filter((item) => {
    if (item?.parent?._id === parent_id) {
      item.label = item?.name;
      item.value = item?._id;
      return true;
    }
    return false;
  });
};

export const getLocationLabel = (label) => {
  if (!label) return '';
  return `${label?.zone ?? ''}-${label?.area ?? ''}-${label?.row ?? ''}-${
    label?.bay ?? ''
  }-${label?.level ?? ''}-${label?.sub_level ?? ''}`;
};

export const getInitialFromName = (name) =>
  name
    .match(/(\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase();
