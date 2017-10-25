import React from 'react';
//import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerButton = ({ navigation }) => (
  // <TouchableOpacity
  //   onPress={() => navigation.navigate('DrawerOpen')}
  //   style={styles.buttonStyle}
  // >
  <Icon
    name="reorder-horizontal"
    size={30}
    color="white"
    style={{ left:10, top:10, position: 'absolute' }}
    onPress={() => navigation.navigate('DrawerToggle')}
  />
  //</TouchableOpacity>
);

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton;
