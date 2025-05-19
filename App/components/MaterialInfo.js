import { HStack, Stack } from 'native-base';
import React from 'react';
import { CustomCard, TitleSubtitleGroup } from '.';
import CustomButtonGroup from './CustomButtonGroup';

const MaterialInfo = ({
  data,
  type,
  buttons,
  onPressButton,
  buttonProps = {},
  ...rest
}) => {
  if (type === 'PPR') {
    return (
      <CustomCard {...rest}>
        <HStack
          space="3"
          mb={3}
          justifyContent={'space-evenly'}
          alignItems="flex-start">
          <TitleSubtitleGroup
            flex={0.8}
            title="Widget Name"
            subTitle={data?.commonName}
          />
          <TitleSubtitleGroup
            flex={0.2}
            title="Quantity"
            subTitle={data?.availableQuantity || 0}
          />
        </HStack>

        <HStack space="3" alignItems="flex-start">
          <TitleSubtitleGroup
            flex={0.6}
            title="Thickness"
            subTitle={data?.type}
          />
          <TitleSubtitleGroup flex={0.2} title="Color" subTitle={data?.color} />
          <TitleSubtitleGroup flex={0.2} title="Size" subTitle={data?.size} />
        </HStack>

        {buttons?.length > 0 && (
          <Stack mt={5}>
            <CustomButtonGroup
              onPressButton={onPressButton}
              size="sm"
              buttons={buttons}
              {...buttonProps}
            />
          </Stack>
        )}
      </CustomCard>
    );
  }
  return (
    <CustomCard {...rest}>
      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Name"
          subTitle={data?.commonName}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Manufacturer"
          subTitle={data?.manufacturer}
        />
      </HStack>
      <HStack
        space="3"
        mb={3}
        justifyContent={'space-evenly'}
        alignItems="flex-start">
        <TitleSubtitleGroup flex={0.5} title="Size" subTitle={data?.size} />
        <TitleSubtitleGroup
          flex={0.5}
          title="Availability"
          subTitle={data?.manufacturer}
        />
      </HStack>
      <HStack space="3" alignItems="flex-start">
        <TitleSubtitleGroup
          flex={0.5}
          title="Location"
          subTitle={data?.manufacturer}
        />
        <TitleSubtitleGroup
          flex={0.5}
          title="Job"
          subTitle={data?.manufacturer}
        />
      </HStack>
    </CustomCard>
  );
};

export default MaterialInfo;
