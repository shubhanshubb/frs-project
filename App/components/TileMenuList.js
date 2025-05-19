import { Center, HStack, Image, Stack, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icons } from '../assets';

const TileMenuList = ({
  title,
  subTitle,
  leftIcon,
  rightIcon = Icons.arrowRight,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <HStack
        space="4"
        alignItems="center"
        borderWidth={1}
        borderColor={'app.border'}
        borderRadius={10}
        paddingY={5}
        paddingX={3}
        justifyContent={'space-between'}>
        <Center bg={'app.primary'} size={'sm'} borderRadius={50}>
          {leftIcon && (
            <Image source={leftIcon} tintColor={'white'} size={6} alt="icon" />
          )}
        </Center>
        <Stack flex={1}>
          <Text fontSize={18} fontWeight={400} color={'app.text'}>
            {title}
          </Text>
          <Text fontSize={14} fontWeight={400} color={'app.subText'}>
            {subTitle}
          </Text>
        </Stack>
        <Center>
          {rightIcon && (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
              <Image source={rightIcon} size={7} alt="icon" />
            </TouchableOpacity>
          )}
        </Center>
      </HStack>
    </TouchableOpacity>
  );
};

export default TileMenuList;
