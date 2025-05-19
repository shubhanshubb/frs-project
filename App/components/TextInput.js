import { FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import React from 'react';
import TouchableOpacityHOC from './TouchableOpacityHOC';

const TextInput = ({ label, stackProps = {}, ...rest }, ref) => {
  console.log('rest?.isInvalid', rest?.isInvalid);
  return (
    <TouchableOpacityHOC {...rest}>
      <Stack mb={4} flex={1} {...stackProps}>
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
          <Input size={'lg'} height={50} isFullWidth {...rest} ref={ref} />
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size="xs" />}
            color="red.600"
            _text={{
              color: 'red.600'
            }}>
            {rest?.isInvalid ?? 'dkfk'}
          </FormControl.ErrorMessage>
        </FormControl>
      </Stack>
    </TouchableOpacityHOC>
  );
};

export default React.forwardRef(TextInput);
