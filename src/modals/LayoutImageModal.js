import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity,} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure this library is installed

const LayoutImageModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
          >
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
          
          <Image source={require('../../assets/images/layoutImage.png')} style={styles.imageStyle} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Your existing styles...
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative', // Needed to position the close button absolutely
  },
  imageStyle: {
    width: '100%',
    resizeMode: 'stretch'
  },
  closeButton: {
    width: 30,
    height: 30,
    position: 'absolute', // Position the close button absolutely
    top: 5, // Distance from the top of the modal
    right: 5, // Distance from the right of the modal
    zIndex: 3,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
    // Makes it easier to tap
    
  },
});

export default LayoutImageModal;
