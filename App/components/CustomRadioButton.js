import { Box, FormControl, Radio, WarningOutlineIcon } from 'native-base';
import React from 'react';

const CustomRadioButton = ({ label, data, onChange, ...rest }, ref) => {
  return (
    <Box mb={4} zIndex={9999}>
      <FormControl {...rest}>
        {label && (
          <FormControl.Label
            _text={{
              fontWeight: 'normal',
              fontSize: 14
            }}>
            {label}
          </FormControl.Label>
        )}
        <Radio.Group
          name={label}
          accessibilityLabel={label}
          onChange={onChange}
          {...rest}
          ref={ref}>
          {data?.map((item, i) => (
            <Radio key={i + item?.value} mb={1} colorScheme="blue" {...item}>
              {item?.label}
            </Radio>
          ))}
        </Radio.Group>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {rest?.isInvalid ?? ''}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default React.forwardRef(CustomRadioButton);
