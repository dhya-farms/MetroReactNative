import React, { useState } from 'react';
import { View,  Text, TouchableOpacity, ScrollView } from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CancelNextButton from '../../components/CancelNextButton';
import styles from '../../constants/styles/customerpaymentmethodstyles';




const options = ['UPI payment', 'Cash payment', 'Cheque payment', 'Demand Draft', 'Bank Transfer'];

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <View style={styles.tiContainer}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#000000" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        {...props}
      />
      </View>
    );
  };

  


const CustomerPaymentMethod = ({route, navigation}) => {
    const [paymentAmount, setPaymentAmount] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showInputFields, setShowInputFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [upiRefNo, setUpiRefNo] = useState('')
    const [chequeNo, setChequeNo] = useState('')
    const [ddNo, setDdNo] = useState('')
    const [bankRefNo, setBankRefNo] = useState('')
    const existingPaymentEntries = route.params?.existingPaymentEntries ?? [];
    const [paymentEntries, setPaymentEntries] = useState(existingPaymentEntries);
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [newPaymentEntries, setNewPaymentEntries] = useState([]);

    

    const addPaymentEntry = () => {
      const formattedDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      }).replace(/ /g, ' ').toUpperCase(); // Format like '15 NOV 2022'
    
      // For non-cash payments, create entries with reference numbers
      const newEntries = selectedOptions.filter(method => method !== 'Cash payment')
        .map(method => {
          let refNo = getReferenceNumberForMethod(method); // Implement this function
          let modeOfPay = getModeOfPayDisplayName(method);
    
          return {
            amountPaid: paymentAmount,
            modeOfPay: modeOfPay,
            referenceNumber: refNo,
            date: formattedDate,
          };
        });
    
      // Add a separate entry for cash payment if it was selected
      if (selectedOptions.includes('Cash payment')) {
        newEntries.push({
          amountPaid: paymentAmount,
          modeOfPay: 'Cash', // Set the display name for cash payment directly
          referenceNumber: '', // No reference number for cash
          date: formattedDate,
        });
      }

      setNewPaymentEntries(newEntries);

    
      // Update the state with the new entries
      setPaymentEntries(existing => [...existing, ...newEntries]);
      setShowInputFields(false);
      setPaymentProcessed(true); 
    };
    

    const getReferenceNumberForMethod = (method) => {
      switch (method) {
        case 'UPI payment': return upiRefNo;
        case 'Demand Draft': return ddNo;
        case 'Cheque payment': return chequeNo;
        case 'Bank Transfer': return bankRefNo;
        // Handle other payment methods if necessary
        default: return '';
      }
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
      if (selectedOptions.length === 0) {
        setErrorMessage("Please select a payment method.");
      } else if (selectedOptions.includes('Cash payment')) {
        addCashPaymentEntry(); // This will add the entry and show the payment details
      } else {
        // For non-cash payment options, show input fields for additional details
        setShowInputFields(true);
        setErrorMessage(""); // Clear any error message
      }
    };
    

    const handleSelectOption = (option) => {
      // If there's already a different option selected, display an error message
      if (selectedOptions.length > 0 && !selectedOptions.includes(option)) {
        setErrorMessage("Please select only one payment method.");
        return;
      }
    
      // If the same option is clicked again (to deselect), or if no option was previously selected
      if (selectedOptions.includes(option)) {
        setSelectedOptions([]); // Deselect the option
        setErrorMessage(""); // Clear any error messages
      } else {
        setSelectedOptions([option]); // Select the new option
        setErrorMessage(""); // Clear any error messages
    
        // For 'Cash payment', wait for 'Next' button press before adding entry
        // Remove or comment out the call to `addCashPaymentEntry` here
      }
    };
    
      

      const getCurrentFormattedDate = () => {
        return new Date().toLocaleDateString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric'
        }).replace(/ /g, ' ').toUpperCase();
      };

      const addCashPaymentEntry = () => {
        const formattedDate = getCurrentFormattedDate();
        const cashPaymentEntry = {
          amountPaid: paymentAmount,
          modeOfPay: 'Cash',
          referenceNumber: '', // No reference number for cash
          date: formattedDate,
        };
        setNewPaymentEntries(prevNewEntries => [...prevNewEntries, cashPaymentEntry]);
        setPaymentEntries(prevEntries => [...prevEntries, cashPaymentEntry]);
      
        // Reset states as needed
        setSelectedOptions([]);
        setShowInputFields(false);
        setPaymentProcessed(true);
        setErrorMessage("");
      };

      
    

   
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Payment Method" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      {!showInputFields && paymentProcessed  ? (
      <View style={styles.paymentEntriesContainer}>
        {paymentEntries.map((entry, index) => (
          <View key={index} style={styles.paymentEntryContainer}>
            <Text style={styles.paymentEntryTitle}>Payment - {index + 1}</Text>
            <InfoRow label="Amount Paid" value={`Rs. ${entry.amountPaid}`} />
            <InfoRow label="Mode of Pay" value={entry.modeOfPay} />
            {entry.modeOfPay !== 'Cash' && <InfoRow label="Ref Number" value={entry.referenceNumber} />}
            <InfoRow label="Date" value={entry.date} />
          </View>
        ))}
        <View style={styles.saveBtnContainer}>
          <TouchableOpacity style={styles.saveBtn}  onPress={() => {
             navigation.navigate('SO Client', {
              screen: 'SO Customer Details',
              params: {
                newPaymentEntries: newPaymentEntries,
                verificationComplete: route.params?.verificationComplete,
                completePayment: true ,
                selectedDocuments: route.params?.selectedDocuments
              },
            })
            }}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <>
      {! showInputFields ?( 
      <View style={styles.ldContainer}>
        <TouchableOpacity style={[styles.ldButton, {backgroundColor: 'white', borderColor: PRIMARY_COLOR, borderWidth: 1}]}>
            <Text style={styles.ldText}>Loan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ldButton}>
            <Text style={[styles.ldText, {color: 'white'}]}>Direct Pay</Text>
        </TouchableOpacity>
      </View> 
      ) : ( null )}
      <View style={styles.inputContainer}>
            <FloatingLabelInput
                label="Amount"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
            />
            <View style={styles.separator} />
        </View>
        {showInputFields ? (
        <View style={styles.inputFieldsContainer}>
          <View style={styles.pmTextContainer}>
             <Text style={styles.pmText}>Reference Number</Text>
          </View>
         {selectedOptions.map((method) => {
      switch (method) {
        case 'UPI payment':
          return (
            <FloatingLabelInput
              key={method}
              label={`UPI`}
              value={upiRefNo}
              onChangeText={setUpiRefNo}
              // Add additional props like value, onChangeText, etc.
            />
          );
          case 'Demand Draft':
          return (
            <FloatingLabelInput
              key={method}
              label={`DD Ref.No`}
              value={ddNo}
              onChangeText={setDdNo}
            />
          );
          case 'Cheque payment':
          return (
            <FloatingLabelInput
              key={method}
              label={`${method} Number`}
              value={chequeNo}
              onChangeText={setChequeNo}

            />
          );
          case 'Bank Transfer':
          return (
            <FloatingLabelInput
              key={method}
              label={`${method} Number`}
              value={bankRefNo}
              onChangeText={setBankRefNo}
            />
          );
        // Add cases for other payment methods as necessary
        default:
          return null;
      }
      })}
      <CancelNextButton handleNext={addPaymentEntry} isNext={false}/> 
      </View>
             ) : (
                <View style={styles.pmCheckBoxContainer}>
                    <View style={styles.pmTextContainer}>
                        <Text style={styles.pmText}>Payment Mode</Text>
                    </View>
                {options.map((option) => (
                            <TouchableOpacity
                            key={option}
                            style={styles.checkboxContainer}
                            onPress={() => handleSelectOption(option)}
                            >
                            <View style={selectedOptions.includes(option) ? styles.checkboxSelected : styles.checkbox}>
                                {selectedOptions.includes(option) && (
                                <Icon name="check" size={16} color="white" style={styles.checkboxIcon} /> // Add this line
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>{option}</Text>
                            </TouchableOpacity>
                        ))}
               {! showInputFields ?(<CancelNextButton handleNext={handleNext}/> ) : ( null )}
                </View>
            )}
            </>
    )}
      {errorMessage.length > 0 && (
              <Text style={styles.errorText}>{errorMessage}</Text>
       )}
    
    </ScrollView>
    
  );
};

export default CustomerPaymentMethod;