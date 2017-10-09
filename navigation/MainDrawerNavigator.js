
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MainStackNavigator from '../navigation/MainStackNavigator';
import SecondStackNavigator from '../navigation/SecondStackNavigator';

const MainDrawerNavigator = DrawerNavigator({
  MainStackNavigator: {screen: MainStackNavigator},
  SecondStackNavigator: {screen: SecondStackNavigator}
}, {
  initialRouteName: 'MainStackNavigator',
  //headerMode: 'screen'
});

export default MainDrawerNavigator;
