import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { SECONDARY_COLOR } from '../constants/constantstyles/colors';

const ApproveButton = ({onApprovePress, onRejectPress, disabled, handleEdit}) => {
  // The iconSource prop would be something like require('./path-to-your-icon.png')

  return (
    <View style={styles.approveRejectContainer}>
    <TouchableOpacity 
        onPress={onApprovePress} 
        style={[styles.button, disabled ? styles.disabledButton : null]} // Apply disabled style conditionally
        disabled={disabled}
      >
        <Text style={[styles.arText, {color: disabled ? '#C4C4C4' : 'white'}]}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onRejectPress} 
        style={[styles.button, styles.rejectButton, disabled ? styles.disabledButton : null]} // Apply disabled style conditionally
        disabled={disabled}
      >
        <Text style={[styles.arText, {color: disabled ? '#C4C4C4' : 'white'}]}>Reject</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit}>
      <Text style={[styles.arText, {color: 'black'}]}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  approveRejectContainer:{
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 84,
    paddingVertical: 10, // Use your app's color scheme
    borderRadius: 4, // Rounded corners
    marginVertical: 10, // Space between buttons
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: 'white'
  },
  text: {
    flex: 1, // Take up as much space as possible to center the text
    textAlign: 'center', // Center the text
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
  },
  disabledButton: {
    opacity: 0.5, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR // Reduced opacity for disabled appearance
  }
});

export default ApproveButton