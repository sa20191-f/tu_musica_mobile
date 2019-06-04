import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import ListScreen from '../screens/ListScreen';
import AddListScreen from '../screens/AddListScreen';

const headerStyles = {
  headerStyle: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'archivo-narrow',
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
  tabBarLabel: 'Musica',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-search' : 'md-search'
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
  AddList: AddListScreen,
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
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#000',
      color: '#fff'
    }
  },
});
