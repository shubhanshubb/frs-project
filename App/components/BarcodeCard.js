import { Center, HStack, Stack, Text, VStack } from 'native-base';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import CustomCard from './CustomCard';

const TextView = ({ title, subtitle }) => {
  return (
    <VStack justifyContent={'center'} alignItems={'center'}>
      <Text fontSize={12}>{title ?? ''}</Text>
      <Text fontWeight={'900'} fontSize={25}>
        {subtitle ?? ''}
      </Text>
    </VStack>
  );
};

const BarcodeCard = ({ label, QR }) => {
  console.log('QR', QR);
  if (!QR || label === null || label === undefined) return null;
  const QRValue = QR ?? '';
  return (
    <CustomCard>
      <Center>
        <QRCode size={150} value={QRValue} />
        <Stack justifyContent={'center'} alignItems={'center'} mt={5}>
          <HStack space={1}>
            <TextView title={'ZONE'} subtitle={label?.zone ?? ''} />
            <TextView subtitle={'-'} />
            <TextView title={'AREA'} subtitle={label?.area ?? ''} />
            <TextView subtitle={'-'} />
            <TextView title={'RACK'} subtitle={label?.row ?? ''} />
            <TextView subtitle={'-'} />
            <TextView title={'LOCATION'} subtitle={label?.bay ?? ''} />
            <TextView subtitle={'-'} />
            <TextView title={'LEVEL'} subtitle={label?.level ?? ''} />
            <TextView subtitle={'-'} />
            <TextView title={'POS'} subtitle={label?.sub_level ?? ''} />
          </HStack>
        </Stack>
      </Center>
    </CustomCard>
  );
};

export default BarcodeCard;
