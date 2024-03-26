import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const ViewReportButton = ({}) => {
  // The iconSource prop would be something like require('./path-to-your-icon.png')

  return (
    <View style={styles.viewReportContainer}>
    <TouchableOpacity onPress={()=>{}} style={[styles.button]}>
     <Text style={styles.arText}>View Report</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}} style={[styles.button, {borderWidth: 1, borderColor: '#1D9BF0',
    backgroundColor: 'white'}]}>
     <Text style={[styles.arText, {color: '#1D9BF0'}]}>Download</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    viewReportContainer:{
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: 121,
    height: 41,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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

export default ViewReportButton