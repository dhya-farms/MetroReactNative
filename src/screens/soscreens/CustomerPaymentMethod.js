import React, { useEffect, useState } from 'react';
import { View,  Text, TouchableOpacity, ScrollView } from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CancelNextButton from '../../components/CancelNextButton';
import styles from '../../constants/styles/customerpaymentmethodstyles';
import { fetchPaymentTypes } from '../../apifunctions/paymentTypesApi';
import createPayment from '../../apifunctions/createPaymentApi';
import Toast from 'react-native-toast-message';
import { useRefresh } from '../../contexts/useRefreshContext';





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


  


const CustomerPaymentMethod = ({route, navigation}) => {
    const crmId = route.params?.crmId
    const { triggerDataRefresh } = useRefresh();
    const [paymentAmount, setPaymentAmount] = useState('')
    const [showInputFields, setShowInputFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const existingPaymentEntries = route.params?.existingPaymentEntries ?? [];
    const [paymentEntries, setPaymentEntries] = useState(existingPaymentEntries);
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([])
    const [newPaymentEntries, setNewPaymentEntries] = useState([]);
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
            crm_lead_id: crmId, // Assuming each entry has crm_lead_id; otherwise, set a default or get from elsewhere
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
          Toast.show({
            type: 'success',
            text1: 'All payments updated successfully',
            visibilityTime: 2000,
        });
          
        setTimeout(() => {
          triggerDataRefresh();
          navigation.navigate('SO Client', {
            screen: 'SO Customer Details',
          });
        }, 2000); // Navigate after 2 seconds
  
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
    <View style={styles.mainContainer}>
      <HeaderContainer title="Payment Method" 
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={()=>{navigation.goBack()}}/>
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
    
  );
};

export default CustomerPaymentMethod;