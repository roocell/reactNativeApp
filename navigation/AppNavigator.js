import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';

import MainMap from '../components/MainMap';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainMap },
  Profile: { screen: ProfileScreen },
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
