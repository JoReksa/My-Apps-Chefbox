import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppsStack from './src/Route/Appstack';
import {Provider} from 'react-redux';
import storeRedux from './src/redux/store';
import {LogBox} from 'react-native';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['']);
LogBox.ignoreLogs(['Require Cycle']);
LogBox.ignoreLogs(['VirtualizedLists']);

export default function App() {
  return (
    <Provider store={storeRedux}>
      <NavigationContainer>
        <AppsStack />
      </NavigationContainer>
    </Provider>
  );
}
