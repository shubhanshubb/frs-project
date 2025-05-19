import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  updateUnreadCount: ['unreadCount']
});

export const NotificationTypes = Types;
const NotificationActions = Creators;
export default NotificationActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  unreadCount: 0
});

/* ------------- Selectors ------------- */
export const NotificationSelector = {
  getUnreadCount: (state) => state.notification
};

/* ------------- Reducers ------------- */
export const updateUnreadCount = (state, { unreadCount }) => {
  return state.merge({
    unreadCount
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const notificationReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_UNREAD_COUNT]: updateUnreadCount
});
