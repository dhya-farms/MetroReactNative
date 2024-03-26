import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Button} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickupModal from '../../modals/PickUpModal';
import DetailsInputModal from '../../modals/DetailsInputModal';
import DropModal from '../../modals/DropModal';
import AddressModal from '../../modals/AddressModal';
import DropAddessConfimModal from '../../modals/DropAddressConfirmModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import PaymentModal from '../../modals/PaymentModal';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../constants/styles/socustomerdetailsstyles';


const SoCustomerDetails = ({route ,navigation}) => {


  useFocusEffect(
    useCallback(() => {
      

      const paymentDone = route.params?.paymentCompleted ?? paymentCompleted; 
      const verificationDone = route.params?.verificationComplete ?? verificationComplete; 
      const newSelectedDocuments = route.params?.selectedDocuments;
      const deliveryComplete = route.params?.deliveryComplete


      if (route.params?.paymentCompleted !== undefined) {
        setPaymentCompleted(paymentDone);
      }
      if (route.params?.verificationComplete !== undefined) {
        setVerificationComplete(verificationDone);
      }
      if (route.params?.deliveryComplete !== undefined) {
        setDeliveryCompleted(deliveryComplete)
      }

      if (newSelectedDocuments !== undefined) {
        setSelectedDocuments(newSelectedDocuments);
        console.log("Updating selectedDocuments state with:", route.params.selectedDocuments);
        console.log("Selected Documents set to state:", newSelectedDocuments);
      }
  
      
      const newPaymentDetails = {
        date: route.params?.date ?? '',
        amountPaid: route.params?.amountPaid ?? '',
        paymentMethod: route.params?.paymentMethod ?? '',
        referenceNumber: route.params?.referenceNumber ?? ''
      };

      if (route.params?.newPaymentEntries) {
        // Here, you merge the new entries with the existing ones
        setPaymentEntries(prevEntries => [...prevEntries, ...route.params.newPaymentEntries]);
      }

  

      if (route.params?.completePayment !== undefined) {
        setCompletePayment(route.params.completePayment);
      }
      
      // Here, you're defensively checking if at least one property is non-empty to update
      if (newPaymentDetails.date || newPaymentDetails.amountPaid || newPaymentDetails.paymentMethod || newPaymentDetails.referenceNumber) {
        setPaymentDetails(prevDetails => ({ ...prevDetails, ...newPaymentDetails }));
      }

    }, [route.params, paymentCompleted, verificationComplete]) // Removed the state dependencies to prevent re-triggering from their updates
  );
 
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [detailsInputModalVisible, setDetailsInputModalVisible] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false)
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [addressConfirmModalVisible, setAddressConfirmModalVisible ] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [completePayment, setCompletePayment] = useState(false)
  const [paymentEntries, setPaymentEntries] = useState([])
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [deliveryCompleted, setDeliveryCompleted] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    date: '',
    amountPaid: '',
    paymentMethod: '',
    referenceNumber: ''
  });
  const paymentInfoExists = paymentDetails.date || paymentDetails.amountPaid || paymentDetails.paymentMethod || paymentDetails.referenceNumber;

  const handleYesPress = () => {
    setPickupModalVisible(false);
    setDetailsInputModalVisible(true);
    setCameFromPickupNo(false);
  };

  const handleNoPress = ()=>{
    setPickupModalVisible(false);
    setDropModalVisible(true)
    setCameFromPickupNo(true);
  }

  const dropNoPress = ()=>{
    setAddressConfirmModalVisible(false);
    setAddressModalVisible(true);
  }
  const dropYesPress = () => {
    setDropModalVisible(false);
    if (cameFromPickupNo) {
      setAddressModalVisible(true);
    } else {
      setAddressConfirmModalVisible(true);
    }
    setCameFromPickupNo(false); 
  };
  
  const confirmationPress = ()=>{
    setDropModalVisible(false)
    setConfirmationModalVisible(true)
  }

  const addressConfirmationPress = () => {
    setAddressModalVisible(false);
    setConfirmationModalVisible(true);
  };

  const pickupDonePress =()=>{
    setDetailsInputModalVisible(false)
    setDropModalVisible(true)
  }

  const sameAddressPress = ()=>{
    setAddressConfirmModalVisible(false)
    setConfirmationModalVisible(true)
  }

  const handleConfirmPress = () => {
    setConfirmationModalVisible(false);
    setBookingCompleted(true); // Update the state to indicate booking is completed
  };

  const paymentConfirmPress = ()=>{
    setPaymentModalVisible(false)
    setPaymentCompleted(true)
  }


  const InfoRow = ({ label, value }) => {
    return (
      <View style={styles.infoRowContainer}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  const navigateToTokenAdvance = async () => {
    try {
      // Retrieve the stored details from AsyncStorage
      const paymentDetailsString = await AsyncStorage.getItem('paymentDetails');
      const paymentDetails = paymentDetailsString ? JSON.parse(paymentDetailsString) : {};
  
      // Navigate to the Token Advance screen and pass the retrieved details
      navigation.navigate('Token Advance', {
        summaryData: paymentDetails, // Pass this object to the Token Advance screen
        currentView: 'summary' // Indicate that you want to show the summary view
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Failed to load payment details.', error);
    }
  };

  const navigateToCompletePayment = () => {
    navigation.navigate("SO Client", {
      screen: "Payment Method",
      params: {  existingPaymentEntries: paymentEntries, } // Optional: pass existing count if needed
    });
  };
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <HeaderContainer title="Customer Details" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
     <View style={styles.customerInfoContainar}>
        <View style={styles.imgContainer}>
            <Image source={require('../../../assets/images/person.png')} style={styles.personImage}/>
        </View>
        <View style={styles.cusTextContainer}>
            <Text style={styles.nameText}>Suraj</Text>
            <Text style={styles.numText}>+91-7904432770</Text>
        </View>
        <View style={styles.deleteContainer}>
          <Icon name="trash" size={9.92} color="#858585" style={styles.icon} />
        </View>
      </View>
      <View style={styles.smIconsContainer}>
        <Image source={require("../../../assets/images/wpicon.png")}/>
        <Image source={require("../../../assets/images/clicon.png")}/>
        <Image source={require("../../../assets/images/mpicon.png")}/>
      </View>
    <View style={styles.separator} />

    <View style={styles.progressContainer}>
      <View style={styles.verticalLine}></View>
      <Text style={styles.statusText}>Progress Status:</Text>
      <View style={styles.itemContainer}>
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, bookingCompleted ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Site Visit</Text>
          {bookingCompleted ? (
          null
        ) : (
          <>
            <TouchableOpacity onPress={() => setPickupModalVisible(true)} style={styles.button}>
              <Text style={styles.buttonText}>BOOK</Text>
            </TouchableOpacity>
          </>
        )}
          <PickupModal
            modalVisible={pickupModalVisible}
            setModalVisible={setPickupModalVisible}
            onYesPress={handleYesPress}
            onNoPress={handleNoPress} // Pass the handler to the modal
          />
          <DetailsInputModal
            modalVisible={detailsInputModalVisible}
            setModalVisible={setDetailsInputModalVisible}
            pickupDonePress={pickupDonePress}
          />
          <DropModal
            modalVisible={dropModalVisible}
            setModalVisible={setDropModalVisible}
            dropYesPress={dropYesPress}
            dropNoPress={confirmationPress}
          />
          <AddressModal
            modalVisible={addressModalVisible}
            setModalVisible={setAddressModalVisible}
            addressConfirmationPress={addressConfirmationPress}
          />
          <DropAddessConfimModal
            modalVisible={addressConfirmModalVisible}
            setModalVisible={setAddressConfirmModalVisible}
            sameAddressPress={sameAddressPress}
            dropNoPress={dropNoPress}
          />
         <ConfirmationModal
          modalVisible={confirmationModalVisible}
          setModalVisible={setConfirmationModalVisible}
          handleConfirmPress={handleConfirmPress}
         />
        </View>
       <View style={[styles.checkicon, bookingCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name="check" size={20} color="white" />
        </View>
       </View>
        {bookingCompleted && (
           <View style={{width: '100%' , marginLeft: 20,}}>
           <Text style={styles.details}>Completed</Text>
         </View>
        )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'} ,paymentCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Token Advance</Text>
          {bookingCompleted && !paymentCompleted ? (
          <TouchableOpacity onPress={() => {navigation.navigate("SO Client", { screen: "Token Advance"});}} style={styles.button}>
              <Text style={styles.buttonText}>Payment</Text>
          </TouchableOpacity>
        ) : null}
        <PaymentModal
            modalVisible={paymentModalVisible}
            setModalVisible={setPaymentModalVisible}
            paymentConfirmPress={paymentConfirmPress}
        />
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'},
        paymentCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {paymentCompleted ? "check" : "times"} size={20} color="white" />
        </View>
        </View>
        {paymentCompleted && (
           <View style={{width: '100%' , marginLeft: 20,}}>
           <Text style={styles.details}>Completed</Text>
         </View>
        )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}, ,verificationComplete ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Documentation</Text>
          {bookingCompleted && paymentCompleted && !verificationComplete ? (
          <TouchableOpacity onPress={() => {
            navigation.navigate("SO Client", {
              screen: "Documentation",
              params: { paymentCompleted: paymentCompleted } // Pass the paymentCompleted status here
            });
          }} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : null}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, verificationComplete ? styles.completedStatusCheck : {}]}>
        <Icon name= {verificationComplete ? "check" : "times"} size={20} color="white" />
        </View>
        </View>
        {verificationComplete && (
        <View style={{ width: '100%' , marginLeft: 20 }}>
          <Text style={styles.details}>Completed</Text>
        </View>
      )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, bookingCompleted && paymentCompleted && verificationComplete && completePayment ? styles.completedStatusItem : {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Payment</Text>
          {bookingCompleted && paymentCompleted && verificationComplete && !completePayment ? (
          <TouchableOpacity onPress={() => {
            navigation.navigate("SO Client", {
              screen: "Payment Method",
              params: { paymentCompleted: paymentCompleted,
              verificationComplete: verificationComplete ,
              selectedDocuments: selectedDocuments} // Pass the paymentCompleted status here
            });
          }} style={styles.button}>
              <Text style={styles.buttonText}>Complete Payment</Text>
          </TouchableOpacity>
        ) : null}
        </View>
        <View style={[styles.checkicon, bookingCompleted && paymentCompleted && verificationComplete && completePayment ? styles.completedStatusCheck : {backgroundColor: '#C4C4C4'}]}>
        <Icon name={bookingCompleted && paymentCompleted && verificationComplete && completePayment ? "check" : "times"} size={20} color="white" />
        </View>
        </View>
        {bookingCompleted && paymentCompleted && verificationComplete && completePayment && (
        <View style={{ width: '100%' , marginLeft: 20 }}>
          <Text style={styles.details}>Completed</Text>
        </View>
      )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, bookingCompleted && paymentCompleted && verificationComplete && completePayment && deliveryCompleted ? styles.completedStatusItem : {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Document Delivery</Text>
          {bookingCompleted && paymentCompleted && verificationComplete && completePayment && !deliveryCompleted ? (
          <TouchableOpacity onPress={() => {
            console.log("Navigating to Document Delivery with:", selectedDocuments);
            navigation.navigate("SO Client", {
              screen: "Document Delivery",
              params: { selectedDocuments: selectedDocuments } // Pass the paymentCompleted status here
            });
          }} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : null}
        </View>
        <View style={[styles.checkicon, bookingCompleted && paymentCompleted && verificationComplete && completePayment && deliveryCompleted ? styles.completedStatusCheck : {backgroundColor: '#C4C4C4'}]}>
        <Icon name={bookingCompleted && paymentCompleted && verificationComplete && completePayment && deliveryCompleted  ? "check" : "times"} size={20} color="white" />
        </View>
        </View>
        {bookingCompleted && paymentCompleted && verificationComplete && completePayment && deliveryCompleted && (
        <View style={{ width: '100%' , marginLeft: 20 }}>
          <Text style={styles.details}>Completed</Text>
        </View>
      )}
      </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.paymentInfoContainer}>
        <Text style={styles.paymentText}>Payment</Text>
        {paymentInfoExists ? (
          <>
          <View style={{width: '100%', padding: 10, borderColor: SECONDARY_COLOR, borderWidth: 1, borderRadius: 6,}}>
            <Text style={styles.statusText}>Token Advance</Text>
            <InfoRow label="Amount Paid" value={paymentDetails.amountPaid} />
            <InfoRow label="Mode of Pay" value={paymentDetails.paymentMethod} />
            <InfoRow label="Ref Number" value={paymentDetails.referenceNumber} />
            <InfoRow label="Date" value={paymentDetails.date} />
          </View>
          {paymentEntries.length === 0 && (
            <TouchableOpacity style={styles.npContainer} onPress={navigateToTokenAdvance}>
              <Text style={styles.npText}>+new payment</Text>
            </TouchableOpacity>
          )}
          </>
        ) : (
          <Text style={[styles.paymentText, {fontWeight: '400', fontSize: 14}]}>
            No Payment Has made yet
          </Text>
        )}
       {paymentEntries.length > 0 && (
          <>
            {paymentEntries.map((entry, index) => (
              <View key={index} style={styles.paymentEntryContainer}>
                <Text style={styles.paymentEntryTitle}>Payment - {index + 1}</Text>
                <InfoRow label="Amount Paid" value={`Rs. ${entry.amountPaid}`} />
                <InfoRow label="Mode of Pay" value={entry.modeOfPay} />
                <InfoRow label="Ref Number" value={entry.referenceNumber || "Not needed"} />
                <InfoRow label="Date" value={entry.date} />
              </View>
            ))}
            <TouchableOpacity style={styles.npContainer} onPress={navigateToCompletePayment}>
              <Text style={styles.npText}>+new payment</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </ScrollView>
  );
};

export default SoCustomerDetails;