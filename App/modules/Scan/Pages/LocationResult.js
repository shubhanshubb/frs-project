import { Stack, VStack } from 'native-base';
import React from 'react';
import {
  BarcodeCard,
  CustomButtonGroup,
  MaterialInfo
} from '../../../components';
import useUserPermissions from '../../../hooks/useUserPermissions';
import PageLayout from '../../../layouts/PageLayout';
import useLocationResults from '../hooks/useLocationResults';

const LocationResult = ({ navigation }) => {
  const { params, data, label, location, onPressButton } = useLocationResults();
  const { checkPermission } = useUserPermissions();

  return (
    <PageLayout
      appLayoutProps={{
        type: 'back',
        title: location?.name ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <Stack>
        <BarcodeCard
          label={label}
          QR={JSON.stringify(params?.QRCodeData ?? {})}
        />
        <CustomButtonGroup
          mt={5}
          onPressButton={() =>
            navigation.navigate('PutWidget', {
              title: 'Put New Widget',
              data: { ...data, location },
              params
            })
          }
          size="lg"
          buttons={[
            {
              label: 'Put New Widget',
              colorScheme: 'blue',
              variant: 'primary',
              isDisabled: !checkPermission('Put')
            }
          ]}
        />
        <VStack space={5} my={5}>
          {data?.map((item) => (
            <MaterialInfo
              key={item?.item_id?._id ?? Math.random() + Date.now()}
              data={{ ...item?.item_id, ...item }}
              type={'PPR'}
              onPressButton={(label) =>
                onPressButton(label, { ...item, ...item?.item_id })
              }
              buttons={[
                {
                  label: 'Pick',
                  bg: 'orange.400',
                  size: 'sm',
                  isDisabled: !checkPermission('Pick')
                },
                {
                  label: 'Put',
                  bg: 'green.400',
                  size: 'sm',
                  isDisabled: !checkPermission('Put')
                },
                {
                  label: 'Adjust',
                  bg: 'blue.500',
                  size: 'sm',
                  isDisabled: !checkPermission('Adjust')
                }
              ]}
            />
          ))}
        </VStack>
      </Stack>
    </PageLayout>
  );
};

export default LocationResult;
