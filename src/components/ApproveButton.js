import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const ApproveButton = ({onApprovePress, onRejectPress}) => {
  // The iconSource prop would be something like require('./path-to-your-icon.png')

  return (
    <View style={styles.approveRejectContainer}>
    <TouchableOpacity onPress={onApprovePress} style={[styles.button]}>
     <Text style={styles.arText}>Approve</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onRejectPress} style={[styles.button, {borderWidth: 1, borderColor: '#1D9BF0',
    backgroundColor: 'white'}]}>
     <Text style={[styles.arText, {color: '#1D9BF0'}]}>Reject</Text>
    </TouchableOpacity>
    <Text style={styles.editText}>Edit</Text>
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
  editText:{
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: '#1D9BF0',
  }
});

export default ApproveButton