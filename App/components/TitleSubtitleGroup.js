import { Stack, Text } from 'native-base';
import React from 'react';

const TitleSubtitleGroup = ({
  title,
  subTitle,
  titleProps,
  subTitleProps,
  ...rest
}) => {
  return (
    <Stack {...rest} flexShrink={1}>
      <Text color="app.subText" fontSize={13} {...titleProps}>
        {title ?? ''}
      </Text>
      <Text fontSize={15} lineHeight={18} {...subTitleProps}>
        {subTitle ?? ''}
      </Text>
    </Stack>
  );
};

export default TitleSubtitleGroup;
