import { HStack, Image, Stack, VStack, Text } from 'native-base';
import React from 'react';
import { Images } from '../../../assets';
import {
  CustomCard,
  CustomImageSlider,
  LocationTable,
  PageModal,
  TitleSubtitleGroup
} from '../../../components';
import CustomAlertDialog from '../../../components/CustomAlertDialog';
import ReserveInfo from '../../../components/ReserveInfo';
import useUserPermissions from '../../../hooks/useUserPermissions';
import PageLayout from '../../../layouts/PageLayout';
import useLocationDetails from '../hooks/useLocationDetails';

const LocationDetails = ({ navigation }) => {
  const {
    params,
    data,
    isLoading,
    getData,
    onPressButton,
    reserveDialogVisible,
    onCloseReserveDialog,
    onAcceptPickFromReserve,
    openReserveList,
    setOpenReserveList,
    reserves,
    handleSelectReserve
  } = useLocationDetails();
  const { checkPermission } = useUserPermissions();
  console.log(JSON.stringify(reserves));
  return (
    <PageLayout
      // scrollViewProps={{ paddingX: 0, mt: 3 }}
      isFooter
      isLoading={isLoading}
      onPressButton={onPressButton}
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
          label: 'Reserve',
          bg: 'blue.500',
          size: 'sm',
          isDisabled: !checkPermission('Reserve')
        }
      ]}
      appLayoutProps={{
        type: 'back',
        title: params?.data?.title ?? '',
        onPressBack: () => navigation.goBack()
      }}>
      <Stack>
        <VStack justifyContent={'center'} alignItems={'center'}>
          {data?.images?.length > 0 ? (
            <CustomImageSlider data={data?.images ?? []} />
          ) : (
            <Image source={Images.box} size={100} alt="box" />
          )}
        </VStack>

        <CustomCard mt={5}>
          <VStack space={2}>
            <TitleSubtitleGroup
              title="Name"
              subTitle={data?.formalName ?? 'N/A'}
            />
            <TitleSubtitleGroup
              title="Family"
              subTitle={data?.widgetFamily?.parent?.name ?? 'N/A'}
            />
            <TitleSubtitleGroup
              title="Sub family"
              subTitle={data?.widgetFamily?.name ?? ''}
            />
          </VStack>
        </CustomCard>
        <CustomCard mt={5}>
          <HStack space={3} alignItems={'flex-end'}>
            <TitleSubtitleGroup
              title="Total in Inventory"
              subTitle={data?.totalQuantity ?? ''}
            />
            <TitleSubtitleGroup
              title="Total Reserved"
              subTitle={data?.reservedQuantity ?? ''}
            />
            <TitleSubtitleGroup
              title="Total Available"
              subTitle={data?.availableQuantity ?? ''}
            />
          </HStack>
        </CustomCard>
        <LocationTable data={data?.locations ?? []} />
        <CustomCard my={5}>
          <VStack space={2}>
            {getData(data)?.map((item, i) => (
              <TitleSubtitleGroup
                key={i + item?.title}
                title={item?.title ?? ''}
                subTitle={item?.value ?? '--'}
              />
            ))}
          </VStack>
        </CustomCard>
      </Stack>
      <CustomAlertDialog
        title="Confirm"
        body="Did you want to pick from reserve?"
        isOpen={reserveDialogVisible}
        onClose={() => onCloseReserveDialog(true)}
        buttons={[
          {
            label: 'Yes',
            bg: 'green.400',
            size: 'sm',
            width: 50,
            onPress: onAcceptPickFromReserve
          },
          {
            label: 'No',
            bg: 'red.400',
            size: 'sm',
            width: 50,
            onPress: () => onCloseReserveDialog(false)
          }
        ]}
      />
      <PageModal
        visible={openReserveList}
        title="Select Reserve"
        onBackPress={() => setOpenReserveList(false)}>
        <VStack space={5} height="100%">
          {reserves?.length ? (
            reserves.map((reserve) => (
              <ReserveInfo
                reserve={reserve}
                onPress={(item) => handleSelectReserve(item)}
              />
            ))
          ) : (
            <VStack
              flex={1}
              height="100%"
              justifyContent="center"
              alignItems={'center'}>
              <Text color={'black'} fontWeight={'bold'} fontSize={'md'}>
                No reserves found
              </Text>
            </VStack>
          )}
        </VStack>
      </PageModal>
    </PageLayout>
  );
};

export default LocationDetails;
