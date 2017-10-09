
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MainStackNavigator from '../navigation/MainStackNavigator';
import SecondStackNavigator from '../navigation/SecondStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// https://github.com/oblador/react-native-vector-icons
// https://materialdesignicons.com/


const MainDrawerNavigator = DrawerNavigator({

  MainStackNavigator: {
    screen: MainStackNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Map',
      drawerIcon: () => (
        <Icon name="earth" size={20} color="black"  />
      ),
    }),
  },

  SecondStackNavigator: {
    screen: SecondStackNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Second',
      drawerIcon: () => (
        <Icon name="atom" size={20} color="black"  />
      ),
    }),
  }

}, {
  initialRouteName: 'MainStackNavigator',
  //headerMode: 'screen'
});

export default MainDrawerNavigator;
