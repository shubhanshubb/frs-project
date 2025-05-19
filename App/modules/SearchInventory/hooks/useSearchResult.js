import { useRoute } from '@react-navigation/native';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { API } from '../../../constant';
import { showToast } from '../../../services/toastService';
import { makeAPIRequest } from '../../../services/Utils';

const useSearchResult = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [pageTitle, setPageTitle] = useState(params?.data?.title ?? '');
  const dataRef = useRef([]);

  const [isFilterPageVisible, setFilterPageVisible] = useState(false);

  const toggleFilterPageModal = () => {
    setFilterPageVisible(!isFilterPageVisible);
  };

  const { data, isLoading, isError, error } = useQuery('item-lists', () =>
    makeAPIRequest('get', API.FILTER_ITEMS + getPayload())
  );

  useEffect(() => {
    if (isError || (data && !data?.success)) {
      showToast({
        type: 'error',
        text1: 'Something went wrong. Please try again!!'
      });
    }
  }, [isError, data]);

  useEffect(() => {
    setFullData(data?.data?.result ?? []);
    dataRef.current = data?.data?.result ?? [];
  }, [data]);

  const handleSearch = (text) => {
    if (text?.trim()?.length === 0) {
      setFullData(dataRef.current);
      setQuery(text);
      return true;
    }
    const formattedQuery = text?.toLowerCase();
    const filteredData = _.filter(data?.data?.result ?? [], (item) => {
      return contains(item, formattedQuery);
    });
    setFullData(filteredData);
    setQuery(text);
  };

  const contains = (
    { commonName, formalName, manufacturer, type, size, color },
    query
  ) => {
    const text = query?.toLowerCase();
    if (
      commonName?.toLowerCase().includes(text) ||
      formalName?.toLowerCase().includes(text) ||
      type?.toLowerCase().includes(text) ||
      size?.toLowerCase().includes(text) ||
      color?.toLowerCase().includes(text) ||
      manufacturer?.toLowerCase().includes(text)
    ) {
      return true;
    }

    return false;
  };

  const getPayload = () => {
    const {
      data: { inventory, filterValue }
    } = params;
    let payload = inventory?._id ?? '';
    if (filterValue?.category !== '') {
      payload += '&family=' + filterValue.category;
    } else if (filterValue?.type !== '') {
      payload += '&family=' + filterValue.type;
    }
    return payload;
  };

  const onFilterResult = (filterData, title) => {
    toggleFilterPageModal();
    setFullData(filterData);
    setPageTitle(title);
  };

  const onFilterClear = () => {
    toggleFilterPageModal();
    setFullData(dataRef?.current ?? []);
    setPageTitle(params?.data?.title ?? '');
  };

  return {
    params,
    query,
    handleSearch,
    data: fullData ?? [],
    isLoading,
    isError,
    error,
    isFilterPageVisible,
    pageTitle,
    onFilterResult,
    toggleFilterPageModal,
    onFilterClear
  };
};

export default useSearchResult;
