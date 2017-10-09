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

const SecondDrawerLinkSecondScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      SecondDrawerLinkSecondScreen Screen
    </Text>
    <Button
      onPress={() => navigation.goBack()}
      title='back'
    />
    <Button
      onPress={() => navigation.navigate('DrawerToggle')} // hmmm - not to redux though
      title='drawer'
    />
  </View>
);

SecondDrawerLinkSecondScreen.navigationOptions = {
  title: 'SecondDrawerLinkSecondScreen',
};

export default SecondDrawerLinkSecondScreen;
