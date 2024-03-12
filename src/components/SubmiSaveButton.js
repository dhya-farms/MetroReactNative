import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const SubmitSaveButton = ({ onPress, text1, text2 }) => {
  return (
    <View style={styles.submitSaveContainer}>
    <TouchableOpacity style={styles.SSbutton} onPress={onPress}>
      <Text style={styles.text}>{text1}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.SSbutton, {backgroundColor: 'white', borderWidth: 1,
    borderColor: '#1D9BF0' }]} onPress={onPress}>
      <Text style={[styles.text, {color: '#1D9BF0'}]}>{text2}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitSaveContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  SSbutton: {
    backgroundColor: '#1D9BF0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,// Centers the button within its container
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default SubmitSaveButton;
