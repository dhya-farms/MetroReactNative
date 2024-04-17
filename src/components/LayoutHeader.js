import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LayoutHeader = ({onPress, gmapUrl}) => {

  const openGoogleMaps = () => {
    const url = gmapUrl;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open this URL: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (

    <View style={styles.layoutContainer}>
        <TouchableOpacity style={styles.layoutBtn} onPress={onPress}>
          <Text style={styles.layoutBtnText}>View Layout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationContainer} onPress={openGoogleMaps}>
            <MaterialIcons name="location-on" size={17} color="#707070" />
            <Text style={styles.locationText}>View Location</Text>
        </TouchableOpacity>
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