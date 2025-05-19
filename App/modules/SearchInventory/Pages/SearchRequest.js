import React from 'react';
import { SelectInput } from '../../../components';
import PageLayout from '../../../layouts/PageLayout';
import { getFormikError, getFormikValue } from '../../../services/Utils';
import useSearchRequest from '../hooks/useSearchRequest';

const SearchRequest = ({ navigation }) => {
  const {
    formik,
    params,
    getParent,
    onSelectParent,
    subCategory,
    data,
    isLoading,
    isError,
    error
  } = useSearchRequest();

  return (
    <PageLayout
      isFooter
      isLoading={isLoading}
      buttons={[
        {
          label: 'Search',
          colorScheme: 'blue',
          variant: 'primary'
        }
      ]}
      onPressButton={() => {
        formik.submitForm();
      }}
      appLayoutProps={{
        type: 'back',
        title: params?.name ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <SelectInput
        label={`Select ${params?.name ?? ''} - Family`}
        data={getParent(data ?? [])}
        value={getFormikValue(formik, 'type')}
        isInvalid={getFormikError(formik, 'type')}
        onSelect={(value, f) => {
          onSelectParent(value);
          formik.setFieldValue('type', value);
          formik.handleBlur('type');
        }}
      />
      {subCategory?.length > 0 && (
        <SelectInput
          label={`Select ${params?.name ?? ''} - Sub family`}
          data={subCategory ?? []}
          value={getFormikValue(formik, 'category')}
          isInvalid={getFormikError(formik, 'category')}
          onSelect={(value) => {
            formik.setFieldValue('category', value);
            formik.handleBlur('category');
          }}
        />
      )}
    </PageLayout>
  );
};

export default SearchRequest;
