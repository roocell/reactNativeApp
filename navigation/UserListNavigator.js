import React from 'react';
import { StackNavigator } from 'react-navigation';
import UserList from '../components/UserList';
import DrawerButton from '../components/DrawerButton';

const UserListNavigatior = StackNavigator({
  UserList: {
    screen: UserList

  },
}, {
  initialRouteName: 'UserList',

// https://reactnavigation.org/docs/intro/headers
  navigationOptions: ({navigation}) => ({
    headerTitle: "Users", // Create custom header title
    headerLeft: (
      <DrawerButton navigation={navigation} />
    ),
  }),
});

export default UserListNavigatior;
