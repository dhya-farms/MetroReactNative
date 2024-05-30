import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import styles from '../../constants/styles/customertokenadvancestyles';
import CustomTokenDropdown from '../../components/CustomTokenDropdown';
import { fetchPaymentTypes } from '../../apifunctions/paymentTypesApi';
import createPayment from '../../apifunctions/createPaymentApi';
import { useRefresh } from '../../contexts/useRefreshContext';


const FloatingLabelInput = ({ label, value, onChangeText, editable = false, ...props }) => {
    return (
      <View style={styles.tiContainer}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { fontFamily: 'Poppins', fontSize: 14, fontWeight: '500' }]}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{
          colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black' },
          fonts: { regular: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 12 } } // Custom font family and weight
        }}
        editable={editable}
        {...props}
      />
      </View>
    );
  };


const CustomerTokenAdvance = ({route, navigation}) => {
  const { triggerDataRefresh } = useRefresh();
  const customerDetails = route.params?.customerDetails
  const plotInfo = route.params?.plotInfo
  const isNewPayment = route.params?.isNewPayment
  const [selectedPaymentMethod, setSelectedPaymentMethod]= useState('')
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedPaymentId, setSelectedPaymentId]= useState(null)
  const [plot, setPlot] = useState({
    propertyName: customerDetails?.property?.name || '',
    propertyType: customerDetails?.property?.property_type?.name_vernacular || '',
    phaseNumber: customerDetails?.phase?.phase_number?.toString() || '',
    plotNumber: plotInfo.plot_number,
    sqft: plotInfo.area_size,
    is_corner_site: plotInfo.is_corner_site,
  });
   const [totalAmount, setTotalAmount] = useState(plotInfo.total_amount.toString());
   const [amountPaid, setAmountPaid] = useState('');
   const [referenceNumber, setReferenceNumber] = useState('');
   const [balanceAmount, setBalanceAmount] = useState('')
   const [currentView, setCurrentView] = useState('form');
   const [errorMessage, setErrorMessage] = useState('')
   const [successMessage, setSuccessMessage]= useState('')
   const [paymentDropDownVisible, setPaymentDropdownVisible] = useState(false)



   useEffect(() => {
    const total = parseFloat(totalAmount) || 0; // Default to 0 if totalAmount is not a number
    const paid = parseFloat(amountPaid) || 0;   // Default to 0 if amountPaid is not a number
    let balance = total - paid;
    
    if (paid > total) {
        balance = 0; 
        setErrorMessage
    } else {
        setErrorMessage(''); 
    }

    setBalanceAmount(balance.toFixed(2)); 
    }, [amountPaid, totalAmount]);
   

  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod.name_vernacular)
    setSelectedPaymentId(paymentMethod.id);
    console.log(paymentMethod.id)
    console.log(paymentMethod.name_vernacular)
  };

   useEffect(() => {
    // Check if summaryData is provided when navigated to this screen
    if (route.params?.summaryData) {
      const { summaryData } = route.params;
      setPlot(previousPlot => ({ ...previousPlot, ...summaryData.plot }));
      setReferenceNumber(summaryData.referenceNumber);
      setTotalAmount(summaryData.totalAmount);
      setAmountPaid(summaryData.amountPaid);
      setSelectedPaymentMethod(summaryData.paymentMethod);
      setBalanceAmount(summaryData.balanceAmount);
  
      // Set current view to 'summary'
      setCurrentView('summary');
    }
  }, [route.params]);

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


  const validatePlots = () => {
    console.log(plot.plotNumber)
    return  plot.propertyName && plot.propertyType && plot.phaseNumber && 
      plot.plotNumber && plot.sqft
  };

  const validatePaymentDetails = () => {
    // Ensure all required fields are filled and the paid amount does not exceed the total amount
    const total = parseFloat(totalAmount) || 0;
    const paid = parseFloat(amountPaid) || 0;
    if (total < paid) {
        setErrorMessage('Your paid amount exceeds the total amount. Please adjust the amount paid.');
        return false;
    }
    return totalAmount && amountPaid && selectedPaymentMethod && balanceAmount;
  };



  const handleNextFromForm = () => {
    if (validatePlots()) {
      // If validation passes, navigate to the next view
      setCurrentView('summary');
      setErrorMessage('')
      // Make sure to reset or hide any error message state here
    } else {
      // If validation fails, set an error message state that you can display
      // For example, if you have a state called `errorMessage`, set it like this:
      setErrorMessage("Please fill all the fields for each plot.");
    }
  };

  // Function to handle "Next" click from the summary view to the payment summary
  const handleNextFromSummary = () => {
    if (validatePaymentDetails()) {
        setCurrentView('paymentSummary');
        setErrorMessage(''); 
    } else {
        if (!errorMessage) {
            setErrorMessage("Please fill all the payment details correctly.");
        }
     }
 };
  const handleCancel = ()=>{
    navigation.goBack();
  }


  const InfoRow = ({ label, value }) => {
    return (
      <View style={styles.infoRowContainer}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  const handleDone = async () => {
    const paymentDetails = {
        crm_lead_id: customerDetails.id, 
        amount: parseFloat(amountPaid),
        payment_method: selectedPaymentId,
        payment_for: 1,
    };

    if (selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan') {
        paymentDetails.reference_number = referenceNumber;
    }

    try {
        await createPayment(paymentDetails);
        setSuccessMessage('Token Advance Completed Successfully');
        setTimeout(() => {
            triggerDataRefresh();
            setSuccessMessage('');  // Clear the success message
            navigation.navigate("SO Client", { 
              screen: "SO Customer Details",
          }); // Navigate after success
        }, 2000);  // Delay of 2 seconds
    } catch (error) {
        console.error('Failed to process payment details:', error);
        setErrorMessage('Failed to update details. Please try again.');
    }
  };

    
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Token Advance" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {currentView === 'form' && (
        <View  style={styles.plotContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.plotText}>Plot-1</Text>
            <FloatingLabelInput
                label="Property Name"
                value={plot.propertyName}
            />
            <FloatingLabelInput
                label="Property Type"
                value={plot.propertyType}
            />
            <FloatingLabelInput
                label="Phase Number"
                value={plot.phaseNumber}
            />
            <FloatingLabelInput
                label="Plot Number"
                value={plot.plotNumber.toString()}
            />
            <FloatingLabelInput
                label="Sq.ft"
                value={plot.sqft}
            />
          <View style={styles.radioButtonContainer}>
          <Text style={styles.radioButtonText}>Is plot in corner: {plot.is_corner_site ? "YES": "NO"}</Text>
        </View>
        </View>
        </View>
      )}

      {currentView === 'summary' && (
        <>
         <View style={styles.summaryContainer}>
          <View style={styles.pnContainer}>
            <Text style={[styles.plotText, {marginLeft: 0}]}>Plot Details</Text>
          </View>
            <FloatingLabelInput
                label="Property Name"
                value={plot.propertyName}
            />
            <FloatingLabelInput
                label="Property Type"
                value={plot.propertyType}
            />
            <FloatingLabelInput
                label="Phase Number"
                value={plot.phaseNumber}
            />
            <FloatingLabelInput
                label="Plot Number"
                value={plot.plotNumber.toString()}
            />
            <FloatingLabelInput
                label="Sq.ft"
                value={plot.sqft}
            />
          <View style={styles.radioButtonContainer}>
          <Text style={styles.radioButtonText}>Is plot in corner: {plot.is_corner_site ? "YES": "NO"}</Text>
          </View>
        </View>
          <View style={styles.paymentDetailsContainer}>
          <Text style={[styles.plotText]}>Payment Details</Text>
          <FloatingLabelInput
            label="Total Amount"
            value={totalAmount}
            editable = {false}
          />
          <FloatingLabelInput
            label="Amount Paid"
            value={amountPaid}
            onChangeText={setAmountPaid}
            editable = {true}
          />
          <View style={{width: '90%'}}>
            <CustomTokenDropdown
                label="Payment Method"
                selectedValue={selectedPaymentMethod}
                onSelect={handlePaymentMethodSelect}
                options={paymentMethods}
                visible={paymentDropDownVisible}
                setVisible={setPaymentDropdownVisible}
                paymentMethod={true} 
                customInputStyle={{
                  flex: 1,
                  height: 34, // Set the height
                  backgroundColor: 'white', // Set the background color
                  marginVertical: 2,
                  marginRight: 10,
                  borderColor: '#1D9BF0',
                  borderRadius: 4,
              }}// Pass the fetched plots data as options
              />
          </View>
          {selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan' && (
              <FloatingLabelInput
                label="Reference Number"
                value={referenceNumber}
                onChangeText={setReferenceNumber}
                editable={true}
              />
            )}
           <FloatingLabelInput
            label="Balance Amount"
            value={balanceAmount}
            editable = {false}
          />
        </View>
        </>
      )}

      {currentView === 'summary' && (
        <>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>} 
        <View style={[styles.cnbtnContainer]}>
        <TouchableOpacity style={[styles.cnButton, {backgroundColor: 'white', borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={handleCancel}>
          <Text style={[styles.cnText, {color: '#1D9BF0'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cnButton} onPress={handleNextFromSummary}>
          <Text style={styles.cnText}>Next</Text>
        </TouchableOpacity>
      </View>
      </>
      )}

      {currentView === 'paymentSummary' && (
        <View style={styles.paymentSummaryContainer}>
          <React.Fragment>
            <Text style={[styles.plotText, {marginLeft: 20}]}>Plot- 1</Text>
            <InfoRow label="Property Name" value={plot.propertyName} />
            <InfoRow label="Phase Number" value={plot.phaseNumber} />
            <InfoRow label="Plot Number" value={plot.plotNumber} />
            <InfoRow label="Sq.Ft" value={plot.sqft} />
            <InfoRow label="Dir Name" value={customerDetails?.assigned_so?.director?.name || ''} />
            <InfoRow label="SO Name" value={customerDetails?.assigned_so?.name} />
            {selectedPaymentMethod !== 'Cash Payment' && selectedPaymentMethod !== 'Loan' && (
                <InfoRow label="Payment Ref No" value={referenceNumber} />
              )}
            <InfoRow label="Total Amount" value={totalAmount} />
            <InfoRow label="Amount Paid" value={amountPaid} />
            <InfoRow label="Mode of Payment" value={selectedPaymentMethod || ''} />
            <InfoRow label="Corner Site" value={plot.is_corner_site ? 'Yes' : 'No'} />
          </React.Fragment>
        <View style={styles.doneBtnContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}> 
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
         </View>
          <>
          {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>} 
          {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>} 
          </>
      </View>
      )}
     
       {currentView === 'form' && (
        <>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>} 
        <View style={[styles.cnbtnContainer]}>
          <TouchableOpacity style={[styles.cnButton, {backgroundColor: 'white', borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={handleCancel}>
            <Text style={[styles.cnText, {color: '#1D9BF0'}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cnButton} onPress={handleNextFromForm}>
            <Text style={styles.cnText}>Next</Text>
          </TouchableOpacity>
        </View>
        </>
      )}

    </ScrollView>
    </View>
  );
};

export default CustomerTokenAdvance;