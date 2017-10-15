
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MainStackNavigator from '../navigation/MainStackNavigator';
import SecondStackNavigator from '../navigation/SecondStackNavigator';
import UserListNavigator from '../navigation/UserListNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// https://github.com/oblador/react-native-vector-icons
// https://materialdesignicons.com/


const MainDrawerNavigator = DrawerNavigator({

  // comment this out to remove the map
  // MainStackNavigator: {
  //   screen: MainStackNavigator,
  //   navigationOptions: ({navigation}) => ({
  //     drawerLabel: 'Map',
  //     drawerIcon: () => (
  //       <Icon name="earth" size={20} color="black"  />
  //     ),
  //   }),
  // },

  SecondStackNavigator: {
    screen: SecondStackNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Second',
      drawerIcon: () => (
        <Icon name="atom" size={20} color="black"  />
      ),
    }),
  },

  UserListNavigator: {
    screen: UserListNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Users',
      drawerIcon: () => (
        <Icon name="account-multiple" size={20} color="black"  />
      ),
    }),
  },

}, {
  // can speed up testing by changing this
  initialRouteName: 'UserListNavigator',
  //headerMode: 'screen'
});

export default MainDrawerNavigator;
