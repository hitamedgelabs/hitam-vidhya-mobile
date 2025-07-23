import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import BottomTabs from './navigation/BottomTabs';
import AppStack from './navigation/AppStack';

const App = () => {
  return (
    <AppStack />
  );
};

export default App;
