import moment from 'moment';
import { Box, Button, HStack, Image, Text, theme, VStack } from 'native-base';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import { Icons, Images } from '../../../assets';
import {
  BarcodeCard,
  CustomImageSlider,
  CustomRadioButton,
  CustomTextAreaInput,
  SelectInput,
  TextInput,
  TitleSubtitleGroup
} from '../../../components';
import ScanModal from '../../../components/ScanModal';
import { COUNT_TYPE, VARIANCE_TYPE } from '../../../constant/constants';
import { showToast } from '../../../services/toastService';
import { getFormikError, getFormikValue } from '../../../services/Utils';

const PutForm = ({
  formik,
  type,
  params,
  onSuccessScan,
  data,
  QRData,
  isOpenScanView,
  onOpen,
  onClose,
  reserve = null
}) => {
  const reasonRef = useRef();
  const scanResult = getFormikValue(formik, 'QRData');

  const getWarehouseLocationsMessage = (reserve) => {
    const locations = params?.data?.locations || [];
    const warehouseLocations = locations.filter(
      (location) => location?.warehouse?._id === reserve?.warehouse_id?._id
    );
    return `${
      locations[0]?.warehouse?.name
    }, Location: ${warehouseLocations
      .map((location) => location.label)
      .join(',')}`;
  };

  return (
    <Box width={'100%'}>
      <ScanModal
        onSuccess={(QRResult) => {
          const QRData = JSON.parse(QRResult?.data);
          if (QRData?.type === 'Sublevel') {
            if (
              type === 'Pick' &&
              reserve &&
              reserve?.warehouse_id?._id !== QRData?.warehouseId &&
              params?.data?.locations.filter(
                (location) => location?._id === QRData?.id
              ).length >= 1
            ) {
              showToast({
                type: 'error',
                text1: 'Invalid QR Code',
                text2: `Available at ${getWarehouseLocationsMessage(reserve)}`
              });
              onClose();
              return;
            }
            formik.setFieldValue('subLevel', QRData?.id);
            formik.setFieldValue('QRData', QRResult?.data);
            formik.handleBlur('subLevel');
            onSuccessScan(QRResult);
          } else {
            formik.setFieldValue('subLevel', '');
            showToast({
              type: 'error',
              text1: 'Invalid QR code!!',
              text2: 'Please scan QR code of location.'
            });
          }
          onClose();
        }}
        {...{ isOpen: isOpenScanView, onOpen, onClose }}
      />
      <VStack space={5} justifyContent={'center'} alignItems={'center'}>
        {scanResult ? (
          <BarcodeCard label={QRData?.label} QR={scanResult ?? ''} />
        ) : (
          <>
            {params?.data?.images?.length > 0 ? (
              <CustomImageSlider data={params?.data?.images ?? []} />
            ) : (
              <Image source={Images.box} size={150} alt="box" />
            )}
          </>
        )}
        {params?.data?.from !== 'scan' && (
          <Button
            mb={5}
            colorScheme="blue"
            leftIcon={<Image source={Icons.scanner} size={5} alt="scan" />}
            width={'100%'}
            size={'lg'}
            onPress={onOpen}>
            {scanResult ? 'Re-Scan Location' : 'Scan Location'}
          </Button>
        )}
      </VStack>
      {getFormikValue(formik, 'subLevel') && (
        <>
          <VStack mt={5}>
            {reserve ? (
              <VStack
                space={2}
                borderColor={theme.colors.coolGray}
                borderWidth={0.7}
                borderRadius={10}
                padding={5}
                mb={7}>
                <Text fontSize={16} fontWeight="medium">
                  Picking from Reservation
                </Text>
                <VStack space={2}>
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Job"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve.job}
                  />
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Reserved By"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve.performedBy?.fullName || '---'}
                  />
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Reserved until"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={
                      moment(reserve?.pickupDate).format('DD/MM/YYYY') || '---'
                    }
                  />

                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Reserve quantity"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve?.reserveQuantity || '---'}
                  />
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Picked quantity"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve?.pickedQuantity || '---'}
                  />
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Remaining quantity"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve?.remainingQuantity || '---'}
                  />
                  <TitleSubtitleGroup
                    direction={'row'}
                    title="Warehouse"
                    justifyContent="space-between"
                    alignItems="center"
                    subTitle={reserve?.warehouse_id?.name || '---'}
                  />
                </VStack>
              </VStack>
            ) : null}
            <HStack space={2} alignItems={'flex-start'}>
              <TextInput
                label={`${type} Quantity`}
                keyboardType="numeric"
                returnKey="next"
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
            label={`${type} Reason/Reference`}
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
            selectedValue={getFormikValue(formik, 'confirmation')}
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

export default PutForm;
