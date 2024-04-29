import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../constants/styles/customertokenadvancestyles';


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
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black' } }}
        {...props}
      />
      </View>
    );
  };

  const RadioButton = ({ isSelected, onPress }) => {
    return (
      <TouchableOpacity style={styles.radioButton} onPress={onPress}>
        {isSelected && <View style={styles.radioButtonSelected} />}
      </TouchableOpacity>
    );
  };

  let plotIdCounter = 0;

  const initialPlot = () => ({
    id: ++plotIdCounter, // or use another unique ID generation method
    propertyName: '',
    propertyType: '',
    phaseNumber: '',
    plotNumber: '',
    sqft: '',
    isSelected: false,
  });
  


const CustomerTokenAdvance = ({route, navigation}) => {
   const [plots, setPlots] = useState([initialPlot()]);
   const [editable, setEditable] = useState(false);
   const [totalAmount, setTotalAmount] = useState('');
   const [amountPaid, setAmountPaid] = useState('');
   const [paymentMethod, setPaymentMethod] = useState('');
   const [referenceNumber, setReferenceNumber] = useState('');
   const [balanceAmount, setBalanceAmount] = useState('')
   const [currentView, setCurrentView] = useState('form');
   const [errorMessage, setErrorMessage] = useState('')

   useEffect(() => {
    // Check if summaryData is provided when navigated to this screen
    if (route.params?.summaryData) {
      const { summaryData } = route.params;
  
      // Assuming setPlots, setTotalAmount, etc., are your state setters
      setPlots(summaryData.plots);
      setReferenceNumber(summaryData.referenceNumber);
      setTotalAmount(summaryData.totalAmount);
      setAmountPaid(summaryData.amountPaid);
      setPaymentMethod(summaryData.paymentMethod);
      setBalanceAmount(summaryData.balanceAmount);
  
      // Set current view to 'summary'
      setCurrentView('summary');
    }
  }, [route.params]);

  const validatePlots = () => {
    // Check if any plot has an empty field
    return plots.every(plot => 
      plot.propertyName && plot.propertyType && plot.phaseNumber && 
      plot.plotNumber && plot.sqft
    );
  };

  const validatePaymentDetails = () => {
    return totalAmount && amountPaid && paymentMethod && referenceNumber && balanceAmount;
  };

   const addNewPlot = () => {
    setPlots([...plots, initialPlot()]);
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
      setCurrentView('paymentSummary')
      setErrorMessage('')
    } else {
      // Not all payment details are filled, set an error message state
      setErrorMessage("Please fill all the payment details.");
    }
  };

  const deletePlot = (plotId) => {
    console.log('Attempting to delete plot with ID:', plotId);
    const filteredPlots = plots.filter(plot => plot.id !== plotId);
    console.log('Remaining plots after deletion:', filteredPlots);
    setPlots(filteredPlots);
  };

  const setPlotProperty = (plotId, property, value) => {
    const newPlots = plots.map(plot =>
      plot.id === plotId ? { ...plot, [property]: value } : plot
    );
    setPlots(newPlots);
  };

  const handleCancel = ()=>{
    navigation.navigate("SO Client", { screen: "SO Customer Details"})
  }


  const handleEdit = () => {
    // Toggle the editable state for the inputs
    setEditable(!editable);
  };

  const InfoRow = ({ label, value }) => {
    return (
      <View style={styles.infoRowContainer}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  const handleDone = async () => {
    // Get the current date
    const currentDate = new Date();
    
    // Format the date as "dd MMM yyyy"
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).replace(/ /g, ' ');
  
    // Prepare payment details object
    const paymentDetails = {
      plots, // Assuming this is your array of plot details
      date: formattedDate,
      amountPaid: amountPaid, 
      paymentMethod: paymentMethod,
      totalAmount,
      referenceNumber: referenceNumber,
      balanceAmount: balanceAmount,
      // Any other details you wish to store and pass
    };
  
    try {
      // Store the payment details in AsyncStorage
      await AsyncStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  
      // Navigate to the "SO Customer Details" screen with necessary params
      navigation.navigate('SO Client', {
        screen: 'SO Customer Details',
        params: {
          paymentCompleted: true,
          ...paymentDetails, // Spread the paymentDetails object
        },
      });
    } catch (error) {
      console.error('Failed to save payment details or navigate.', error);
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
       plots.map((plot, index) => (
        <View key={plot.id} style={styles.plotContainer}>
          <View style={styles.inputContainer}>
          <Text style={styles.plotText}>Plot-{index + 1}</Text>
            <FloatingLabelInput
                label="Property Name"
                value={plot.propertyName}
                onChangeText={(value) => setPlotProperty(plot.id, 'propertyName', value)}
            />
            <FloatingLabelInput
                label="Property Type"
                value={plot.propertyType}
                onChangeText={(value) => setPlotProperty(plot.id, 'propertyType', value)}
            />
            <FloatingLabelInput
                label="Phase Number"
                value={plot.phaseNumber}
                onChangeText={(value) => setPlotProperty(plot.id, 'phaseNumber', value)}
            />
            <FloatingLabelInput
                label="Plot Number"
                value={plot.plotNumber}
                onChangeText={(value) => setPlotProperty(plot.id, 'plotNumber', value)}
            />
            <FloatingLabelInput
                label="Sq.ft"
                value={plot.sqft}
                onChangeText={(value) => setPlotProperty(plot.id, 'sqft', value)}
            />
          <View style={styles.radioButtonContainer}>
          <RadioButton 
            isSelected={plot.isSelected}
            onPress={() => setPlotProperty(plot.id, 'isSelected', !plot.isSelected)} 
          />
          <Text style={styles.radioButtonText}>Click here if your plot is in corner</Text>
        </View>
        </View>
        <View style={styles.buttonContainer}>
          {plots.length > 1 ? (
            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePlot(plot.id)}>
              <Image source={require('../../../assets/images/deletebtn.png')} style={{resizeMode: 'cover'}}/>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderButton} /> // Invisible placeholder to push add new button to the right
          )}
          {index === plots.length - 1 && (
            <TouchableOpacity style={styles.addNewButton} onPress={addNewPlot}>
              <Text style={styles.addNewText}>+add New</Text>
            </TouchableOpacity>
          )}
        </View>
        </View>
    ))
      )}

      {currentView === 'summary' && (
        <>
        {plots.map((plot, index) => (
          <View key={plot.id} style={styles.summaryContainer}>
            <View style={styles.pnContainer}>
             <Text style={[styles.plotText, {marginLeft: 0}]}>Plot-{index + 1}</Text>
             <TouchableOpacity style={styles.pnButton} onPress={handleEdit}>
              <Image source={require('../../../assets/images/edit.png')} style={{resizeMode: 'cover'}}/>
             </TouchableOpacity>
            </View>
            <FloatingLabelInput
              label={`Plot-${index + 1} Property Name`}
              value={plot.propertyName}
              isEditable={editable}
              onChangeText={(value) => setPlotProperty(plot.id, 'propertyName', value)}
            />
             <FloatingLabelInput
                label={`Plot-${index + 1} Property Type`}
                value={plot.propertyType}
                isEditable={editable}
                onChangeText={(value) => setPlotProperty(plot.id, 'propertyType', value)}
            />
            <FloatingLabelInput
                label={`Plot-${index + 1} Phase Number`}
                value={plot.phaseNumber}
                isEditable={editable}
                onChangeText={(value) => setPlotProperty(plot.id, 'phaseNumber', value)}
            />
            <FloatingLabelInput
                label={`Plot-${index + 1} Plot Number`}
                value={plot.plotNumber}
                isEditable={editable}
                onChangeText={(value) => setPlotProperty(plot.id, 'plotNumber', value)}
            />
            <FloatingLabelInput
                label={`Plot-${index + 1} Sq.Ft`}
                value={plot.sqft}
                isEditable={editable}
                onChangeText={(value) => setPlotProperty(plot.id, 'sqft', value)}
            />
            <View style={styles.radioButtonContainer}>
              <RadioButton 
                isSelected={plot.isSelected}
                onPress={() => setPlotProperty(plot.id, 'isSelected', !plot.isSelected)} 
              />
              <Text style={styles.radioButtonText}>Click here if your plot is in corner</Text>
            </View>
          </View>
         ))}
          <View style={styles.paymentDetailsContainer}>
          <Text style={[styles.plotText]}>Payment Details</Text>
          <FloatingLabelInput
            label="Total Amount"
            value={totalAmount}
            onChangeText={setTotalAmount}
          />
          <FloatingLabelInput
            label="Amount Paid"
            value={amountPaid}
            onChangeText={setAmountPaid}
          />
          <FloatingLabelInput
            label="Payment Method"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />
          <FloatingLabelInput
            label="Reference Number"
            value={referenceNumber}
            onChangeText={setReferenceNumber}
          />
           <FloatingLabelInput
            label="Balance Amount"
            value={balanceAmount}
            onChangeText={setBalanceAmount}
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
       
        {plots.map((plot, index) => (
          <React.Fragment key={index}>
            <Text style={[styles.plotText, {marginLeft: 20}]}>Plot-{index + 1}</Text>
            <InfoRow label="Property Name" value={plot.propertyName} />
            <InfoRow label="Phase Name" value={plot.phaseNumber} />
            <InfoRow label="Plot Number" value={plot.plotNumber} />
            <InfoRow label="Sq.Ft" value={plot.sqft} />
            <InfoRow label="Dir Name" value="Director's Name" />
            <InfoRow label="SO Name" value="Sales Officer's Name" />
            <InfoRow label="Payment Ref No" value={referenceNumber} />
            <InfoRow label="Total Amount" value={totalAmount} />
            <InfoRow label="Amount Paid" value={amountPaid} />
            <InfoRow label="Mode of Payment" value={paymentMethod} />
            <InfoRow label="Receipt Number" value="Receipt's Number" />
            <InfoRow label="Corner Site" value={plot.isSelected ? 'Yes' : 'No'} />
          </React.Fragment>
        ))}
        <View style={styles.doneBtnContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}> 
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
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