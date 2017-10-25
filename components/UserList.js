import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';
import { fetchUsers, pingUserAction } from '../actions/UserActions'

// https://github.com/react-native-training/react-native-elements
// List & ListItem make the cells pretty
import { List, ListItem } from "react-native-elements";


// FlatList
// https://facebook.github.io/react-native/blog/2017/03/13/better-list-views.html
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// https://dev-blog.apollodata.com/loading-data-into-react-natives-flatlist-9646fa9a199b

// keyExtractor should be a property unique to each item - it's used for for tracking items
// and aid in the efficiency of the list

// Flex Dimensions
// https://facebook.github.io/react-native/docs/height-and-width.html


// FlatList and PureComponent - for perf optimization and avoiding bugs.
// https://facebook.github.io/react-native/docs/flatlist.html


// https://stackoverflow.com/questions/37609644/setstate-cannot-update-during-an-state-transition-react
// NOTE on using a reference to a function for onPress
// ie - onPress={() => {pingUser(item.userid)}}
// not - onPress = { pingUser(item.userid)}
// the latter will actaully execute the fuction on the render()
// as opposed to running when onPress actually happens

export const UserListRender = ( {
  users,
  navigation,
  pingUser
}) => (
  <List style={{flex: 1}}>
  <FlatList
    data={users}
    renderItem={({item}) => (
           <ListItem
               title={item.userid}
               onPress={() => {pingUser(item.userid)}}
               hideChevron = {true}
           />
    )}
    keyExtractor={item => item.id}
  />


  </List>
);

// we're going to define our presentation component a little different Here
// we'll define a wrapper container which will let us access the lifecycle methods
// so we can access the componentDidMount() to dispatch an action
// like here https://github.com/JamieDixon/react-lifecycle-component
class UserListRenderWrapper extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}
	render() {
    return (<UserListRender {...this.props} />);
	}
}

// nice little exmplanation of container components, presentation components, etc
// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect

const mapStateToProps = (state, containerProps) => {
  return {
    users: state.user.userList.users,
    navigation: containerProps.navigation  // navigation is passed as a prop so we can activate the drawer
  }
};

// This will be implemented when we do something like pull-to-refresh
const mapDispatchToProps = (dispatch, containerProps) => {
  return  {
    pingUser: (dest_userid) => {
      dispatch(pingUserAction(dest_userid))
    },
    fetchUsers: () => {
      dispatch(fetchUsers())
    }
  };
};

// Container
const UserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListRenderWrapper);

const styles = StyleSheet.create({

});

export default UserList;
