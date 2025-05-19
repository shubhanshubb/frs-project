import { Box, HStack, VStack } from 'native-base';
import React from 'react';
import {
  CustomCard,
  CustomRadioButton,
  TextInput,
  TitleSubtitleGroup
} from '../../../components';
import {
  getFormikError,
  getFormikValue,
  Numeric
} from '../../../services/Utils';

const AdjustForm = ({ formik, data }) => {
  const total = Numeric(data?.totalQuantity) ?? 0;
  const recountedQuantity =
    Numeric(getFormikValue(formik, 'recountedQuantity')) ?? 0;
  const damagedQuantity =
    Numeric(getFormikValue(formik, 'damagedQuantity')) ?? 0;
  const variance = Numeric(total) - Numeric(recountedQuantity) ?? 0;
  const totalAdjustment = Numeric(damagedQuantity) + Numeric(variance) ?? 0;
  const newAdjusted = Numeric(total) - Numeric(totalAdjustment) ?? 0;
  return (
    <Box width={'100%'}>
      <VStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Quantity after recount"
            keyboardType={'numeric'}
            value={recountedQuantity?.toString()}
            isInvalid={getFormikError(formik, 'recountedQuantity')}
            onBlur={() => formik.handleBlur('recountedQuantity')}
            onChangeText={formik.handleChange('recountedQuantity')}
          />
          <TextInput
            label="Damage Quantity"
            keyboardType={'numeric'}
            value={damagedQuantity?.toString()}
            isInvalid={getFormikError(formik, 'damagedQuantity')}
            onBlur={() => formik.handleBlur('damagedQuantity')}
            onChangeText={formik.handleChange('damagedQuantity')}
          />
        </HStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Total Available quantity"
            isDisabled
            value={data?.availableQuantity?.toString() ?? 0}
          />
          <TextInput
            label="Total Reserved"
            isDisabled
            value={data?.reservedQuantity?.toString() ?? 0}
          />
        </HStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Last recorded quantity"
            isDisabled
            value={total?.toString()}
          />
          <TextInput
            label="Quantity Variance Observed"
            isDisabled
            value={variance?.toString()}
          />
        </HStack>
        <HStack space={4} alignItems={'flex-end'}>
          <TextInput
            label="Total adjustment"
            isDisabled
            value={totalAdjustment?.toString()}
          />
          <TextInput
            label="New adjusted Quantity here"
            isDisabled
            value={newAdjusted?.toString()}
          />
        </HStack>
      </VStack>

      <CustomRadioButton
        label="Please remove damaged items from here"
        value={getFormikValue(formik, 'removedDamagedQuantity')}
        defaultValue={getFormikValue(formik, 'removedDamagedQuantity')}
        isInvalid={getFormikError(formik, 'removedDamagedQuantity')}
        onChange={(value) => {
          formik.setFieldValue('removedDamagedQuantity', value);
          formik.setTouched('removedDamagedQuantity', true);
          formik.setFieldError('removedDamagedQuantity', '');
        }}
        data={[
          {
            label: 'Yes, removed',
            value: true
          },
          {
            label: 'No, did not remove',
            value: false
          }
        ]}
      />
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
    </Box>
  );
};

export default AdjustForm;
