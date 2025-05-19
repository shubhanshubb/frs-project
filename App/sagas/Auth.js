import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthorizedAPI } from '../config';
import AuthActions, { AuthTypes } from '../redux/AuthRedux';
import ApiServices from '../services/API/ApiServices';
// import {
//   getError,
// } from '../services/Utils';

export function* onRequestLogin({ payload }) {
  const response = yield call(
    ApiServices[payload?.method],
    AuthorizedAPI,
    payload?.slug,
    payload?.data
  );
  if (response?.status === 200) {
    yield put(
      AuthActions.loginSuccess({
        loader: payload?.loader,
        user: response?.data?.data
      })
    );
  } else {
    yield put(
      AuthActions.loginFailure({
        loader: payload?.loader,
        error: response?.data
      })
    );
  }
}

export default [takeLatest(AuthTypes.LOGIN_REQUEST, onRequestLogin)];
