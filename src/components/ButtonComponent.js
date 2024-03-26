import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';
const ButtonComponent = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 17,
    paddingHorizontal: 35,
    borderRadius: 10,
    margin: 20,
    width: '85%',
    alignSelf: 'center', // Centers the button within its container
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default ButtonComponent;
