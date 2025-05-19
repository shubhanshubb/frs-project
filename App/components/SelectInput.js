import {
  Box,
  CheckIcon,
  FormControl,
  Image,
  Select,
  WarningOutlineIcon
} from 'native-base';
import React from 'react';
import { Icons } from '../assets';

const SelectInput = (
  { label, data, onSelect, placeholder = '', ...rest },
  ref
) => {
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
        <Select
          height={50}
          py={0}
          size={'lg'}
          minWidth="200"
          accessibilityLabel={label ?? ''}
          placeholder={(placeholder || label) ?? ''}
          onValueChange={onSelect}
          dropdownIcon={
            <Image
              mr={2}
              source={Icons.arrowDownFill}
              size={'7'}
              tintColor={'gray.400'}
              alt="dropdown"
            />
          }
          _selectedItem={{
            bg: 'app.primary',
            _text: {
              color: '#FFF'
            },
            endIcon: <CheckIcon size={5} />
          }}
          {...rest}
          ref={ref}>
          {data?.map((item, i) => (
            <Select.Item
              key={i?.toString()}
              label={item?.label}
              value={item.value}
            />
          ))}
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {rest?.isInvalid ?? ''}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default React.forwardRef(SelectInput);
