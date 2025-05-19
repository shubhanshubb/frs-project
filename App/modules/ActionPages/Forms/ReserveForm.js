import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Box, HStack, Text, theme, VStack } from 'native-base';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import {
  CustomCard,
  CustomTextAreaInput,
  TextInput,
  TitleSubtitleGroup
} from '../../../components';
import ReserveTable from '../../../components/ReserveTable';
import { getFormikError, getFormikValue } from '../../../services/Utils';

const ReserveForm = ({ data, formik }) => {
  const onSelectDate = (e, date) => {
    formik.setFieldValue('pickupDate', date);
    formik.handleBlur('pickupDate');
  };
  const onOpenDate = () => {
    DateTimePickerAndroid.open({ onChange: onSelectDate, value: new Date() });
  };
  const reasonRef = useRef();
  const jobRef = useRef();
  const selectedDate =
    getFormikValue(formik, 'pickupDate') !== ''
      ? moment(getFormikValue(formik, 'pickupDate')).format('DD/MM/YYYY')
      : '';

  return (
    <Box width={'100%'}>
      <CustomCard mb={5}>
        <VStack space={2}>
          <TitleSubtitleGroup
            title="Widget Name"
            subTitle={data?.commonName ?? ''}
          />
          <TitleSubtitleGroup
            title="Size/ Type/ Color"
            subTitle={`${data?.size ?? ''} | ${data?.type ??
              ''} | ${data?.color ?? ''}`}
          />
        </VStack>
      </CustomCard>
      <VStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Quantity to Reserve*"
            returnKey="next"
            keyboardType={'numeric'}
            value={getFormikValue(formik, 'reserveQuantity')}
            isInvalid={getFormikError(formik, 'reserveQuantity')}
            onBlur={formik.handleBlur('reserveQuantity')}
            onChangeText={formik.handleChange('reserveQuantity')}
            onSubmitEditing={() => jobRef.current.focus()}
          />
          <TextInput
            label="Total Available"
            value={data?.availableQuantity?.toString()}
            isDisabled
          />
        </HStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Job #/ Reference*"
            returnKey="next"
            ref={jobRef}
            value={getFormikValue(formik, 'job')}
            isInvalid={getFormikError(formik, 'job')}
            onBlur={formik.handleBlur('job')}
            onChangeText={formik.handleChange('job')}
            onSubmitEditing={() => reasonRef.current.focus()}
          />
          <TextInput
            width={170}
            isInvalid={getFormikError(formik, 'pickupDate')}
            onBlur={formik.handleBlur('pickupDate')}
            label="Pick by Date*"
            value={selectedDate}
            editable={false}
            onPress={onOpenDate}
          />
        </HStack>
      </VStack>
      <CustomTextAreaInput
        label="Reservation reason*"
        numberOfLines={6}
        maxH={200}
        minH={150}
        ref={reasonRef}
        value={getFormikValue(formik, 'usageReason')}
        isInvalid={getFormikError(formik, 'usageReason')}
        onBlur={formik.handleBlur('usageReason')}
        onChangeText={formik.handleChange('usageReason')}
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text>Select Warehouse*</Text>
      <ReserveTable
        data={data?.locations ?? []}
        selection={'single'}
        hasSelection
        selected={getFormikValue(formik, 'warehouseId')}
        onSelection={(value) => {
          formik.setFieldValue('warehouseId', value || '');
        }}
      />
      {getFormikError(formik, 'warehouseId') ? (
        <Text mt={2} color={theme.colors.red[500]}>
          {getFormikError(formik, 'warehouseId')}
        </Text>
      ) : null}
    </Box>
  );
};

export default ReserveForm;
