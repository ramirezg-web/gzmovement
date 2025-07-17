import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRegistry } from 'react-native-web';
import App from './App';

// Register the app
AppRegistry.registerComponent('App', () => App);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);