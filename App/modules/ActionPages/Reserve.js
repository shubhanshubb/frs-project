import React from 'react';
import useUserPermissions from '../../hooks/useUserPermissions';
import PageLayout from '../../layouts/PageLayout';
import ReserveForm from './Forms/ReserveForm';
import useReserve from './hooks/useReserve';

const ReservePage = ({ navigation }) => {
  const { formik, params, data, isSubmitting } = useReserve();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      isFooter
      buttons={[
        {
          label: 'Complete Reservation',
          size: 'md',
          isLoading: isSubmitting,
          isDisabled: !checkPermission('Reserve')
        }
      ]}
      onPressButton={formik.submitForm}
      appLayoutProps={{
        type: 'back',
        title: 'Reserve' ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <ReserveForm formik={formik} data={data} />
    </PageLayout>
  );
};

export default ReservePage;
