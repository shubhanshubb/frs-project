import { useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  VStack
} from 'native-base';
import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Icons } from '../assets';
import { AuthSelectors } from '../redux/AuthRedux';
import { getInitialFromName } from '../services/Utils';

const AppLayout = ({
  children,
  type = 'home',
  title,
  onPressBack,
  isLoading = false,
  isSearchbar = false,
  isRightIcon = false,
  rightIcon,
  renderSubHeader,
  onPressRightIcon = () => null,
  ...rest
}) => {
  const user = useSelector(AuthSelectors.getUser);
  const navigation = useNavigation();

  return (
    <Box bg={'white'} flex={1} flexGrow={1} {...rest}>
      <VStack
        zIndex={999999}
        shadow={type === 'home' ? null : 2}
        bg={type === 'home' ? '#FFF' : '#F9F9F9'}
        px={5}>
        <HStack
          // borderBottomWidth={2}
          zIndex={999999}
          pt={Platform.OS === 'android' ? 0 : 70}
          alignItems="center"
          justifyContent={'space-between'}>
          <Stack p={2} flexShrink={1}>
            {type === 'home' ? (
              <Heading top={1} color={'app.primary'} flexShrink={1}>
                Hi {user?.fullName}
              </Heading>
            ) : (
              <TouchableOpacity
                style={styles.backBtn}
                activeOpacity={0.7}
                onPress={onPressBack}>
                <Image source={Icons.arrowLeft} size={7} alt="back" />
              </TouchableOpacity>
            )}
          </Stack>
          {title !== undefined && title?.length > 0 && (
            <Center size="16" flex={1} ml={5}>
              <Heading noOfLines={1} fontSize={18}>
                {title ?? ''}
              </Heading>
            </Center>
          )}
          <Center size="16">
            {type === 'home' && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.openDrawer()}>
                <Avatar
                  bg="amber.500"
                  source={{
                    uri: user?.image_url
                  }}>
                  {getInitialFromName(user?.fullName ?? '')}
                </Avatar>
              </TouchableOpacity>
            )}
            {isRightIcon && (
              <TouchableOpacity activeOpacity={0.5} onPress={onPressRightIcon}>
                <Image source={rightIcon} size={6} alt="icon" />
              </TouchableOpacity>
            )}
          </Center>
        </HStack>
        {isSearchbar && (
          <Input
            mb={3}
            placeholder="Search here"
            bg={'gray.100'}
            _dark={{ bg: 'transparent' }}
            borderRadius="8"
            fontSize="14"
            onChangeText={rest.onChangeSearchText}
            value={rest.searchText}
            InputLeftElement={
              <Icon
                m="1"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        )}
      </VStack>
      {isLoading ? (
        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'lg'} color="emerald.500" />
        </Stack>
      ) : (
        <>
          {React.isValidElement(renderSubHeader) && renderSubHeader}
          {children}
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  backBtn: { marginLeft: -5, padding: 7 }
});

export default AppLayout;
