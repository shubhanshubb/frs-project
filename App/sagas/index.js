import { all } from 'redux-saga/effects';
import AuthSaga from './Auth';

export default function* rootSaga() {
  yield all([...AuthSaga]);
}
