/* eslint-disable no-console */
import APP_ENV from '../config/AppEnvironment';

/**
 * Log errors, information, warnings, etc to the console
 * Log will be displayed only on development mode.
 */
const nullFunc = () => null;
const isDev = APP_ENV.APP_MODE === 'development';
const LOGGER = {
  info: isDev ? console.info : nullFunc,
  warn: isDev ? console.warn : nullFunc,
  error: isDev ? console.error : nullFunc,
  log: isDev ? console.log : nullFunc,
  debug: isDev ? console.debug : nullFunc,
  clear: isDev ? console.clear : nullFunc
};

export default LOGGER;
