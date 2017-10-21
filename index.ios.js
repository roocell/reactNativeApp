/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './App.js'
import NotificationsIOS from 'react-native-notifications';

export default class reactNativeApp extends Component {
  constructor() {
    super();
		NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
		NotificationsIOS.requestPermissions();
	}

	onPushRegistered(deviceToken) {
		console.log("Device Token Received", deviceToken);

    NotificationsIOS.checkPermissions().then((currentPermissions) => {
        console.log('Badges enabled: ' + !!currentPermissions.badge);
        console.log('Sounds enabled: ' + !!currentPermissions.sound);
        console.log('Alerts enabled: ' + !!currentPermissions.alert);
    });
	}

	onPushRegistrationFailed(error) {
		// For example:
		//
		// error={
		//   domain: 'NSCocoaErroDomain',
		//   code: 3010,
		//   localizedDescription: 'remote notifications are not supported in the simulator'
		// }
		console.error(error);
	}

	componentWillUnmount() {
  		// prevent memory leaks!
  		NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
	}

  render() {
    return (
      <App  />
    );
  }
}

AppRegistry.registerComponent('reactNativeApp', () => reactNativeApp);
