import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';
import { notificationReducer } from './NotificationRedux';

// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
