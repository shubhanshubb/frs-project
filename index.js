/**
 * @format
 */
if (__DEV__) {
  import('./App/config/ReactronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}
import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './App/App';
import './App/config/i18n';
import './App/config/ReactronConfig';

LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
