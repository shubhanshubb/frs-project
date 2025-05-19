import { Box } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SliderBox } from 'react-native-image-slider-box';

const { width } = Dimensions.get('window');

const CustomImageSlider = ({ data, ...rest }, ref) => {
  const getImages = () => {
    return data?.map((item) => item?.url);
  };
  return (
    <Box height={200}>
      <SliderBox
        height={200}
        autoplay
        circleLoop
        parentWidth={width - 40}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        ImageComponent={FastImage}
        images={getImages()}
        ImageComponentStyle={{ borderRadius: 8 }}
        {...rest}
      />
    </Box>
  );
};

export default React.forwardRef(CustomImageSlider);
