import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';

const CancelNextButton = ({handleNext, handleSaveAndAddNew}) => {

  return (
    <View style={[styles.cnbtnContainer]}>
        <TouchableOpacity style={[styles.cnButton, {backgroundColor: 'white', borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={()=>{}}>
          <Text style={[styles.cnText, {color: '#1D9BF0'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cnButton} onPress={handleNext}>
          <Text style={[styles.cnText, {fontSize: 10}]}>Save & Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cnButton, {backgroundColor: 'white', borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={handleSaveAndAddNew}>
          <Text style={[styles.cnText,{color: '#1D9BF0', fontSize: 10}]}>Save & Add New</Text>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    cnbtnContainer:{
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40,
      },
      cnButton:{
        backgroundColor: PRIMARY_COLOR,
        width: 87,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: 5,
      },
      cnText:{
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
      },
});

export default CancelNextButton;