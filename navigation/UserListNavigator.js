import { React } from 'react';
import { StackNavigator } from 'react-navigation';
import UserList from '../components/UserList';

const UserListNavigatior = StackNavigator({
  UserList: { screen: UserList},
}, {
  initialRouteName: 'UserList',
  navigationOptions: ({navigation}) => ({
    headerTitle: "Users", // Create custom header title
  }),
});

export default UserListNavigatior;
