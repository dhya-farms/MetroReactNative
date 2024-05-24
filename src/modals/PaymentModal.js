import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';
import CustomTokenDropdown from '../components/CustomTokenDropdown';

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        {...props}
      />
    );
  };

const PaymentModal = ({ modalVisible, setModalVisible, onDone, selectedPaymentMethod, handlePaymentMethodSelect, paymentMethods,
  paymentDropDownVisible, setPaymentDropdownVisible}) => {
  // State for input fields
  const [payAmount, setPayAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [payType, setPayType] = useState('');
  const [refno, setRefNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDonePress = () => {
    setErrorMessage('');

    // Check if all necessary inputs are filled
    if (!payAmount || !desc || !selectedPaymentMethod || (selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan' && !refno)) {
      setErrorMessage('Please fill all the details.');
      return;
    }

    // Prepare the data object to send to onDone callback
    const paymentDetails = {
      payAmount,
      desc,
      payType: selectedPaymentMethod,
      ...(selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan' && { refno })
    };

    onDone(paymentDetails);
    setModalVisible(false);
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Payment</Text>
          <FloatingLabelInput
            label="Payment Amount"
            value={payAmount}
            onChangeText={setPayAmount}
          />
          <FloatingLabelInput
            label="Description(Optional)"
            value={desc}
            onChangeText={setDesc}
          />
          <View style={{width: '100%'}}>
            <CustomTokenDropdown
                label="Payment Type"
                selectedValue={selectedPaymentMethod}
                onSelect={handlePaymentMethodSelect}
                options={paymentMethods}
                visible={paymentDropDownVisible}
                setVisible={setPaymentDropdownVisible}
                paymentMethod={true}
                customInputStyle={{
                  width: '100%',
                  height: 50, // Specific height for this context
                  backgroundColor: 'white',
                  marginRight: 0,
                  marginVertical: 2, // Specific background color for this context 
                }}
            />
          </View>
          {(selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan') && (
            <FloatingLabelInput
              label="Reference Number"
              value={refno}
              onChangeText={setRefNo}
            />
          )}
           {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display the error message
          )}
          <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
            <Text style={styles.doneButtonText}>Sumbit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  modalView: {
    width: '85%',
    margin: 20,
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
    position: 'relative' ,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20, // Add a bottom margin
  },

  doneButton: {
    width: 154,
    backgroundColor: "#1D9BF0",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginVertical: 20,
    paddingVertical: 18,
  },
  doneButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  errorText: {
    color: 'red', // Example style for error message
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  // ... Add other styles you might need
});

export default PaymentModal