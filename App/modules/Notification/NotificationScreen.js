import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  HStack,
  Icon,
  Pressable,
  Text,
  theme,
  View,
  VStack
} from 'native-base';
import useNotification from './hooks/useNotification';
import { CustomCard } from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const LEVEL = {
  1: theme.colors.danger[200],
  2: theme.colors.orange[200],
  3: theme.colors.green[200],
  4: 'white'
};

const NotificationScreen = () => {
  const {
    notifications,
    initialLoading,
    loadingNextPage,
    onLoadMore,
    onClickReadStatus,
    onDismissNotification
  } = useNotification();

  const renderNotification = ({ item }) => {
    const sixDaysBefore = moment().subtract(6, 'days');
    const date = moment(item.createdAt);
    const isBeforeSixDays = date.isBefore(sixDaysBefore);
    const dateText = isBeforeSixDays
      ? date.format('Do MMM YYYY | hh:mm a')
      : date.fromNow();
    return (
      <CustomCard
        mb={3}
        bg={LEVEL[item.level || 4] || 'white'}
        justifyContent="space-between"
        minHeight={100}>
        <Text fontWeight={item.readStatus ? 'normal' : 'semibold'}>
          {item.message}
        </Text>
        <View alignItems={'flex-end'} mt={2}>
          <Text color={'coolGray.500'}>{dateText}</Text>
        </View>
      </CustomCard>
    );
  };

  const renderHiddenItem = ({ item, index }, rowMap) => {
    return (
      <HStack flex="1" pl="2" pr={2} pb={3} height={100}>
        <Pressable
          w="70"
          ml="auto"
          cursor="pointer"
          bg="coolGray.200"
          justifyContent="center"
          onPress={() => onClickReadStatus(item, index, rowMap)}
          _pressed={{
            opacity: 0.5
          }}>
          <VStack alignItems="center" space={2}>
            <Icon
              as={<Entypo name="unread" />}
              size="xs"
              color="coolGray.800"
            />
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="coolGray.800"
              textAlign={'center'}>
              {item.readStatus ? 'Mark as Unread' : 'Mark as Read'}
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          cursor="pointer"
          bg="red.500"
          justifyContent="center"
          onPress={() => onDismissNotification(item, index)}
          _pressed={{
            opacity: 0.5
          }}>
          <VStack alignItems="center" space={2}>
            <Icon
              as={<MaterialIcons name="delete" />}
              color="white"
              size="xs"
            />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Dismiss
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };

  return (
    <AppLayout>
      <View flex={1} pt={7}>
        {!initialLoading && notifications?.length ? (
          <SwipeListView
            data={notifications}
            style={styles.listContainer}
            onEndReached={onLoadMore}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item._id.toString()}
            ListFooterComponent={() =>
              loadingNextPage ? (
                <ActivityIndicator
                  size={'large'}
                  color={theme.colors.primary}
                />
              ) : null
            }
            renderItem={renderNotification}
            renderHiddenItem={renderHiddenItem}
            onEndReachedThreshold={0.5}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        ) : (
          <View justifyContent={'center'} height="100%" alignItems={'center'}>
            {initialLoading ? (
              <ActivityIndicator size={'large'} color={theme.colors.primary} />
            ) : (
              <Text>No Notifications</Text>
            )}
          </View>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15
  }
});

export default NotificationScreen;
