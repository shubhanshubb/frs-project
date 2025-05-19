import { Actionsheet } from 'native-base';
import React from 'react';
import BarcodeScanner from './BarcodeScanner';

const ScanModal = ({ isOpen, onOpen, onClose, onSuccess }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <BarcodeScanner from="modal" onSuccess={onSuccess} />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ScanModal;
