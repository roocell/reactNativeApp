import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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

const SecondDrawerLinkFirstScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      SecondDrawerLinkFirstScreen Screen
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Second' })} // just dispatches to redux (reducer does the actual work)
      title='next'
    />
    <Button
      onPress={() => navigation.navigate('DrawerToggle')} // hmmm - not to redux though - does it need to?
      title='drawer'
    />
  </View>
);

SecondDrawerLinkFirstScreen.navigationOptions = {
  title: 'SecondDrawerLinkFirstScreen',
};

export default SecondDrawerLinkFirstScreen;
