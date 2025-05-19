import { Box, Center, Image } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icons } from '../../../assets';
import {
  CustomRadioButton,
  CustomTextAreaInput,
  TextInput
} from '../../../components';

const PickUpForm = () => {
  return (
    <Box width={'100%'}>
      <TextInput
        label="Scan Location Address"
        rightElement={
          <Center mr={3}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Icons.scanner}
                size={7}
                alt="scan"
                tintColor="black"
              />
            </TouchableOpacity>
          </Center>
        }
      />
      <TextInput label="Check-in meter reading" />
      <CustomRadioButton
        label="Any Issue to Report?"
        value="Yes"
        defaultValue="Yes"
        data={[
          {
            label: 'Yes',
            value: 'Yes'
          },
          {
            label: 'No',
            value: 'No'
          }
        ]}
      />
      <CustomTextAreaInput label="Issue details" numberOfLines={4} maxH={200} />
    </Box>
  );
};

export default PickUpForm;
