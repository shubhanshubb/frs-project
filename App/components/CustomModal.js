import { Actionsheet, Box, CloseIcon, ScrollView } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomButtonGroup, CustomTextAreaInput, TextInput } from '.';
import CustomRadioButton from './CustomRadioButton';

const CustomModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Header width={'100%'} alignItems={'flex-end'} px={2}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C2C2C2',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                width: 25,
                height: 25
              }}
              onPress={onClose}>
              <CloseIcon size={2} />
            </TouchableOpacity>
          </Actionsheet.Header>
          <ScrollView></ScrollView>
          <Box width={'100%'} px={4} pt={5}>
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
            <CustomTextAreaInput
              label="Issue details"
              numberOfLines={4}
              maxH={200}
            />
          </Box>
        </Actionsheet.Content>
        <Actionsheet.Footer borderRadius={0} borderWidth={0}>
          <Box m={6}>
            <CustomButtonGroup
              onPressButton={(a, b) => onOpen()}
              size="lg"
              buttons={[{ label: 'Check-In', colorScheme: 'green' }]}
            />
          </Box>
        </Actionsheet.Footer>
      </Actionsheet>
    </>
  );
};

export default CustomModal;
