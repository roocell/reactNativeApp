import React from 'react';
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

// <FlatList
//   data={[{key: 'a'}, {key: 'b'}]}
//   renderItem={({item}) => (
//          <ListItem
//              title={item.key}
//          />
//   )}
// />


export const UserListRender = ( {
  users,
  navigation
}) => (
  <List style={{flex: 1}}>
  <FlatList
    data={users}
    renderItem={({item}) => (
           <ListItem
               title={item.name.first}
           />
    )}
    keyExtractor={item => item.email}
  />
  </List>
);



const mapStateToProps = (state, containerProps) => {
  console.log(containerProps.screenProps.users.length+" users");
  return {
    users: containerProps.screenProps.users,
    navigation: containerProps.navigation
  }
};
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
)(UserListRender);

const styles = StyleSheet.create({

});


export default UserList;
