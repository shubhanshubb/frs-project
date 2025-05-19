import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import PageLayout from '../layouts/PageLayout';

const PageModal = ({ visible, onBackPress, children, title }) => {
  return (
    <Modal
      isVisible={visible}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      onBackButtonPress={onBackPress}
      animationOut="slideOutDown">
      <PageLayout
        appLayoutProps={{
          type: 'back',
          title: title || '',
          onPressBack: onBackPress
        }}>
        <View style={{ flex: 1 }}>{children}</View>
      </PageLayout>
    </Modal>
  );
};

export default PageModal;
