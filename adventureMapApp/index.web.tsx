import { AppRegistry } from 'react-native';
import App from './App';

const appName = "AdventureMapApp"; // Replace with your actual app name


AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
