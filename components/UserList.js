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
import { fetchUsers } from '../actions/UserActions'

// https://github.com/react-native-training/react-native-elements
// List & ListItem make the cells pretty
import { List, ListItem } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// FlatList
// https://facebook.github.io/react-native/blog/2017/03/13/better-list-views.html
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// https://dev-blog.apollodata.com/loading-data-into-react-natives-flatlist-9646fa9a199b

// keyExtractor should be a property unique to each item - it's used for for tracking items
// and aid in the efficiency of the list

// Flex Dimensions
// https://facebook.github.io/react-native/docs/height-and-width.html


export const UserListRender = ( {
  users,
  navigation
}) => (
  <List style={{flex: 1}}>
  <FlatList
    data={users}
    renderItem={({item}) => (
           <ListItem
               title={item.userid}
           />
    )}
    keyExtractor={item => item.id}
  />

  <Icon
    name="reorder-horizontal"
    size={30}
    color="white"
    style={{ left:10, top:25, position: 'absolute' }}
    onPress={() => navigation.navigate('DrawerToggle')}
  />

  </List>
);

// we're going to define our presentation component a little different Here
// we'll define a wrapper container which will let us access the lifecycle methods
// so we can access the componentDidMount() to dispatch an action
// like here https://github.com/JamieDixon/react-lifecycle-component
class UserListRenderWrapper extends Component {
	componentDidMount() {
		this.props.dispatch(fetchUsers());
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
// const mapDispatchToProps = (dispatch, containerProps) => {
//   return  {
//      dispatch: null
//     }
//   };
// };

// Container
const UserList = connect(
  mapStateToProps,
  null
)(UserListRenderWrapper);

const styles = StyleSheet.create({

});

export default UserList;
