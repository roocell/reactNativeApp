import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainDrawerNavigator from '../navigation/MainDrawerNavigator';

//import MainMap from '../components/MainMap';

// notes for react-navigation with redux integration
// https://reactnavigation.org/docs/guides/redux

export const AppNavigator = StackNavigator({
  // the Top Level DrawerNavigator
  // which has a default StackNavigator inside
  // and all drawer links are also StackNavigators
  Main: {
    screen: MainDrawerNavigator,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },


  // a screen to appear over everything to have the user log in
  Login: {
    screen: LoginScreen,

    // or navigationOptions can be set in the object itself.
    navigationOptions: ({navigation}) => ({
      title: "login"
    }),
   },
});

// this might be better than screenProps
// https://stackoverflow.com/questions/44248403/passing-props-with-screen-option-in-drawernavigator

const AppWithNavigationContainer = ({ dispatch, nav, notiftoken }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    // this is how you pass custom props through the navigator to the screens
    screenProps={  notiftoken: notiftoken} }
    />
);

AppWithNavigationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  nav: state.nav,

});

export default connect(mapStateToProps)(AppWithNavigationContainer);
