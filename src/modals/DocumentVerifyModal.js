import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';

const DocumentVerifyModal = ({modalVisible, setModalVisible, onDone}) => {


  const options = ['Aadhar', 'Pan card', 'others'];

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >  
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Documentation</Text>
          {options.map((option) => (
            <View key={option} style={styles.selectedOptionContainer}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../assets/images/document.png')} style={{marginRight: 10,}}/>
              <Text style={styles.docDetailText}>{option}</Text>
              </View>
              <Image source={require('../../assets/images/download.png')}/>

              
            </View>
          ))}
          <View style={styles.nextConatainer}>
          <TouchableOpacity style={styles.nextButton} onPress={onDone}>
                <Text style={styles.nextText}>Upload</Text>
           </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '85%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontFamily: 'Poppins',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 18,
  },
  selectedOptionContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 6,
    marginVertical: 10,
    padding: 10,
  },
  docDetailText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  docTextContaner:{
    width: '90%',
    marginVertical: 10,
  },
  doctext:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
  },
  nextConatainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButton:{
    width: 115,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 6,
  },
  nextText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: 'white'
  },
});

export default DocumentVerifyModal;