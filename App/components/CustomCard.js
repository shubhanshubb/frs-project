import { Box } from 'native-base';
import React from 'react';
import { TouchableOpacityHOC } from '.';

const CustomCard = (props) => {
  return (
    <TouchableOpacityHOC {...props}>
      <Box
        borderWidth={1}
        borderColor={'app.border'}
        borderRadius={10}
        paddingY={3}
        paddingX={3}
        {...props}>
        {props.children}
      </Box>
    </TouchableOpacityHOC>
  );
};

export default CustomCard;
