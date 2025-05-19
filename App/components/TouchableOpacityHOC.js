import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableOpacityHOC = (props) => {
  if (props?.onPress) {
    return (
      <TouchableOpacity onPress={props?.onPress} activeOpacity={0.7}>
        {props.children}
      </TouchableOpacity>
    );
  } else {
    return props.children;
  }
};

export default TouchableOpacityHOC;
