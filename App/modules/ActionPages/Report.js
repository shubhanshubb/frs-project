import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import ReportForm from './Forms/ReportForm';
import useReport from './hooks/useReport';

const ReportPage = ({ navigation }) => {
  const { formik, params, data, isSubmitting } = useReport();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter
      buttons={[
        {
          label: 'Report',
          size: 'md',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('ReportIncident')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: 'Report',
        onPressBack: () => navigation.goBack()
      }}>
      <ReportForm formik={formik} data={data} />
    </PageLayout>
  );
};

export default ReportPage;
