import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Platform, Button, StyleSheet, Text, View } from 'react-native';
import { registerUser } from '../actions/UserActions'
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,

} = FBSDK;

// https://github.com/facebook/react-native-fbsdk



class FBLogin extends Component {

  constructor(props)
  {
    super(props);
    // have to bind the fucntion to the Component otherwise this will be undefined.
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
  }

  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      //alert('Success fetching data: ' + result.name);

      // dispatch our register action
      var ios = 0;
      if(Platform.OS === 'ios')
      {
        ios = 1;
      }
      console.log("notiftoken "+this.props.notiftoken);
      this.props.navigation.dispatch(registerUser({
        action: "register",
        ios: ios,
        userid: result.id,
        notiftoken: this.props.notiftoken
      }));

    }
  }

  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //alert(data.accessToken.toString())

                    // Create a graph request asking for user information with a callback to handle the response.
                    const infoRequest = new GraphRequest(
                      '/me',
                      null,
                      this._responseInfoCallback,
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            //alert("logout.")
          }}/>
      </View>
    );
  }



};



const LoginScreenPresentation = ({
  navigation,
  notiftoken
}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Screen A
    </Text>
    <FBLogin navigation = { navigation } notiftoken = { notiftoken }/>
    <Text style={styles.instructions}>
      Press button to log in
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Login' })}
      title="Log in"
    />
  </View>
);
LoginScreenPresentation.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreenPresentation.navigationOptions = {
  title: 'Log In',
  headerLeft: null // no back button for login screen
};

const mapStateToProps = (state, containerProps) => { // container props is always second arg
  return {
    navigation: containerProps.navigation,
    notiftoken: containerProps.screenProps.notiftoken,
  };
}

// Container
const LoginScreen = connect(
  mapStateToProps,
  null
)(LoginScreenPresentation)


export default LoginScreen;
