import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RemarkModal = ({ visible, onClose, onSubmit, category }) => {
  const [remarks, setRemarks] = useState('');

  const handleRemarkSubmit = () => {
    onSubmit(category); // Pass the category to the onSubmit function
    setRemarks(''); // Optionally reset remarks if needed
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.sortdropContainer}> 
            <Text style={styles.sortbyText}>Remarks(optional)</Text>
            <MaterialIcons name="close" size={15} color="#1D9BF0"  onPress={onClose}/>
          </View>
         <View style={styles.separator} />
            <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={3}
            onChangeText={(text) => setRemarks(text)}
            value={remarks}
            placeholder="Type your query here"
           />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRemarkSubmit}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    // ... your other styles ...
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width: 281,
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 1,
      borderColor: '#C4C4C4',
    },
    input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      width: 300,
    },
    submitButton: {
      backgroundColor: "#1D9BF0",
      width: 80,
      borderRadius: 4,
      paddingVertical: 4,
      elevation: 2
    },
    textStyle: {
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
      color: 'white'
    },
    sortdropContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
      },
      sortbyText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
      },
      separator: {
        height: 1,
        backgroundColor: '#C4C4C4',
        alignSelf: 'center',
        width: '100%',
        marginVertical: 10,
      },
      textArea: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 6,
        paddingVertical: 18,
        fontSize: 16,
        marginBottom: 30,
        width: 221,
        
      }
});

export default RemarkModal