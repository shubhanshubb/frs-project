import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PickUpForm from './Forms/PickUpForm';

const CheckInPage = ({ navigation }) => {
  return (
    <PageLayout
      isFooter
      buttons={[
        {
          label: 'Complete Picking',
          bg: 'orange.400'
        }
      ]}
      onPressButton={() => null}
      appLayoutProps={{
        type: 'back',
        title: 'Pick',
        onPressBack: () => navigation.goBack()
      }}>
      <PickUpForm />
    </PageLayout>
  );
};

export default CheckInPage;
