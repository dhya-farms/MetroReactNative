import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';

const CancelNextButton = ({handleNext, isNext=true}) => {

  return (
    <View style={[styles.cnbtnContainer]}>
        <TouchableOpacity style={[styles.cnButton, {backgroundColor: 'white', borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={()=>{}}>
          <Text style={[styles.cnText, {color: '#1D9BF0'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cnButton} onPress={handleNext}>
          <Text style={styles.cnText}>{isNext ? "Next": "Save"}</Text>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    cnbtnContainer:{
        width: '90%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40,
      },
      cnButton:{
        backgroundColor: PRIMARY_COLOR,
        width: 136,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: 5,
      },
      cnText:{
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
      },
});

export default CancelNextButton;