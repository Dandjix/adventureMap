import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { NativeRouter } from 'react-router-native';

// Register the app entry point
const Main = () => (
  <NativeRouter>
    <App />
  </NativeRouter>
);

AppRegistry.registerComponent('main', () => Main);
AppRegistry.runApplication('main', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
