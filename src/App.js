/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HomeScreen from './containers/home/home.js';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>Photos</Text>
        <HomeScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
