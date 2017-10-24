/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 // NOTE: I adding an environment variable to disable some annoying logs
 //       might want to re-add them in the future?
 // https://stackoverflow.com/questions/44081674/react-native-connection-has-no-connection-handler-error-meaning

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './App.js'
import NotificationsIOS from 'react-native-notifications';
import notificationTokenReceived from './actions/UserActions'

export default class reactNativeApp extends Component {

  state = {
    deviceToken: null
  }
  constructor() {
    super();
		NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));

    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));


		NotificationsIOS.requestPermissions();
    NotificationsIOS.consumeBackgroundQueue();
	}

  onNotificationReceivedForeground(notification) {
  	console.log("Notification Received - Foreground", notification);
    if (notification._type) // this will avoid the empty one thats showing up at the start.
      alert(JSON.stringify(notification));
  }

  onNotificationReceivedBackground(notification) {
  	console.log("Notification Received - Background", notification);
  }

  onNotificationOpened(notification) {
  	console.log("Notification opened by device user", notification);
  }

	onPushRegistered(deviceToken) {
		console.log("Device Token Received", deviceToken);

    // need to save the token and pass it down as a prop
    // setting it here will trigger a re-render
    this.setState({deviceToken: deviceToken});

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

    // that's ok still want to run simulator though
    //if (error.code == 3010)
    //  alert(error.localizedDescription);
	}

	componentWillUnmount() {
  	// prevent memory leaks!
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));

    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
	}

  render() {

    // test with local notifications
    let localNotification = NotificationsIOS.localNotification({
    	alertBody: "Local notificiation!",
    	alertTitle: "Local Notification Title",
    	soundName: "chime.aiff",
        silent: false,
    	category: "SOME_CATEGORY",
    	userInfo: { }
    });

    return (
      <App  notiftoken={this.state.deviceToken} />
    );
  }
}

AppRegistry.registerComponent('reactNativeApp', () => reactNativeApp);
