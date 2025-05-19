import React from 'react';
import { HStack, VStack } from 'native-base';
import CustomCard from './CustomCard';
import TitleSubtitleGroup from './TitleSubtitleGroup';
import moment from 'moment';

const ReserveInfo = ({ reserve, onPress, ...rest }) => {
  return (
    <CustomCard onPress={() => onPress(reserve)} {...rest}>
      <VStack>
        <HStack
          space="3"
          mb={3}
          justifyContent={'space-evenly'}
          alignItems="flex-start">
          <TitleSubtitleGroup
            flex={0.8}
            title="For Job #"
            subTitle={reserve?.job}
          />
          <TitleSubtitleGroup
            flex={0.2}
            title="Quantity"
            alignItems="flex-end"
            subTitle={reserve?.remainingQuantity}
          />
        </HStack>
      </VStack>
      <VStack>
        <HStack
          space="3"
          mb={3}
          justifyContent={'space-evenly'}
          alignItems="flex-start">
          <TitleSubtitleGroup
            flex={0.5}
            title="Warehouse"
            subTitle={reserve?.warehouse_id?.name || '---'}
          />
          <TitleSubtitleGroup
            flex={0.5}
            alignItems="flex-end"
            title="Pick Date"
            subTitle={moment(reserve?.pickupDate).format('DD/MM/YYYY')}
          />
        </HStack>
      </VStack>
      <VStack>
        <HStack
          space="3"
          mb={3}
          justifyContent={'space-evenly'}
          alignItems="flex-start">
          <TitleSubtitleGroup
            flex={0.5}
            title="Reserved By"
            subTitle={reserve?.performedBy?.fullName || '---'}
          />
          <TitleSubtitleGroup
            flex={0.5}
            alignItems="flex-end"
            title="Reserved Date"
            subTitle={moment(reserve?.updatedAt).format('DD/MM/YYYY')}
          />
        </HStack>
      </VStack>
    </CustomCard>
  );
};

export default ReserveInfo;
