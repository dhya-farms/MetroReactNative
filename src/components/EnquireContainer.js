import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EnquireContainer = () => {
  return (
    <View style={styles.enContainer}>
    <TouchableOpacity style={styles.Enquirebutton}>
        <Text style={styles.enText}>Enquire Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.callButton}>
    <MaterialIcons name="phone" size={20.96} color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.msgButton}>
    <MaterialIcons name="message" size={20.96} color="white" />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    enContainer:{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    Enquirebutton:{
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 5,
        backgroundColor: '#1D9BF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    enText:{
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
    },
    callButton:{
        padding: 10,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#00DC00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgButton:{
        padding: 10,
        width: 48,
        borderRadius: 24,  
        backgroundColor: '#25A36F',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default EnquireContainer;