import { Box, Button, Heading, Stack, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const { width, height } = Dimensions.get('window');

const BarcodeScanner = ({ onSuccess, from }) => {
  return (
    <Box>
      <Stack
        position={'absolute'}
        marginTop={'20%'}
        zIndex={99999}
        justifyContent={'center'}
        alignItems={'center'}
        px={10}>
        <Heading color={'gray.300'} pb={5}>
          Scan the code
        </Heading>
        <Text color={'gray.400'} textAlign={'center'}>
          Line up the code inside the red corners and keep the phone steady!
        </Text>
      </Stack>
      <QRCodeScanner
        fadeIn={false}
        containerStyle={{ height: height }}
        cameraStyle={{ height: height, marginTop: -50 }}
        reactivate={false}
        showMarker={true}
        customMarker={
          <Box
            bg={'rgba(0,0,0,0.4)'}
            flex={1}
            height={height}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              ...StyleSheet.absoluteFillObject
            }}>
            <BarcodeMask
              height={width - 150}
              edgeHeight={30}
              edgeWidth={30}
              width={width - 150}
              edgeColor={'#FF0000'}
              edgeBorderWidth={8}
              animatedLineColor={'#FF0000'}
            />
          </Box>
        }
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      {from !== 'modal' && (
        <Stack
          marginTop={height - 250}
          zIndex={99999}
          justifyContent={'center'}
          alignItems={'center'}>
          <Button
            isLoading
            variant={'unstyled'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}>
            <Text color={'gray.300'} textAlign={'center'} fontSize={18}>
              Scanning
            </Text>
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default BarcodeScanner;
