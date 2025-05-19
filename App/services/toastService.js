import React from 'react';
import Toast from 'react-native-toast-message';
import { Text, View } from 'react-native';

const colors = {
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  white: '#FFF',
  black: '#000'
};

const CommonConfig = ({ text1, bg, color = colors.white, ...rest }) => {
  const containerStyle = {
    marginHorizontal: 5,
    backgroundColor: bg,
    borderRadius: 10
  };
  const textStyle = { color, paddingVertical: 10, paddingHorizontal: 15 };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text1}</Text>
    </View>
  );
};

const Error = (props) => {
  return <CommonConfig bg={colors.error} {...props} />;
};

const Success = (props) => {
  return <CommonConfig bg={colors.success} {...props} />;
};

const Warning = (props) => {
  return <CommonConfig bg={colors.warning} color={colors.black} {...props} />;
};

const Info = (props) => {
  return <CommonConfig bg={colors.info} {...props} />;
};

export const toastConfig = {
  error: (props) => <Error {...props} />,
  success: (props) => <Success {...props} />,
  warning: (props) => <Warning {...props} />,
  info: (props) => <Info {...props} />
};

export const showToast = ({ type = 'success', text1 = '', ...rest }) => {
  if (text1?.length > 0) {
    Toast.show({
      type: type,
      text1: text1,
      ...rest
    });
  }
};
