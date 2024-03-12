import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LayoutHeader = () => {
  return (

    <View style={styles.layoutContainer}>
        <TouchableOpacity style={styles.layoutBtn} onPress={{}}>
          <Text style={styles.layoutBtnText}>View Layout</Text>
        </TouchableOpacity>
        <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={17} color="#707070" />
            <Text style={styles.locationText}>View Location</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  layoutBtn:{
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  layoutBtnText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
  },
  locationContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    color: '#707070',
    marginLeft: 3,
    textAlign: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#C4C4C4',
    width: '100%',
    marginVertical: 16,
  },
});

export default LayoutHeader;