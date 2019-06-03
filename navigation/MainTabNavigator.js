import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import ListScreen from '../screens/ListScreen';

const headerStyles = {
  headerStyle: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'archivo-narrow'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'archivo-narrow',
  },
}
const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  defaultNavigationOptions: headerStyles,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PlayStack = createStackNavigator({
  Play: PlayScreen,
}, {
  defaultNavigationOptions: headerStyles,
});

PlayStack.navigationOptions = {
  tabBarLabel: 'Play',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-play-circle' : 'md-play-circle'}
    />
  ),
};

const ListStack = createStackNavigator({
  List: ListScreen,
}, {
  defaultNavigationOptions: headerStyles,
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PlayStack,
  ListStack,
});
