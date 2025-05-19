import AsyncStorage from '@react-native-async-storage/async-storage';
import apisauce from 'apisauce';
import Redux from '../redux/Store';
import LOGGER from '../services/Logger';
import APP_ENV from './AppEnvironment';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { API } from '../constant';
import { makeAPIRequest } from '../services/Utils';
import AuthActions from '../redux/AuthRedux';

//Create apisauce Instance
const getApiInstance = (baseURL) => {
  return apisauce.create({
    baseURL,
    timeout: 30000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });
};

//Multiple instance based on authentication requirement
const protectedApiClient = (baseURL) => getApiInstance(baseURL);
const apiClient = (baseURL) => getApiInstance(baseURL);

/**
 * Use AuthorizedAPI when Authorization token required for the API request
 * Use UnauthorizedAPI when Authorization token NOT required for the API request
 */
const AuthorizedAPI = protectedApiClient(APP_ENV.BASE_URL);
const UnauthorizedAPI = apiClient(APP_ENV.BASE_URL);

/**
Monitors are functions you can attach to the API which will be called when any request is made. You can use it to do things like:

=> check for headers and record values
=> determine if you need to trigger other parts of your code
=> measure performance of API calls
=> perform logging
=> Monitors are run just before the promise is resolved.
=> You get an early sneak peak at what will come back.

You cannot change anything, just look.
 */

const APIMonitor = (response) => {
  LOGGER.info(`API MONITOR: ${response?.config?.url}`, response);
};

AuthorizedAPI.addMonitor(APIMonitor);
UnauthorizedAPI.addMonitor(APIMonitor);

// Mutate request object in here to change header about the request.
AuthorizedAPI.addAsyncRequestTransform(async (request) => {
  let token = '';
  try {
    const state = Redux?.store?.getState();
    token = state?.auth?.user?.accessToken ?? null;

    const token_decoded = jwt_decode(token);

    const isValidToken = moment
      .unix(token_decoded.exp)
      .isAfter(moment().subtract(1, 'h'));

    if (isValidToken) {
      request.headers.Authorization = token;
    } else {
      const refreshToken = state?.auth?.user?.refreshToken ?? null;
      const response = await makeAPIRequest(
        'post',
        API.REFRESH_TOKEN,
        {
          token: refreshToken
        },
        UnauthorizedAPI
      );
      const updatedToken = response?.data?.accessToken;
      request.headers.Authorization = updatedToken;
      Redux.store.dispatch(AuthActions.updateToken(updatedToken));
    }
    if (!token) {
      token = await AsyncStorage.getItem('authToken');
    }
  } catch (err) {
    console.log('err', err);
    token = await AsyncStorage.getItem('authToken');
  }
  request.headers.Authorization = token;
});

export { AuthorizedAPI, UnauthorizedAPI };
