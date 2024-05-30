import React, { useEffect, useState } from 'react';
import { Modal, View,  Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/constantstyles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CancelNextButton from '../components/CancelNextButton';
import { fetchPaymentTypes } from '../apifunctions/paymentTypesApi';
import createPayment from '../apifunctions/createPaymentApi';
import Toast from 'react-native-toast-message';
import { useRefresh } from '../contexts/useRefreshContext';
import TimesIcon from 'react-native-vector-icons/FontAwesome5';
import { fetchStatus } from '../apifunctions/fetchStatusApi';
import { updateStatusBasedOnResponse } from '../functions/updateStatusBasedResponse';

const FloatingLabelInput = ({ label, value, onChangeText, inputStyle, containerStyle, ...props }) => {
  return (
    <View style={[styles.tiContainer, containerStyle]}>
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, inputStyle]}
      mode="outlined"
      outlineColor="#1D9BF0" // Here you set the border color
      theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black' } }}
      {...props}
    />
    </View>
  );
};


const CompletePaymentModal = ({ modalVisible, setModalVisible, effectivePropertyId, status, setStatus,
  setSiteVisitRefetch, setTokenRefetch, plot}) => {
    const { triggerDataRefresh } = useRefresh();
    const [paymentAmount, setPaymentAmount] = useState('')
    const [showInputFields, setShowInputFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentEntries, setPaymentEntries] = useState([]);
    const [newPaymentEntries, setNewPaymentEntries]= useState([])
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([])
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [refNumbers, setRefNumbers] = useState({
      upiRefNo: '',
      chequeNo: '',
      ddNo: '',
      bankRefNo: ''
    });


    useEffect(() => {
      const fetchPaymentsData = async () => {
          try {
            const fetchedPaymentMethods = await fetchPaymentTypes(null);
            console.log("payment details", fetchedPaymentMethods)
            setPaymentMethods(fetchedPaymentMethods)
          } catch (error) {
            console.error('Failed to fetch plots data:', error);
          }
      };
     
      fetchPaymentsData();
    }, []); 


    
    const handleSelect = (option) => {
      setSelectedOption(option.name_vernacular);
      setSelectedOptionId(option.id) // Set the selected option
      setIsOpen(false); // Close the dropdown
      setShowInputFields(true); // Show the input fields
      setErrorMessage(''); // Clear any previous error messages
    };

    const renderInputField = () => {
      const inputStyles = {
        inputStyle: styles.specialInput,
        containerStyle: styles.specialContainer,
      };
        
      let refKey = `${selectedOption.replace(/\s+/g, '').toLowerCase()}RefNo`; // Converts 'UPI payment' to 'upiRefNo', etc.
      if (!['Cash Payment', 'Loan'].includes(selectedOption)) {
        let refValue = refNumbers[refKey] || '';  // Ensure it defaults to an empty string if undefined
        return (
          <FloatingLabelInput
            label={`${selectedOption} Ref No`}
            value={refValue}
            onChangeText={(text) => setRefNumbers({...refNumbers, [refKey]: text})}
            {...inputStyles}
          />
        );
      }
      return null;
    };

    
    

    const handleSaveAndAddNew = () => {
      addPaymentEntry();
      
      // Reset form for new entry
      setPaymentAmount('');
      setRefNumbers({
        upiRefNo: '',
        chequeNo: '',
        ddNo: '',
        bankRefNo: ''
      });
      setSelectedOption('');
      setShowInputFields(false);
    };

    const getReferenceNumberForMethod = (method) => {
      let refKey = `${method.replace(/\s+/g, '').toLowerCase()}RefNo`;
      return refNumbers[refKey] || '';
    };
    
    const getModeOfPayDisplayName = (method) => {
      switch (method) {
        case 'UPI payment': return 'Gpay';
        case 'Cheque payment': return 'Cheque';
        case 'Demand Draft': return 'Demand Draft';
        case 'Bank Transfer': return 'Bank Transfer';
        // Add other cases as needed
        default: return method;
      }
    }; 
    
    const InfoRow = ({ label, value }) => {
      return (
        <View style={styles.infoRowContainer}>
          <Text style={styles.infoLabel}>{label}:</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      );
    };


    const handleNext = () => {
    if (paymentAmount && selectedOption) {
        addPaymentEntry();
        setShowInputFields(false);
        setPaymentProcessed(true);
      } else{
        setShowInputFields(false);
        setPaymentProcessed(true);
      }
      // This will allow displaying the payment summary
    };

    const handleSavePayments = async () => {
      let successCount = 0;
      try {
        for (const entry of paymentEntries) {
          // Construct the payment details based on the payment entry data
          const paymentDetails = {
            crm_lead_id: effectivePropertyId, // Assuming each entry has crm_lead_id; otherwise, set a default or get from elsewhere
            amount: entry.amountPaid,
            payment_method: entry.paymentId, // Ensure each payment mode text has a corresponding ID that the API can understand
            payment_for: 2, // Constant enum value
            reference_number: (entry.modeOfPay !== 'Cash Payment' && entry.modeOfPay !== 'Loan') ? entry.referenceNumber : ''
          };
    
          // Call the API to create the payment
          const response = await createPayment(paymentDetails);
          console.log(`Payment for ${entry.amountPaid} created successfully:`, response);
          successCount += 1;
        }

        if (successCount === paymentEntries.length) {
          setModalVisible(false)
          Toast.show({
            type: 'success',
            text1: 'All payments updated successfully',
            visibilityTime: 2000,
        });

        const statusResponse = await fetchStatus(effectivePropertyId);
          if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
            const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus, plot);
            setStatus(updatedStatus);
            setSiteVisitRefetch(true)
            setTokenRefetch(true)
            triggerDataRefresh();
          } 
      }
    
      } catch (error) {
        console.error('Error while creating payments:', error);
        // Handle errors, possibly show an error message to the user
      }
    };
    
    
    

      const getCurrentFormattedDate = () => {
        return new Date().toLocaleDateString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric'
        }).replace(/ /g, ' ').toUpperCase();
      };
      const addPaymentEntry = () => {
        const formattedDate = getCurrentFormattedDate();
        let newEntry = {
          amountPaid: paymentAmount,
          modeOfPay: getModeOfPayDisplayName(selectedOption),
          referenceNumber: (selectedOption !== 'Cash Payment' && selectedOption !== 'Loan') ? getReferenceNumberForMethod(selectedOption) : '',
          date: formattedDate,
          paymentId: selectedOptionId,
        };

        console.log("new", newEntry)
      
        setPaymentEntries(prev => [...prev, newEntry]);
        setNewPaymentEntries([newEntry]);
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
              <TimesIcon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Payment</Text>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {!showInputFields && paymentProcessed  ? (
      <View style={styles.paymentEntriesContainer}>
        {paymentEntries.map((entry, index) => (
          <View key={index} style={styles.paymentEntryContainer}>
            <Text style={styles.paymentEntryTitle}>Payment - {index + 1}</Text>
            <InfoRow label="Amount Paid" value={`Rs. ${entry.amountPaid}`} />
            <InfoRow label="Mode of Pay" value={entry.modeOfPay} />
            {(entry.modeOfPay !== 'Cash Payment' && entry.modeOfPay !== 'Loan') && 
            <InfoRow label="Ref Number" value={entry.referenceNumber} />
             }
            <InfoRow label="Date" value={entry.date} />
          </View>
        ))}
        <View style={styles.saveBtnContainer}>
          <TouchableOpacity style={styles.saveBtn}  onPress={handleSavePayments}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <>
      <View style={styles.inputContainer}>
            <FloatingLabelInput
                label="Amount"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
            />
            <View style={styles.separator} />
        </View>
                <View style={styles.pmCheckBoxContainer}>
                    <View style={styles.pmTextContainer}>
                        <Text style={styles.pmText}>Payment Mode</Text>
                    </View>
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
                          <Text style={styles.title}>{selectedOption || 'Choose Payment Mode'}</Text>
                          <View style={styles.dropdownContainer}>
                          <Icon name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} style={styles.dropIcon}/>
                          </View>
                        </TouchableOpacity>
                        {isOpen && (
                          <ScrollView style={styles.optionsContainer} contentContainerStyle={{justifyContent: 'center'}}>
                            {paymentMethods.map((option, index) => (
                              <TouchableOpacity key={option.id} style={styles.option} onPress={() => handleSelect(option)}>
                                <Text style={styles.optionText}>{option.name_vernacular}</Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                      {showInputFields && renderInputField()}
                      <CancelNextButton handleNext={handleNext}  handleSaveAndAddNew={handleSaveAndAddNew}/>
                      {errorMessage.length > 0 && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                      )}
                </View>
            </>
        )}
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  modalView: {
    width: '90%',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
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
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  ldContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  ldButton:{
    backgroundColor: PRIMARY_COLOR,
    width: 137,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  ldText:{
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500'
  },
  separator: {
    height: 1,
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 3,
  },
  pmCheckBoxContainer:{
    width: '90%',
    marginVertical: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,

  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#1D9BF0',
    borderRadius: 6,
    marginRight: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxSelected: {
    width: 23,
    height: 23,
    backgroundColor: '#1D9BF0',
    borderRadius: 6,
    marginRight: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxLabel:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,  
  },
  inputContainer:{
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  input: {
    flex: 1,
    height: 54, // Set the height
    backgroundColor: 'white', // Set the background color
    marginVertical: 2,
    marginRight: 10,
    borderColor: '#1D9BF0',
    borderRadius: 4,
    // Add a bottom margin
  },

  specialInput: {
    flex: 1,
    height: 30, // Set the height
    backgroundColor: 'white', // Set the background color
    marginVertical: 30,
    marginRight: 10,
    borderColor: '#1D9BF0',
    borderRadius: 4,
  },

  tiContainer:{
    width: '90%', 
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  specialContainer: {
    width: '100%', 
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  pmTextContainer:{
    width: '90%',
    marginVertical: 5,
  },
  pmText:{
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
  },
  inputFieldsContainer:{
    width: '90%', 
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  paymentEntriesContainer:{
    width: '95%',
    marginVertical: 10,
  },
  paymentEntryContainer:{
    width: '100%', 
    padding: 7, 
    borderColor: SECONDARY_COLOR, 
    borderWidth: 1, 
    borderRadius: 6,
    marginVertical: 20,
  },
  paymentEntryTitle:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#424242',
  },
  infoRowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items on opposite ends
    alignItems: 'center', // Center items vertically
    padding: 10,
    marginHorizontal: 10,
  },
  infoLabel: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    color: '#424242',
    width: '45%', // Fixed width for labels
  },
  infoValue: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#424242',
    textAlign: 'left', // Align text to the right
    width: '55%', // Remaining width for values
  },
  saveBtnContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveBtn:{
    width: 115,
    height: 37,
    borderRadius: 4,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveBtnText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: '#fff'
  },
  dropdown: {
    borderRadius: 4,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#1D9BF0',
    borderWidth: 1,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    borderRadius: 5
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center'
  },
  icon: {
    fontSize: 16,
  },
  optionsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // Set a maximum height for the dropdown options to scroll
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
    padding: 5
    
   
  },
  tickIcon:{
    color: '#1D9BF0',
    marginRight: 5,
  },
  dropdownContainer:{
    width: 30,
    height: 30,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  dropIcon:{
    width: 10,
    color: 'white'
  },
  optionText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  // ... Add other styles you might need
});

export default CompletePaymentModal