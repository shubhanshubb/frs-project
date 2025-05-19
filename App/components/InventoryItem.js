import { Button, HStack } from 'native-base';
import React from 'react';
import { CustomCard, TitleSubtitleGroup } from '.';

const InventoryItem = ({ data, onRequestCancel, ...rest }) => {
  return (
    <CustomCard {...rest}>
      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Item Name"
          subTitle={data?.itemName}
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
          title="Inventory"
          subTitle={data?.inventory}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Primary Widget Family"
          subTitle={data?.primaryWidgetFamily}
        />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Secondary Widget Family"
          subTitle={data?.secondaryWidgetFamily}
        />
        <TitleSubtitleGroup flex={0.5} title="Size" subTitle={data?.size} />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Thickness"
          subTitle={data?.thickness}
        />
        <TitleSubtitleGroup flex={0.5} title="Color" subTitle={data?.color} />
      </HStack>

      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        {/* <TitleSubtitleGroup
          flex={0.5}
          title="Location"
          subTitle={data?.location}
        /> */}
        <TitleSubtitleGroup
          flex={0.5}
          title="Total Quantity"
          subTitle={data?.total}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Inventory Cost"
          subTitle={data?.cost}
        />
      </HStack>

      {/* <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Reserved Quantity"
          subTitle={data?.reserved}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Available Quantity"
          subTitle={data?.available}
        />
      </HStack> */}

      {/* <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Unit Cost"
          subTitle={data?.unitCost}
        />
      
      </HStack> */}
    </CustomCard>
  );
};

export default InventoryItem;
