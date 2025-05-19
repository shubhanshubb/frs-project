import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import AdjustForm from './Forms/AdjustForm';
import useAdjust from './hooks/useAdjust';

const AdjustPage = ({ navigation }) => {
  const { formik, params, data, isSubmitting } = useAdjust();
  const { checkPermission } = useUserPermissions();
  return (
    <PageLayout
      isFooter
      buttons={[
        {
          label: 'Complete Adjustment',
          size: 'md',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('Adjust')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: 'Adjust',
        onPressBack: () => navigation.goBack()
      }}>
      <AdjustForm formik={formik} data={data} />
    </PageLayout>
  );
};

export default AdjustPage;
