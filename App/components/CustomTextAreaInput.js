import { Box, FormControl, TextArea, WarningOutlineIcon } from 'native-base';
import React from 'react';

const CustomTextAreaInput = ({ label, ...rest }, ref) => {
  return (
    <Box mb={4}>
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
        <TextArea size={'lg'} isFullWidth {...rest} ref={ref} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {rest?.isInvalid ?? ''}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default React.forwardRef(CustomTextAreaInput);
