import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { APP_ENV } from '../config';
import rootSaga from '../sagas';
import immutablePersistenceTransform from '../services/immutablePersistenceTransform';
import rootReducer from './index';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleWare = [sagaMiddleware];

const persistConfig = {
  key: '@root',
  storage: AsyncStorage,
  blacklist: ['nav', 'navigation', 'network'],
  transforms: [immutablePersistenceTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware to redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middleWare);

const enhancers =
  APP_ENV.APP_MODE === 'development'
    ? composeEnhancers(middleware, console.tron.createEnhancer())
    : compose(middleware);

const store = createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

// Enable persistence
export default { store, persistor };
