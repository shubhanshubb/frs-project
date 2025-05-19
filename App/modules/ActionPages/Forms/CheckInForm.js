import { Box, Center, Image } from 'native-base';
import React, { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Icons } from '../../../assets';
import {
  CustomRadioButton,
  CustomTextAreaInput,
  TextInput
} from '../../../components';
import ScanModal from '../../../components/ScanModal';
import { showToast } from '../../../services/toastService';
import {
  getFormikError,
  getFormikValue,
  getLocationLabel
} from '../../../services/Utils';

const CheckInForm = ({
  formik,
  isOpenScanView,
  data,
  onOpen,
  onClose,
  onSuccessScan
}) => {
  const [isValidLocation, setIsValidLocation] = useState(true);
  return (
    <Box width={'100%'}>
      <ScanModal
        onSuccess={(QRResult) => {
          const QRValue = JSON.parse(QRResult?.data);
          if (QRValue?.id && QRValue?.type === 'Sublevel') {
            formik.setFieldValue('subLevel', QRValue?.id);
            formik.handleBlur('subLevel');
            onSuccessScan(QRResult);
          } else {
            formik.setFieldValue('subLevel', '');
            showToast({
              type: 'error',
              text1: 'Invalid QR code!!',
              text2: 'Please scan QR code of location.'
            });
            setIsValidLocation(false);
          }
          onClose();
        }}
        {...{ isOpen: isOpenScanView, onOpen, onClose }}
      />
      <TextInput
        label="Scan Location Address"
        isInvalid={
          isValidLocation ? '' : 'Invalid location address. Scan again!!'
        }
        editable={false}
        onPress={onOpen}
        rightElement={
          <Center mr={3}>
            <TouchableOpacity activeOpacity={0.7} onPress={onOpen}>
              <Image
                source={Icons.scan}
                size={7}
                alt="scan"
                tintColor="black"
              />
            </TouchableOpacity>
          </Center>
        }
        returnKey="next"
        value={getLocationLabel(data?.label ?? null)}
      />

      {getFormikValue(formik, 'subLevel') && (
        <>
          <TextInput
            label="Check-in meter reading"
            returnKey="next"
            keyboardType={'numeric'}
            value={getFormikValue(formik, 'checkInMeterReading')}
            isInvalid={getFormikError(formik, 'checkInMeterReading')}
            onBlur={formik.handleBlur('checkInMeterReading')}
            onChangeText={formik.handleChange('checkInMeterReading')}
          />
          <CustomRadioButton
            label="Any Issue to Report?"
            value={getFormikValue(formik, 'hasIssue')}
            defaultValue={getFormikValue(formik, 'hasIssue')}
            isInvalid={getFormikError(formik, 'hasIssue')}
            onChange={(value) => {
              formik.setFieldValue('hasIssue', value);
              formik.setTouched('hasIssue', true);
              formik.setFieldValue('issueDescription', '');
            }}
            data={[
              {
                label: 'Yes',
                value: true
              },
              {
                label: 'No',
                value: false
              }
            ]}
          />
          {getFormikValue(formik, 'hasIssue') && (
            <CustomTextAreaInput
              label="Issue details"
              numberOfLines={6}
              maxH={200}
              minH={150}
              value={getFormikValue(formik, 'issueDescription')}
              isInvalid={getFormikError(formik, 'issueDescription')}
              onBlur={formik.handleBlur('issueDescription')}
              onChangeText={formik.handleChange('issueDescription')}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default CheckInForm;
