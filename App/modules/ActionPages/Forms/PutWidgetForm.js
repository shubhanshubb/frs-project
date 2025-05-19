import { Box, Button, HStack, Image, VStack } from 'native-base';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import { Icons, Images } from '../../../assets';
import {
  CustomImageSlider,
  CustomRadioButton,
  CustomTextAreaInput,
  SelectInput,
  TextInput
} from '../../../components';
import ScanModal from '../../../components/ScanModal';
import { COUNT_TYPE, VARIANCE_TYPE } from '../../../constant/constants';
import { showToast } from '../../../services/toastService';
import { getFormikError, getFormikValue } from '../../../services/Utils';

const PutWidgetForm = ({
  formik,
  type,
  params,
  onSuccessScan,
  data,
  isOpenScanView,
  onOpen,
  onClose,
  onClickSearch
}) => {
  const reasonRef = useRef();
  return (
    <Box width={'100%'}>
      <ScanModal
        onSuccess={(QRResult) => {
          const QRData = JSON.parse(QRResult?.data);
          if (QRData?.type !== 'Sublevel') {
            formik.setFieldValue('item_id', QRData?.id);
            formik.handleBlur('item_id');
            onSuccessScan(QRResult);
          } else {
            formik.setFieldValue('item_id', '');
            showToast({
              type: 'error',
              text1: 'Invalid QR code!!',
              text2: 'Please scan QR code of Widget.'
            });
          }
          onClose();
        }}
        {...{ isOpen: isOpenScanView, onOpen, onClose }}
      />
      <VStack space={5} justifyContent={'center'} alignItems={'center'}>
        {params?.data?.images?.length > 0 ? (
          <CustomImageSlider data={params?.data?.images ?? []} />
        ) : (
          <Image source={Images.box} size={150} alt="box" />
        )}
        <HStack space={5}>
          <Button
            mb={5}
            colorScheme="blue"
            leftIcon={
              <Image
                tintColor={'#fff'}
                source={Icons.search}
                size={5}
                alt="search"
              />
            }
            width={'45%'}
            size={'lg'}
            onPress={onClickSearch}>
            {'Search Item'}
          </Button>
          <Button
            mb={5}
            colorScheme="blue"
            leftIcon={<Image source={Icons.scanner} size={5} alt="scan" />}
            width={'45%'}
            size={'lg'}
            onPress={onOpen}>
            {'Scan Item'}
          </Button>
        </HStack>
      </VStack>

      {getFormikValue(formik, 'item_id') && (
        <>
          <VStack mt={5}>
            <HStack space={2} alignItems={'flex-end'}>
              <TextInput
                label={'Put Quantity'}
                returnKey="next"
                keyboardType="numeric"
                value={getFormikValue(formik, 'putQuantity')}
                isInvalid={getFormikError(formik, 'putQuantity')}
                onBlur={formik.handleBlur('putQuantity')}
                onChangeText={formik.handleChange('putQuantity')}
                onSubmitEditing={() => reasonRef.current.focus()}
              />
              <TextInput
                label="Available"
                isDisabled
                value={data?.available?.toString()}
              />
              <TextInput
                label="Total Quantity"
                isDisabled
                value={data?.total?.toString()}
              />
            </HStack>
          </VStack>
          <CustomTextAreaInput
            label={'Put Reason/Reference'}
            numberOfLines={4}
            maxH={200}
            ref={reasonRef}
            value={getFormikValue(formik, 'usageReason')}
            isInvalid={getFormikError(formik, 'usageReason')}
            onBlur={formik.handleBlur('usageReason')}
            onChangeText={formik.handleChange('usageReason')}
            onSubmitEditing={Keyboard.dismiss}
          />

          <SelectInput
            label="Would you be kind enough to confirm the remaining
        count here?"
            data={[
              { label: 'Will count exact', value: COUNT_TYPE.EXACT },
              { label: 'Will approximate', value: COUNT_TYPE.APPROX },
              { label: 'Not this time', value: COUNT_TYPE.NONE }
            ]}
            isInvalid={getFormikError(formik, 'confirmation')}
            onSelect={(value) => {
              formik.setFieldValue('confirmation', value);
              formik.setTouched('confirmation', true);
              formik.setFieldValue('variance', '');
              formik.setFieldValue('varianceType', '');
              formik.setFieldValue('comment', '');
              formik.setFieldError('variance', '');
              formik.setFieldError('confirmation', '');
              formik.setFieldError('varianceType', '');
              formik.setFieldError('comment', '');
            }}
          />

          {(getFormikValue(formik, 'confirmation') === COUNT_TYPE.EXACT ||
            getFormikValue(formik, 'confirmation') === COUNT_TYPE.APPROX) && (
            <>
              <CustomRadioButton
                value={getFormikValue(formik, 'variance')}
                defaultValue={getFormikValue(formik, 'variance')}
                isInvalid={getFormikError(formik, 'variance')}
                onChange={(value) => {
                  formik.setFieldValue('variance', value);
                  formik.setFieldError('variance', '');
                  formik.setFieldError('comment', '');
                  formik.setFieldError('varianceType', '');
                  formik.setTouched('variance', true);
                  formik.setFieldValue('varianceType', '');
                  formik.setFieldValue('comment', '');
                }}
                data={[
                  {
                    label: 'Report Variance',
                    value: 'report'
                  },
                  {
                    label: 'Exact OK',
                    value: 'OK'
                  }
                ]}
              />
              {getFormikValue(formik, 'variance') === 'report' && (
                <>
                  <CustomRadioButton
                    label={'Variance Type'}
                    isInvalid={getFormikError(formik, 'varianceType')}
                    value={getFormikValue(formik, 'varianceType')}
                    defaultValue={getFormikValue(formik, 'varianceType')}
                    onChange={(value) => {
                      formik.setFieldValue('varianceType', value);
                      formik.setFieldValue('comment', '');
                      formik.setFieldError('varianceType', '');
                      formik.setFieldError('comment', '');
                      formik.setTouched('varianceType', true);
                    }}
                    data={[
                      {
                        label: 'Short',
                        value: VARIANCE_TYPE.SHORT
                      },
                      {
                        label: 'Over',
                        value: VARIANCE_TYPE.OVER
                      },
                      {
                        label: 'Damage',
                        value: VARIANCE_TYPE.DAMAGE
                      }
                    ]}
                  />
                  {getFormikValue(formik, 'varianceType') !== '' && (
                    <CustomTextAreaInput
                      label="Variance Comments"
                      numberOfLines={4}
                      maxH={200}
                      value={getFormikValue(formik, 'comment')}
                      isInvalid={getFormikError(formik, 'comment')}
                      onBlur={formik.handleBlur('comment')}
                      onChangeText={formik.handleChange('comment')}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default PutWidgetForm;
