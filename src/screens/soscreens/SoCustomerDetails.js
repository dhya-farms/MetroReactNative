import React, { useCallback, useState,useEffect, } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking} 
from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderContainer from '../../components/HeaderContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PickupModal from '../../modals/PickUpModal';
import DetailsInputModal from '../../modals/DetailsInputModal';
import DropModal from '../../modals/DropModal';
import AddressModal from '../../modals/AddressModal';
import DropAddessConfimModal from '../../modals/DropAddressConfirmModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';
import styles from '../../constants/styles/socustomerdetailsstyles';
import axios from 'axios';
import { postSiteVisit } from '../../apifunctions/postSiteVisitApi';
import { fetchStatus } from '../../apifunctions/fetchStatusApi';
import { useCustomer } from '../../contexts/useCustomerContext';
import { updateApprovalStatus } from '../../apifunctions/updateApprovalStatusApi';
import { handleCallPress, handleMailPress, handleWhatsAppPress } from '../../functions/linkers';
import { getStatusColor, getStatusItemStyle, getIconName, getStatusText} from '../../functions/adminStatusHelpers';
import PlotSelectModal from '../../modals/PlotSelectModal';
import updatePlotId from '../../apifunctions/updatePlotApi';
import Toast from 'react-native-toast-message';
import UploadIcon from 'react-native-vector-icons/FontAwesome5'
import { fetchDocumentationDetails } from '../../functions/fetchDocumentDeatils';
import downloadAndShareFile from '../../functions/downloadFile';
import { fetchTokenPaymentDetails } from '../../functions/fetchTokenSoDetails';
import { fetchFullPaymentDetails } from '../../functions/fetchFullPaymentDeatils';
import { useRefresh } from '../../contexts/useRefreshContext';
import { postStatusChangeRequest } from '../../apifunctions/postStatusChangeRequest';
import { fetchDocumentationDeliveryDetails } from '../../functions/fetchDocumentDeliveryDetails';
import { makeCrmLeadInactive } from '../../apifunctions/makeCrmLeadInactive';
import { updateStatusBasedOnResponse } from '../../functions/soUpdateStatus';




const SoCustomerDetails = ({route ,navigation}) => {
  const { setGlobalCustomerId } = useCustomer();
  const [homeReftech, setHomeRefetch] = useState(false)
  const { globalCustomerId } = useCustomer();
  const { dummyState, triggerDataRefresh} = useRefresh();
  const { customerId } = route.params?.params || {};
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailsInputModalVisible, setDetailsInputModalVisible] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false)
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [plotSelectModalVisible, setPlotSelectModalVisible] = useState(false)
  const [addressConfirmModalVisible, setAddressConfirmModalVisible ] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [statusChangeRequestId, setStatusChangeRequestId] = useState(null);
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);
  const [crmId, setCrmId] = useState(null)
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropAddress, setDropAddress] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [tokenDetailsFetch, setTokenDetailsFetch] = useState(false)
  const [documentsRefetch, setDocumentsRefetch] = useState(false)
  const effectiveCustomerId = customerId || route.params?.customerId;
  const [phaseId, setPhaseId] = useState(null)
  const [plotInfo, setPlotInfo] = useState({})
  const [customerDetails, setCustomerDetails] = useState(null);
  const [status, setStatus] = useState({
    siteVisit: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: []
    },
    tokenAdvance: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: []
    },
    documentation: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: [],
    },
    payment: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: [{}],
    },
    ddDelivery:{
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: [],
    }
  });

  useEffect(() => {
    if (effectiveCustomerId) {
      setGlobalCustomerId(effectiveCustomerId);
    }
  }, [effectiveCustomerId, setGlobalCustomerId]);

  
  useEffect(() => {
      if (globalCustomerId) {
        fetchCustomerDetails(globalCustomerId);
        setCrmId(globalCustomerId);
      } else {
        console.log("No Global Customer ID provided");
      }
    }, [globalCustomerId, dummyState]);

    useEffect(() => {
      const relevantStatusChange = status.documentation.isApproved || status.documentation.isRejected || status.documentation.isCompleted || status.documentation.isPending
  
      if (relevantStatusChange) {
        console.log("Fetching payment details due to status change in tokenAdvance.");
        fetchDocumentationDetails(globalCustomerId, setLoading, setStatus, setError);  // `1` is the enum value for token advance
      }
    }, [
      status.documentation.isApproved,
      status.documentation.isRejected,
      status.documentation.isCompleted,
      status.documentation.isPending,
      documentsRefetch,
      dummyState,
      globalCustomerId
    ]);


    useEffect(() => {
      const relevantStatusChange = status.tokenAdvance.isApproved || status.tokenAdvance.isRejected || status.tokenAdvance.isCompleted || status.tokenAdvance.isPending;
  
      if (relevantStatusChange) {
        console.log("Fetching payment details due to status change in tokenAdvance.");
        fetchTokenPaymentDetails(globalCustomerId, setLoading, setStatus, setError);  // `1` is the enum value for token advance
      }
    }, [
      status.tokenAdvance.isApproved,
      status.tokenAdvance.isRejected,
      status.tokenAdvance.isCompleted,
      status.tokenAdvance.isPending,
      dummyState,
      tokenDetailsFetch,
      globalCustomerId
    ]);

    useEffect(() => {
      const relevantStatusChange = status.payment.isApproved || status.payment.isRejected || status.payment.isCompleted || status.payment.isPending;
      if (relevantStatusChange) {
        console.log("Fetching payment details due to status change in payment.");
        fetchFullPaymentDetails(globalCustomerId, setLoading, setStatus, setError); 
      }
    }, [globalCustomerId, dummyState, status.payment.isApproved ,status.payment.isRejected, status.payment.isCompleted, status.payment.isPending]);

    useEffect(() => {
      const relevantStatusChange = status.ddDelivery.isCompleted ;
      if (relevantStatusChange) {
        console.log("Fetching ddDelivery details due to status change in ddDelivery.");
        fetchDocumentationDeliveryDetails(globalCustomerId, setLoading, setStatus, setError); 
      }
    }, [globalCustomerId, status.ddDelivery.isCompleted]);

   
   


const fetchCustomerDetails = async (customerId) => {
  if (!customerId) {
    console.log("No customer ID provided");
    setError("No customer ID provided");
    setLoading(false);
    return;
  }

  setLoading(true);
  try {
    const response = await axios.get(`https://splashchemicals.in/metro/api/crm-leads/${customerId}/`);
    console.log("Fetch success:", response.data);
    setCustomerDetails(response.data);
    console.log("plot info", plotInfo)
    setStatusChangeRequestId(response.data.status_change_request?.id);
    setPhaseId(response.data.phase.id)

    const customerStatus = response.data;
    const statusName = response.data.current_approval_status ? response.data.current_approval_status.name : null;
    const crmStatusName = response.data.current_crm_status ? response.data.current_crm_status.name : null;


          const updatedStatus = updateStatusBasedOnResponse(status, statusName, crmStatusName, customerStatus);
          setStatus(updatedStatus);

    return response;  
  } catch (error) {
    console.error("Fetch error:", error);
    setError(error.response ? error.response.data.message : error.message);
  } finally {
    setLoading(false);
  }
};

  
  const handleYesPress = () => {
    setIsPickup(true);
    setPickupModalVisible(false);
    setDetailsInputModalVisible(true);
    setCameFromPickupNo(false);
  };

  const handleNoPress = ()=>{
    setIsPickup(false);
    setPickupModalVisible(false);
    setDropModalVisible(true)
    setCameFromPickupNo(true);
  }

  const handlePlotSelectPress = ()=>{
    setPickupModalVisible(true)
  }

  const dropNoPress = ()=>{
    setAddressConfirmModalVisible(false);
    setAddressModalVisible(true);
  }
  const dropYesPress = () => {
    setIsDrop(true)
    setDropModalVisible(false);
    if (cameFromPickupNo) {
      setAddressModalVisible(true);
    } else {
      setAddressConfirmModalVisible(true);
    }
    setCameFromPickupNo(false); 
  };
  
  const confirmationPress = ()=>{
    setIsDrop(false)
    setDropModalVisible(false)
    setConfirmationModalVisible(true)
  }

  const handleDropAddressConfirm = (data) => {
    // Assuming you have a state setter like this in your parent component
    setDropAddress(data.dropAddress);
    setAddressModalVisible(false);
    setConfirmationModalVisible(true); // Move to confirmation after setting address
  };

  const pickupDonePress = (details) => {
    setPickupAddress(details.pickupAddress);
    setPickupDate(details.date);
    const timeFromDetails = new Date(details.date);
    setPickupTime(`${timeFromDetails.getHours().toString().padStart(2, '0')}:${timeFromDetails.getMinutes().toString().padStart(2, '0')}`);

    setDetailsInputModalVisible(false);
    setDropModalVisible(true);
  };

  const sameAddressPress = ()=>{
    setDropAddress(pickupAddress);
    setAddressConfirmModalVisible(false)
    setConfirmationModalVisible(true)
  }

  const handleConfirmPress = async () => {
    setConfirmationModalVisible(false);
    try {
        const payload = {
            crm_lead_id: crmId,
            is_pickup: isPickup,
            is_drop: isDrop,
            // include other necessary details
        };

        if (isPickup) {
            payload.pickup_address = pickupAddress;
            payload.pickup_date = pickupDate; 
        }

        if (isDrop) {
            payload.drop_address = dropAddress;
        }

        // Sending the request to the server
        const response = await postSiteVisit(payload);
        console.log('Booking successful:', response);
        alert('Site visit booked successfully!');

        const statusResponse = await fetchStatus(crmId);
          if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
            const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus);
            setStatus(updatedStatus);
          } 
     } catch (error) {
        console.error('Failed to book site visit:', error);
        alert('Failed to book site visit. Please try again.');
        setBookingStatus("Not Booked");
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


  const navigateToCompletePayment = () => {
    navigation.navigate("SO Client", {
      screen: "Payment Method",
      params: {  crmId: customerDetails.id } // Optional: pass existing count if needed
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!customerDetails) {
    return <Text>No customer details available.</Text>;
  }


  const handleDoneWithPlot = (plotId, plotInfo) => {
    console.log("Selected Plot ID:", plotId);
    console.log("selected plot info", plotInfo)
    setPlotInfo(plotInfo);
  
    completeBooking(statusChangeRequestId, globalCustomerId, plotId);
  };

  
  const completeBooking = async (statusChangeRequestId, globalCustomerId, plotId) => {
    try {
      // First, update the plot ID if a plot was selected
      if (plotId) {
        await updatePlotId(globalCustomerId, plotId); 
        console.log("Plot ID update successful");
      }
  
      // Then, update the booking status to completed
      const response = await updateApprovalStatus(5, statusChangeRequestId, false);
      console.log("Completion status update success:", response);
  
      // Fetch the updated status
      const statusResponse = await fetchStatus(globalCustomerId);
      if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
        const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus);
        setStatus(updatedStatus);
        Toast.show({
          type: 'success',
          text1: 'Booking and plot update completed successfully.',
          visibilityTime: 2000,
          text1Style: {
            fontFamily: 'Poppins',
            fontSize: 12,
            fontWeight: '400'
          }
        });
      }
    } catch (error) {
      console.error("Error in booking or plot update:", error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update booking or plot ID. Please try again.',
        visibilityTime: 2000,
        text1Style: {
          fontFamily: 'Poppins',
          fontSize: 12,
          fontWeight: '400',
        }
      });
    }
  };

  const completeTokenAdvance= async(statusChangeRequestId, globalCustomerId)=>{
    try{
      const response = await updateApprovalStatus(5, statusChangeRequestId, false);
      console.log("Completion status update success:", response);
      const statusResponse = await fetchStatus(globalCustomerId);
      if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
        const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus);
        setStatus(updatedStatus);
        setTokenDetailsFetch(true)

      }
    }
    catch(error) {
      console.error("Error in booking or plot update:", error);
    }
  }

  const completeDocumentation = async(statusChangeRequestId, globalCustomerId)=>{
    try{
      const response = await updateApprovalStatus(5, statusChangeRequestId, false);
      console.log("Completion status update success:", response);
      const statusResponse = await fetchStatus(globalCustomerId);
      if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
        const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus);
        setStatus(updatedStatus);
        setTokenDetailsFetch(true)
        setDocumentsRefetch(true)
      }
    }
    catch(error) {
      console.error("Error in booking or plot update:", error);
    }

  }

  const completeFullPayment = async(statusChangeRequestId, globalCustomerId)=>{
    try{
      const response = await updateApprovalStatus(5, statusChangeRequestId, false);
      console.log("Completion status update success:", response);
      const statusResponse = await fetchStatus(globalCustomerId);
      if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
        const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus);
        setStatus(updatedStatus);
        setTokenDetailsFetch(true)
        setDocumentsRefetch(true)
        triggerDataRefresh();

      }
    }
    catch(error) {
      console.error("Error in payment", error);
    }

  }

  const toggleDetailsVisibility = (category) => {
    setStatus((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        detailsVisible: !prevState[category].detailsVisible,
      },
    }));
  };

  const handleGetApproval = async () => {
    try {
      const requestedById = await AsyncStorage.getItem('userId');  // Retrieve user ID from storage
      const response = await postStatusChangeRequest(globalCustomerId, requestedById);
      setStatusChangeRequestId(response.id);  // Set the ID from the response, indicating success
      console.log('Approval requested successfully:', response);
      Toast.show({
        type: 'success',
        text1: 'Approval Requested Successfully',
        visibilityTime: 2200,
    });
    } catch (error) {
      console.error('Failed to request approval:', error);
    }
  };

  const handleDelete = async (crmId) => {
    const result = await makeCrmLeadInactive(crmId);
    if (result.success) {
      Toast.show({
        type: 'success',
        text1: result.message,
        visibilityTime: 2000,  
      });
      setTimeout(() => {
        setHomeRefetch(prev=> !prev)
        navigation.navigate("SO Home", {
          screen: "SO home",
          params: { homeReftech: homeReftech},
        });
      }, 2000); // Increasing this timeout may help ensure state updates are processed
    } else {
      Toast.show({
        type: 'error',
        text1: result.message,
        visibilityTime: 1800,
      });
    }
  };
  
  



  

  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Customer Details" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
     <View style={styles.customerInfoContainar}>
        <View style={styles.imgContainer}>
            <Image source={require('../../../assets/images/person.png')} style={styles.personImage}/>
        </View>
        <View style={styles.cusTextContainer}>
            <Text style={styles.nameText}>{customerDetails.customer.name}</Text>
            <Text style={styles.numText}>{customerDetails.customer.mobile_no}</Text>
        </View>
        <TouchableOpacity style={styles.deleteContainer}  onPress={() => handleDelete(globalCustomerId)}>
          <Icon name="trash" size={9.92} color="#858585" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.smIconsContainer}>
        <TouchableOpacity onPress={()=>handleWhatsAppPress(customerDetails)}>
        <Image source={require("../../../assets/images/wpicon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleCallPress(customerDetails)}>
        <Image source={require("../../../assets/images/clicon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleMailPress(customerDetails)}>
        <Image source={require("../../../assets/images/mpicon.png")}/>
        </TouchableOpacity>
      </View>
    <View style={styles.separator} />
    <View style={styles.progressContainer}>
      <View style={styles.verticalLine}></View>
      <Text style={styles.statusText}>Progress Status:</Text>
      <View style={styles.itemContainer}>
        <View style={styles.statusContainer}>
        <View style={[
          styles.statusItem, getStatusItemStyle(status.siteVisit)]
        }>
        <Text style={styles.siteText}>Site Visit</Text>
        {status.siteVisit.isProgress && (
            <TouchableOpacity onPress={() => setPickupModalVisible(true)} style={styles.button}>
              <Text style={styles.buttonText}>BOOK</Text>
            </TouchableOpacity>
        )}
        {status.siteVisit.isApproved && (
          <TouchableOpacity style={styles.button} onPress={() => setPlotSelectModalVisible(true)}>
          <Text style={styles.buttonText}>COMPLETE</Text>
        </TouchableOpacity>
         )}
          <PlotSelectModal
              modalVisible={plotSelectModalVisible}
              setModalVisible={setPlotSelectModalVisible}
              handlePlotSelectPress={handlePlotSelectPress}
              customerDetails={customerDetails}
              phaseId={phaseId}
              onDone={handleDoneWithPlot}
          />
          <PickupModal
            modalVisible={pickupModalVisible}
            setModalVisible={setPickupModalVisible}
            onYesPress={handleYesPress}
            onNoPress={handleNoPress} // Pass the handler to the modal
          />
          <DetailsInputModal
            modalVisible={detailsInputModalVisible}
            setModalVisible={setDetailsInputModalVisible}
            onDone={pickupDonePress}
            propertyName={customerDetails.property.name}
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
            onDone={handleDropAddressConfirm}
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
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.siteVisit) }]}>
           <Icon name={getIconName(status.siteVisit)} size={18} color="white" />
        </View>
       </View>
       {!status.siteVisit.isProgress && (
      <View style={{width: '100%', marginLeft: 20}}>
        <Text style={styles.details}>{getStatusText(status.siteVisit)}</Text>
      </View>
    )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, getStatusItemStyle(status.tokenAdvance)]}>
          <Text style={styles.siteText}>Token Advance</Text>
          {status.tokenAdvance.isProgress ? (
          <TouchableOpacity onPress={() => { navigation.navigate("SO Client", {
            screen: "Token Advance",
            params: { customerDetails: customerDetails , plotInfo: plotInfo},
          })}} style={styles.button}>
              <Text style={styles.buttonText}>Payment</Text>
          </TouchableOpacity>
         ) : null}
         
        
        {status.tokenAdvance.isApproved && (
          <TouchableOpacity style={styles.button} onPress={()=> completeTokenAdvance(statusChangeRequestId, globalCustomerId)}>
          <Text style={styles.buttonText}>COMPLETE</Text>
        </TouchableOpacity>
         )}
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.tokenAdvance) }]}>
          <Icon name={getIconName(status.tokenAdvance)} size={18} color="white" />
        </View>
        </View>
        {!status.tokenAdvance.isProgress && (
            <View style={{width: '100%', marginLeft: 20}}>
              <Text style={styles.details}>{getStatusText(status.tokenAdvance)}</Text>
            </View>
          )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, getStatusItemStyle(status.documentation)] }>
          <Text style={styles.siteText}>Documentation</Text>
          {status.documentation.isProgress ? (
          <TouchableOpacity onPress={() => {
            navigation.navigate("SO Client", {
              screen: "Documentation",
              params: { customerDetails: customerDetails},
            });
          }} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : null}
         {status.documentation.isApproved && (
          <TouchableOpacity style={styles.button} onPress={() => completeDocumentation(statusChangeRequestId, globalCustomerId)}>
          <Text style={styles.buttonText}>COMPLETE</Text>
        </TouchableOpacity>
         )}
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.documentation) }]}>
          <Icon name={getIconName(status.documentation)} size={18} color="white" />
        </View>
        </View>
        {!status.documentation.isProgress && (
            <View style={{width: '80%', marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.details}>{getStatusText(status.documentation)}</Text>
              {(!status.documentation.isProgress && (status.documentation.isPending || status.documentation.isApproved || status.documentation.isRejected || 
              status.documentation.isCompleted))  && (
              <TouchableOpacity onPress={() => toggleDetailsVisibility('documentation')}>
                <Text style={styles.detailToggle}>
                  {status.documentation.detailsVisible ? 'Less Details' : 'More Details >>>'}
                </Text>
              </TouchableOpacity>
              )}
            </View>
        )}
        {(!status.documentation.isProgress && (status.documentation.isPending || status.documentation.isApproved || status.documentation.isRejected || status.documentation.isCompleted)) 
        && (
        <>
        {status.documentation.detailsVisible && (
          <View style={{width: '100%', marginLeft: 10}}>
            {status.documentation.details.length > 0 ? (
                status.documentation.details.map((doc, index) => (
                  <View key={doc.id} style={styles.documentItem}>
                   <Text style={styles.docDetailText}>
                   {`${index + 1}) ${doc.file_name.length > 13 ? doc.file_name.substring(0, 13) + '...' : doc.file_name}`}
                  </Text>
                  <TouchableOpacity onPress={() => downloadAndShareFile(doc.file_url, doc.file_name, doc.file_type)}>
                  <UploadIcon name="file-download" size={18} color={PRIMARY_COLOR} />
                  </TouchableOpacity>
              </View>
              ))
            ) : (
              <Text style={{marginLeft: 10}}>No details available.</Text>
            )}
          </View>
        )}
        </>
        )}

        <View style={styles.statusContainer}>
         <View style={[styles.statusItem, getStatusItemStyle(status.payment)] }>
          <Text style={styles.siteText}>Payment</Text>
          {status.payment.isProgress ? (
            <TouchableOpacity onPress={() => {
              navigation.navigate("SO Client", {
                screen: "Payment Method",
                params: { crmId: customerDetails.id}
              });
            }} style={styles.button}>
                <Text style={styles.buttonText}>Complete Payment</Text>
            </TouchableOpacity>
          ) : null}
           {status.payment.isApproved && (
          <TouchableOpacity style={styles.button} onPress={() => completeFullPayment(statusChangeRequestId, globalCustomerId)}>
            <Text style={styles.buttonText}>COMPLETE</Text>
           </TouchableOpacity>
           )}
          {status.payment.isPending && !statusChangeRequestId && (
            <TouchableOpacity onPress={handleGetApproval} style={styles.button}>
              <Text style={styles.buttonText}>Get Approval</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.payment) }]}>
          <Icon name={getIconName(status.payment)} size={18} color="white" />
        </View>
        </View>
        {!status.payment.isProgress && (
            <View style={{width: '100%', marginLeft: 20}}>
              <Text style={styles.details}>{getStatusText(status.payment)}</Text>
            </View>
        )}
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, getStatusItemStyle(status.ddDelivery)] }>
          <Text style={styles.siteText}>Document Delivery</Text>
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.ddDelivery) }]}>
          <Icon name={getIconName(status.ddDelivery)} size={18} color="white" />
        </View>
        </View>
        {status.ddDelivery.isProgress ? (
                 <View style={{width: '80%', marginLeft: 20}}>
                <Text style={styles.details}>Upload In Progress</Text>
                </View>
          ) : null}
        {!status.ddDelivery.isProgress && (
            <View style={{width: '80%', marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.details}>{getStatusText(status.ddDelivery)}</Text>
              { status.ddDelivery.isCompleted  && (
              <TouchableOpacity onPress={() => toggleDetailsVisibility('ddDelivery')}>
                <Text style={styles.detailToggle}>
                  {status.ddDelivery.detailsVisible ? 'Less Details' : 'More Details >>>'}
                </Text>
              </TouchableOpacity>
              )}
            </View>
        )}
        {status.ddDelivery.isCompleted
        && (
        <>
        {status.ddDelivery.detailsVisible && (
          <View style={{width: '100%', marginLeft: 10}}>
            {status.ddDelivery.details.length > 0 ? (
                status.ddDelivery.details.map((doc, index) => (
                  <View key={doc.id} style={styles.documentItem}>
                   <Text style={styles.docDetailText}>
                   {`${index + 1}) ${doc.file_name.length > 13 ? doc.file_name.substring(0, 13) + '...' : doc.file_name}`}
                  </Text>
                  <TouchableOpacity onPress={() => downloadAndShareFile(doc.file_url, doc.file_name, doc.file_type)}>
                  <UploadIcon name="file-download" size={18} color={PRIMARY_COLOR} />
                  </TouchableOpacity>
              </View>
              ))
            ) : (
              <Text style={{marginLeft: 10}}>No details available.</Text>
            )}
          </View>
        )}
        </>
        )}
      </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.paymentInfoContainer}>
        <View style={styles.balanceAmountContainer}>
        <Text style={styles.paymentText}>Payment</Text>
        {status.tokenAdvance.isCompleted && (
         <Text style={[styles.paymentText, {fontSize: 12}]}>Balance Amount: {customerDetails.amount_to_paid}</Text>
        )}
        </View>
        {status.tokenAdvance.details && status.tokenAdvance.details.length > 0 ? (
            status.tokenAdvance.details.map((detail, index) => (
              <View key={index} style={{width: '100%', padding: 10, borderColor: SECONDARY_COLOR, borderWidth: 1, borderRadius: 6}}>
                <Text style={styles.statusText}>Token Advance</Text>
                <InfoRow label="Amount Paid" value={`Rs. ${detail.amountPaid}`} />
                <InfoRow label="Mode of Pay" value={detail.modeOfPay} />
                <InfoRow label="Ref Number" value={detail.referenceNumber || "Not Provided"} />
                <InfoRow label="Date" value={detail.date} />
              </View>
            ))
          ) : (
            <Text style={[styles.paymentText, {fontWeight: '400', fontSize: 14}]}>
              No Payment Has Made Yet
            </Text>
          )}
      {status.payment.details && status.payment.details.length > 0 && (
          <>
            {status.payment.details.map((entry, index) => (
              
              <View key={index} style={styles.paymentEntryContainer}>
                <Text style={styles.paymentEntryTitle}>Payment - {entry.id}</Text>
                <InfoRow label="Amount Paid" value={`Rs. ${entry.amountPaid}`} />
                <InfoRow label="Mode of Pay" value={entry.modeOfPay} />
                <InfoRow label="Ref Number" value={entry.refNumber || "Not needed"} />
                <InfoRow label="Date" value={entry.date} />
              </View>
            ))}
           {(!status.payment.isCompleted && !status.payment.isApproved) && 
           (
            <TouchableOpacity style={styles.npContainer} onPress={navigateToCompletePayment}>
              <Text style={styles.npText}>+ New Payment</Text>
            </TouchableOpacity>
            )
            }
          </>
        )}
      </View>
    </ScrollView>
    </View>
  );
};

export default SoCustomerDetails;