import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { showToast } from '../services/toastService';
import { makeAPIRequest } from '../services/Utils';

const useCustomQuery = (method, name, slug, payload) => {
  const [isSubmitting, setSubmitting] = useState(true);
  const navigation = useNavigation();

  const { data, isLoading, isError, error, refetch } = useQuery(name, () =>
    makeAPIRequest(method, slug, payload)
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // This check is to prevent error on component mount. The refetch function is defined only after the query is run once
      // It also ensures that refetch runs only when you go back and not on component mount
      if (refetch) {
        // This will re-run the query
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isError || (data && !data?.success)) {
      showToast({
        type: 'error',
        text1: 'Something went wrong. Please try again!!'
      });
    }
  }, [isError, data]);

  useEffect(() => {
    setSubmitting(isLoading);
  }, [isLoading]);

  return {
    data: data?.data ?? [],
    isLoading: isSubmitting,
    isError,
    error,
    refetch
  };
};

export default useCustomQuery;
