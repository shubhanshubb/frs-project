import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../../constant';
import { NOTIFICATION_PAGE_SIZE } from '../../../constant/constants';
import NotificationActions, {
  NotificationSelector
} from '../../../redux/NotificationRedux';
import { showToast } from '../../../services/toastService';
import { makeAPIRequest } from '../../../services/Utils';

const useNotification = () => {
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { unreadCount } = useSelector(NotificationSelector.getUnreadCount);
  const dispatch = useDispatch();

  const fetchNotification = async (currentPage = 1) => {
    if (currentPage === 1) {
      setInitialLoading(true);
    } else {
      setLoadingNextPage(true);
    }
    try {
      const {
        data,
        success,
        totalCount: totalCountFromAPI,
        unreadCount: unreadCountFromAPI
      } = await queryClient.fetchQuery(['notification', currentPage], () =>
        makeAPIRequest('get', API.NOTIFICATION(currentPage))
      );
      if (data && success) {
        setTotalCount(totalCountFromAPI);
        dispatch(NotificationActions.updateUnreadCount(unreadCountFromAPI));
        setPage(currentPage);
        if (currentPage === 1) {
          setNotifications(data);
        } else {
          setNotifications([...notifications, ...data]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
      setLoadingNextPage(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotification();
    });

    return unsubscribe;
  }, [navigation]);

  const onLoadMore = () => {
    if (
      page + 1 <= Math.ceil(totalCount / NOTIFICATION_PAGE_SIZE) &&
      !loadingNextPage &&
      !initialLoading
    ) {
      fetchNotification(page + 1);
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onClickReadStatus = (item, index, rowMap) => {
    closeRow(rowMap, item._id);
    const newData = [...notifications];
    newData[index].readStatus = !newData[index].readStatus;
    dispatch(
      NotificationActions.updateUnreadCount(
        unreadCount + (newData[index].readStatus ? -1 : 1)
      )
    );
    setNotifications(newData);
    makeAPIRequest('post', item.readToggleURL).catch((error) => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Something went wrong. Please try again!!'
      });
    });
  };

  const onDismissNotification = (item, index) => {
    const newData = [...notifications];
    newData.splice(index, 1);
    setNotifications(newData);
    if (!item.readStatus) {
      dispatch(NotificationActions.updateUnreadCount(unreadCount - 1));
    }
    makeAPIRequest('post', item.dismissURL).catch((error) => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Something went wrong. Please try again!!'
      });
    });
  };

  return {
    page,
    totalCount,
    initialLoading,
    loadingNextPage,
    fetchNotification,
    onLoadMore,
    notifications,
    setNotifications,
    closeRow,
    unreadCount,
    onClickReadStatus,
    onDismissNotification
  };
};

export default useNotification;
