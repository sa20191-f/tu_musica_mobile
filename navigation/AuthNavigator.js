import React from 'react';
import { createStackNavigator } from 'react-navigation';

import InitialScreen from '../screens/InitialScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

export default createStackNavigator({
  InitialScreen,
  LoginScreen,
  SignUpScreen,
});