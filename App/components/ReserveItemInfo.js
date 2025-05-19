import { Button, HStack } from 'native-base';
import React from 'react';
import { CustomCard, TitleSubtitleGroup } from '.';

const ReserveItemInfo = ({ data, onRequestCancel, ...rest }) => {
  return (
    <CustomCard {...rest}>
      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup flex={0.5} title="Name" subTitle={data?.name} />
        <TitleSubtitleGroup flex={0.5} title="Family" subTitle={data?.family} />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Sub Family"
          subTitle={data?.subFamily}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Warehouse"
          subTitle={data?.warehouse}
        />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Type - Size - Color"
          subTitle={data?.typeSizeColor}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Total Quantity"
          subTitle={data?.pickedQuantity}
        />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Reserved Quantity"
          subTitle={data?.reservedQuantity}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Remaining Quantity"
          subTitle={data?.remainingQuantity}
        />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="For Job "
          subTitle={data?.forJob}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Reserved By"
          subTitle={data?.reservedBy}
        />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Expected Pick Date"
          subTitle={data?.pickupDate}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Reservation Date"
          subTitle={data?.reservationDate}
        />
      </HStack>

      <HStack mb={3} alignItems="flex-start">
        <TitleSubtitleGroup title="Usage Reason" subTitle={data?.usageReason} />
      </HStack>

      <Button
        mt={3}
        colorScheme="red"
        width={'100%'}
        size={'lg'}
        onPress={() => onRequestCancel(data)}>
        Cancel
      </Button>
    </CustomCard>
  );
};

export default ReserveItemInfo;
