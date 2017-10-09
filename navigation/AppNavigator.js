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

const AppWithNavigationContainer = ({ dispatch, nav, markers }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    screenProps={  // this is how you pass custom props through the navigator to the screens
      markers = {markers}
    }
    />
);

AppWithNavigationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  markers: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  nav: state.nav,
  markers: ownProps.markers
});

export default connect(mapStateToProps)(AppWithNavigationContainer);
