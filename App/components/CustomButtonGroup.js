import { Button } from 'native-base';
import React from 'react';

const CustomButtonGroup = ({ buttons, onPressButton, ...rest }) => {
  return (
    <Button.Group
      mx={{
        base: 'auto',
        md: 0
      }}
      size="sm"
      justifyContent={'space-evenly'}
      {...rest}>
      {buttons?.map(({ label, ...restProps }, i) => (
        <Button
          key={i + label}
          variant="primary"
          colorScheme="warning"
          flex={1}
          onPress={() => onPressButton(label, restProps)}
          {...restProps}>
          {label ?? ''}
        </Button>
      ))}
    </Button.Group>
  );
};

export default CustomButtonGroup;
