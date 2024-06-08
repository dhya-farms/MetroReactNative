import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator} 
from 'react-native';
import { SafeAreaView } from 'react-native';
import styles from '../../constants/styles/propertydetailsstyles';
import LayoutHeader from '../../components/LayoutHeader';
import HeaderContainer from '../../components/HeaderContainer';
import SlidingCarousel from '../../components/SlidingCarousel';
import DetailsTab from '../../components/DetailsTab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AllModals from '../../components/AllPropertyModals';
import EnquireContainer from '../../components/EnquireContainer';
import LayoutImageModal from '../../modals/LayoutImageModal';
import AmenitiesDisplay from '../../components/AmenitiesDisplay';
import NearbyDisplay from '../../components/NearbyDisplay';
import { fetchPropertyDetails } from '../../apifunctions/fetchPropertyDetailsApi';
import { postSiteVisit } from '../../apifunctions/postSiteVisitApi';
import { fetchStatus } from '../../apifunctions/fetchStatusApi';
import { getStatusColor, getStatusItemStyle, getIconName, getStatusText} from '../../functions/adminStatusHelpers';
import { fetchSiteVisitDetails } from '../../functions/fetchSiteVisitDetails';
import { fetchPaymentDetails } from '../../functions/fetchTokenAdvancedetails';
import { fetchPaymentTypes } from '../../apifunctions/paymentTypesApi';
import createPayment from '../../apifunctions/createPaymentApi';
import Toast from 'react-native-toast-message';
import { DetailItems } from '../../functions/DetailItems';
import { updateStatusBasedOnResponse } from '../../functions/updateStatusBasedResponse';
import { fetchDocumentationDetails } from '../../functions/fetchDocumentDeatils';
import downloadAndShareFile from '../../functions/downloadFile';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import UploadIcon from 'react-native-vector-icons/FontAwesome5'
import { useRefresh } from '../../contexts/useRefreshContext';
import { fetchFullPaymentDetails } from '../../functions/fetchFullPaymentDeatils';
import { fetchDocumentationDeliveryDetails } from '../../functions/fetchDocumentDeliveryDetails';
import { InfoRow } from '../../functions/detailsInfoRow';






const dummyImageUri = require('../../../assets/images/Newmetro.jpeg')
const dummyImageUris = new Array(3).fill(dummyImageUri); 

 const MyPropertiesDetails = ({route, navigation}) => {
  const { propertyId } = route.params?.params || {};
  const {phaseId} = route.params?.params || {};
  const [activeTab, setActiveTab] = useState('Details');
  const [isPickup, setIsPickup] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const { dummyState} = useRefresh();
  const [carouselImages, setCarouselImages]= useState([])
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState({ details: {} });
  const [showAll, setShowAll] = useState(false);
  const [phaseDetails, setPhaseDetails]= useState([])
  const [siteVisitReFetch, setSiteVisitRefetch]= useState(false)
  const [fullDetails, setFullDetails] = useState({})
  const [pickupNeeded, setPickupNeeded] = useState(true);
  const [error, setError] = useState('');
  const [crmId, setCrmId] = useState(null)
  const [pickupTime, setPickupTime] = useState('')
  const [dropAddress, setDropAddress] = useState('')
  const [backscreen, setBackScreen] = useState('')
  const [balanceAmount, setBalanceAmount] = useState(null)
  const [plot, setPlot] = useState({})
  const [selectedPaymentMethod, setSelectedPaymentMethod]= useState('')
  const [selectedPaymentId, setSelectedPaymentId]= useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [tokenRefetch, setTokenRefetch] = useState(false)
  const [paymentDropDownVisible, setPaymentDropdownVisible] = useState(false)
  const [siteVisitDetails, setSiteVisitDetails] = useState({
    propertyName: '',
    date: '',
    pickupAddress: '',
  });
  
  const [status, setStatus] = useState({
    siteVisit: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: []
    },
    tokenAdvance: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: []
    },
    documentation: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: []
    },
    payment: {
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: [{}]
    },
    ddDelivery:{
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      detailsVisible: false,
      details: []
    }
  });
  const [modalVisibility, setModalVisibility] = useState({
    pickupModalVisible: false,
    detailsInputModalVisible: false,
    dropModalVisible: false,
    addressModalVisible: false,
    addressConfirmModalVisible: false,
    confirmationModalVisible: false,
    paymentModalVisible: false,
    docverifyModalVisible: false,
    completePaymentModalVisible: false
  });
  

  const effectivePropertyId = propertyId || route.params?.propertyId;
  const effectivePhaseId = phaseId || route.params?.phaseId;
  const effectiveBackScreen = route.params?.params || route.params?.backScreen;


  const handlePaymentMethodSelect = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod.name_vernacular)
    setSelectedPaymentId(paymentMethod.id);
  };

  const handlePaymentButtonClick = async () => {
    setLoading(true);
    try {
      const paymentTypes = await fetchPaymentTypes();
      setPaymentMethods(paymentTypes);
      setLoading(false);
      toggleModalVisibility('paymentModalVisible', true);
    } catch (error) {
      setError('Failed to fetch payment types');
      setLoading(false);
      console.error(error);
    }
  };

    const fetchCustomerPropertyDetails = async (customerId, phaseId) => {
      try {
        setLoading(true);
        const details = await fetchPropertyDetails(customerId, phaseId);
        setPropertyDetails(details.propertyDetails);
        setPhaseDetails(details.phaseDetails);
        setFullDetails(details.fullDetails)


        const statusName = details.fullDetails.current_approval_status ? details.fullDetails.current_approval_status.name : null;
        const crmStatusName = details.fullDetails.current_crm_status ? details.fullDetails.current_crm_status.name : null;
        const plotInfo = details.fullDetails.plot; // or wherever the plot information is sourced from
        const updatedStatus = updateStatusBasedOnResponse(status, statusName, crmStatusName, plotInfo);
          setStatus(updatedStatus);        
          setPlot(details.fullDetails.plot)
          setBalanceAmount(details.fullDetails.amount_to_paid)

      
  
        const fetchedSliderImages = details.propertyDetails.images
          .filter(img => img.is_slider_image)
          .sort((a, b) => a.slider_image_order - b.slider_image_order)
          .map(img => ({ uri: img.image, key: img.id.toString() }));

        // Check if the fetched images are fewer than 3
        if (fetchedSliderImages.length < 3) {
          const requiredDummyImages = 3 - fetchedSliderImages.length;
          const dummyImages = dummyImageUris.slice(0, requiredDummyImages).map((uri, index) => ({
            uri,
            key: `dummy-${index}`  // Unique key for each dummy image
          }));
          setCarouselImages([...fetchedSliderImages, ...dummyImages]);
        } else {
          setCarouselImages(fetchedSliderImages);
        }
        return details.fullDetails;  
      } catch (error) {
        console.error('Error', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (effectiveBackScreen){
      setBackScreen(effectiveBackScreen)
    }

    fetchCustomerPropertyDetails(effectivePropertyId, effectivePhaseId)
    .catch(error => {
      console.error("Failed to load customer property details:", error);
    });
  setCrmId(effectivePropertyId);
 }, [effectivePropertyId, effectivePhaseId]);

 useEffect(() => {
  const relevantStatusChange = status.siteVisit.isApproved || status.siteVisit.isRejected || status.siteVisit.isCompleted || status.siteVisit.isPending;
  if (relevantStatusChange) {
    fetchSiteVisitDetails(effectivePropertyId, setLoading, setStatus, setError);
  }
}, [
  status.siteVisit.isApproved,
  status.siteVisit.isRejected,
  status.siteVisit.isCompleted,
  status.siteVisit.isPending,
  siteVisitReFetch,
  dummyState,
  effectivePropertyId
]);



  useEffect(() => {
    const relevantStatusChange = status.tokenAdvance.isApproved || status.tokenAdvance.isRejected || status.tokenAdvance.isCompleted || status.tokenAdvance.isPending;

    if (relevantStatusChange) {
      fetchPaymentDetails(effectivePropertyId, 1, setLoading, setStatus, setError);  // `1` is the enum value for token advance
    }
  }, [
    status.tokenAdvance.isApproved,
    status.tokenAdvance.isRejected,
    status.tokenAdvance.isCompleted,
    status.tokenAdvance.isPending,
    tokenRefetch,
    dummyState,
    effectivePropertyId
  ]);


    

    useEffect(() => {
      const relevantStatusChange = status.documentation.isApproved || status.documentation.isRejected || status.documentation.isCompleted || status.documentation.isPending
  
      if (relevantStatusChange) {
        fetchDocumentationDetails(effectivePropertyId, setLoading, setStatus, setError);  // `1` is the enum value for token advance
      }
    }, [
      status.documentation.isApproved,
      status.documentation.isRejected,
      status.documentation.isCompleted,
      status.documentation.isPending,
      dummyState,
      effectivePropertyId
    ]);

    useEffect(() => {
      const relevantStatusChange = status.payment.isApproved || status.payment.isRejected || status.payment.isCompleted || status.payment.isPending;
      if (relevantStatusChange) {
        fetchFullPaymentDetails(effectivePropertyId, setLoading, setStatus, setError)
          .then(() => {
            fetchStatus(effectivePropertyId)
              .then((statusDetails) => {
                setBalanceAmount(statusDetails.balanceAmount);
              })
              .catch((error) => {
                console.error('Failed to fetch status after payment details:', error);
                setError("Failed to fetch status after payment details");
              });
          })
          .catch((error) => {
            console.error('Failed to fetch payment details:', error);
          });
      }
    }, [effectivePropertyId, dummyState, status.payment.isApproved ,status.payment.isRejected, status.payment.isCompleted, status.payment.isPending]);



    useEffect(() => {
      const relevantStatusChange = status.ddDelivery.isCompleted ;
      if (relevantStatusChange) {
        fetchDocumentationDeliveryDetails(effectivePropertyId, setLoading, setStatus, setError); 
      }
    }, [effectivePropertyId, status.ddDelivery.isCompleted]);


  const ImageToggle = ()=>{
    setImageModalVisible(!imageModalVisible)
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

  const toggleModalVisibility = (modalName, isVisible) => {
    setModalVisibility(prev => ({ ...prev, [modalName]: isVisible }));
  };

  

  const handleBack = () => {
    if (backscreen==="Home") {
      navigation.navigate("Home");
    
    } else if(backscreen==="Properties"){
      navigation.navigate("properties", {
        screen: "Customer Properties",
      });
    } else {
      navigation.goBack();
    }
  };


  const handleYesPress = () => {
    setIsPickup(true);
    setPickupNeeded(true); 
    toggleModalVisibility('pickupModalVisible', false);
    toggleModalVisibility('detailsInputModalVisible', true);
    setCameFromPickupNo(false);
  };

  const handleNoPress = ()=>{
    setIsPickup(false)
    setPickupNeeded(false);
    toggleModalVisibility('pickupModalVisible', false);
    toggleModalVisibility('dropModalVisible', true);
    setCameFromPickupNo(true);
  }

  const dropNoPress = ()=>{
    toggleModalVisibility('addressConfirmModalVisible', false);
    toggleModalVisibility('addressModalVisible', true);
  }
  const dropYesPress = () => {
    setIsDrop(true)
    toggleModalVisibility('dropModalVisible', false);
    if (cameFromPickupNo) {
      toggleModalVisibility('addressModalVisible', true);
    } else {
      toggleModalVisibility('addressConfirmModalVisible', true)
    }
    setCameFromPickupNo(false); 
  };

  
  const confirmationPress = ()=>{
    setIsDrop(false)
    toggleModalVisibility('dropModalVisible', false);
    toggleModalVisibility('confirmationModalVisible', true);
  }

  const handleDropAddressDone = (data) => {
    if (!data.dropAddress) {
      toggleModalVisibility('addressModalVisible', true);
    } else {
      setDropAddress(data.dropAddress);
      toggleModalVisibility('addressModalVisible', false);
      toggleModalVisibility('confirmationModalVisible', true);
    }
  };

  const sameAddressPress = ()=>{
    setDropAddress(siteVisitDetails.pickupAddress);
    toggleModalVisibility('addressConfirmModalVisible', false);
    toggleModalVisibility('confirmationModalVisible', true);
  }

  const handleConfirmPress = async () => {
      toggleModalVisibility('confirmationModalVisible', false);
      try {
          const payload = {
              crm_lead_id: crmId,
              is_pickup: isPickup,
              is_drop: isDrop,
              // include other necessary details
          };
  
          if (isPickup) {
              payload.pickup_address = siteVisitDetails.pickupAddress;
              payload.pickup_date = siteVisitDetails.date; // Directly use the ISO string from pickupDate
          }
  
          if (isDrop) {
              payload.drop_address = dropAddress;
          }
  
          // Sending the request to the server
          const response = await postSiteVisit(payload);
          alert('Site visit booked successfully!');
          const statusResponse = await fetchStatus(crmId);
          if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
            const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus, plot);
            setStatus(updatedStatus);
          } 
      } catch (error) {
          console.error('Failed to book site visit:', error);
          alert('Failed to book site visit. Please try again.');
      }
  };

  const handleDetailsPaymentDone = async (data) => {
    const { payAmount, desc, payType, refno } = data;

    // Validation to ensure all required fields are filled
    if (!payAmount || !desc || !payType || (payType !== 'Cash Payment' && payType !== 'Loan' && !refno)) {
      alert("Please fill all the details.");
      toggleModalVisibility('paymentModalVisible', true);
      return; // Stop execution if validation fails
    }

    // Prepare the payment data object
    const paymentData = {
      crm_lead_id: effectivePropertyId, // Using effectivePropertyId as crm_lead_id
      amount: parseFloat(payAmount), // Ensure the amount is in the correct format
      payment_method: selectedPaymentId, // Assuming selectedPaymentId is updated correctly
      payment_for: 1, // Static enum value for 'payment_for'
      ...(refno && { reference_number: refno }) // Include reference number if available
    };

    try {
      // Attempt to create the payment using the API
      const createdPayment = await createPayment(paymentData);
      const statusResponse = await fetchStatus(effectivePropertyId);
              const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus, plot);
              setStatus(updatedStatus);
              setSiteVisitRefetch(true)
      Toast.show({
        type: 'success',
        text1: 'Token Advance Completed Sucessfully',
        visibilityTime: 1800,   
      });
      toggleModalVisibility('paymentModalVisible', false);
    } catch (error) {
      console.error('Error during payment creation:', error);
      Toast.show({
        type: 'error',
        text1: "Failed to update token Advance. Please Try Again",
        visibilityTime: 1800,
      });
      toggleModalVisibility('paymentModalVisible', true);
    }
};

  const pickupDonePress = (details) => {
    setSiteVisitDetails({
      propertyName: details.property,
      date: details.date,
      pickupAddress: details.pickupAddress,
    });
    const timeFromDetails = new Date(details.date);
    setPickupTime(`${timeFromDetails.getHours().toString().padStart(2, '0')}:${timeFromDetails.getMinutes().toString().padStart(2, '0')}`);
      // Update state with the details from the modal
    
    toggleModalVisibility('detailsInputModalVisible', false);
    toggleModalVisibility('dropModalVisible', true);
  };

  const handleDetailsFullPaymentDone = (data) => {
    const { payAmount, desc, payType, refno } = data;
    if (!payAmount || !desc || !payType || !refno) {
      alert("Please fill all the details.");
      toggleModalVisibility('completePaymentModalVisible', true);
    } else {
      // Data is valid, close DetailsInputModal and open DropModal
      toggleModalVisibility('completePaymentModalVisible', false);
    }

 };

  const handleDocVeifyDone = () => {
      toggleModalVisibility('docverifyModalVisible', false);

  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }




  const amenitiesArray = propertyDetails?.amenities?.map(item => ({
  name: item.name,
  logo: item.logo
})) || [];
  const nearByArray = propertyDetails?.nearby_attractions?.map(item => ({
    name: item.name,
    logo: item.logo
  })) || []

  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="My Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={handleBack}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel images={carouselImages}/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>{propertyDetails.name}</Text>
      {phaseDetails.no_of_plots > 0 ? (
    <Text style={styles.cityAmount}>₹ {phaseDetails.price_from}/sqft</Text>
        ) : (
          <Text style={styles.cityAmount}>All plots sold</Text>
    )}
    </View>
    <LayoutHeader onPress={ImageToggle} gmapUrl={propertyDetails.gmap_url}/>
    <LayoutImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible}/>
    <View style={styles.separator} />
    <DetailsTab activeTab={activeTab} setActiveTab={setActiveTab}/>
    {activeTab === 'Details' && (
    <>
    <DetailItems details={propertyDetails.details} phaseDetails={phaseDetails}
       showAll={showAll} setShowAll={setShowAll}/>
    <AmenitiesDisplay amenities={amenitiesArray} />
    <NearbyDisplay nearby={nearByArray}/>
    </>
    )}
    {activeTab === 'Progress' && (
    <View style={styles.progressContainer}>
      <View style={styles.verticalLine}></View>
      <View style={styles.balanceAmountContainer}>
      <Text style={styles.statusText}>Progress Status:</Text>
        {(status.tokenAdvance.isCompleted || status.tokenAdvance.isPending || status.tokenAdvance.isPending) && (
         <Text style={[styles.paymentText, {fontSize: 12}]}>Balance Amount: {balanceAmount|| ''}</Text>
        )}
        </View>
      <View style={styles.itemContainer}>
      <View style={styles.statusContainer}>
      <View style={[
          styles.statusItem, getStatusItemStyle(status.siteVisit)] }>
            <Text style={styles.siteText}>Site Visit</Text>
            {status.siteVisit.isProgress && (
            <TouchableOpacity  onPress={() => toggleModalVisibility('pickupModalVisible', true)}style={styles.button}>
              <Text style={styles.buttonText}>BOOK</Text>
            </TouchableOpacity>
            )}
            {!status.siteVisit.isProgress && (
              <Text style={styles.details}>{getStatusText(status.siteVisit)}</Text>
            )}
          </View>
          <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.siteVisit) }]}>
           <Icon name={getIconName(status.siteVisit)} size={18} color="white" />
           </View>
        </View>
         <AllModals
          modalVisibility={modalVisibility}
          toggleModalVisibility={toggleModalVisibility}
          handleYesPress={handleYesPress}
          handleNoPress={handleNoPress} 
          onDone={pickupDonePress}
          propertyName={propertyDetails.name}
          dropYesPress={dropYesPress} 
          confirmationPress={confirmationPress} 
          handleDropAddressDone={handleDropAddressDone} 
          sameAddressPress={sameAddressPress} 
          dropNoPress={dropNoPress} 
          handleConfirmPress={handleConfirmPress} 
          handleDetailsPaymentDone={handleDetailsPaymentDone} 
          handleDocVeifyDone={handleDocVeifyDone} 
          handleDetailsFullPaymentDone={handleDetailsFullPaymentDone}
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodSelect={handlePaymentMethodSelect}
          paymentMethods={paymentMethods} 
          paymentDropDownVisible={paymentDropDownVisible}
          setPaymentDropdownVisible={setPaymentDropdownVisible} 
          effectivePropertyId={effectivePropertyId}
          status={status}
          setStatus={setStatus}
          setSiteVisitRefetch={setSiteVisitRefetch}
          setTokenRefetch={setTokenRefetch}
          plot={plot}
      />
      {(!status.siteVisit.isProgress && (status.siteVisit.isPending || status.siteVisit.isApproved || status.siteVisit.isRejected || status.siteVisit.isCompleted)) && (
       <>
       
       {status.siteVisit.detailsVisible && (
        <View style={{width: '100%', marginLeft: 10}}>
          <Text style={styles.details}>Details</Text>
          {status.siteVisit.details?.length > 0 ? (
            status.siteVisit.details.map((detail, index) => (
              <View key={index} style={{width: '100%', marginLeft: 10}}>
                <InfoRow label="PropertyName" value={detail?.propertyName || ''}/>
                <InfoRow label="Site Visit Date" value={detail?.date || ''} />
                <InfoRow label="Driver Name" value="Pasupathi" />
                <InfoRow label="PickUp Location" value={detail?.pickupAddress || 'Pickup Not Needed'} />
              </View>
            ))
          ) : (
            <Text style={{marginLeft: 10}}>No site visit details available.</Text>
          )}
        </View>
      )}

    <TouchableOpacity onPress={() => toggleDetailsVisibility('siteVisit')}>
      <Text style={styles.detailToggle}>
        {status.siteVisit.detailsVisible ? 'Less Details' : 'More Details >>>'}
      </Text>
    </TouchableOpacity>
  </>
      )}
        <View style={styles.statusContainer}>
          <View style={[styles.statusItem, getStatusItemStyle(status.tokenAdvance)]}>
              <Text style={styles.siteText}>Token Advance</Text>
            {status.tokenAdvance.isProgress && (
            <TouchableOpacity  onPress={handlePaymentButtonClick} style={styles.button}>
              <Text style={styles.buttonText}>Payment</Text>
            </TouchableOpacity>
            )}
            {!status.tokenAdvance.isProgress && (
              <Text style={styles.details}>{getStatusText(status.tokenAdvance)}</Text>
            )}

            </View>
            <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.tokenAdvance) }]}>
              <Icon name={getIconName(status.tokenAdvance)} size={18} color="white" />
            </View>
          </View>
          {(!status.tokenAdvance.isProgress && (status.tokenAdvance.isPending || status.tokenAdvance.isApproved || status.tokenAdvance.isRejected || status.tokenAdvance.isCompleted)) && (
              <>
              {status.tokenAdvance.detailsVisible && (
                <View style={{width: '100%', marginLeft: 10}}>
                  <Text style={styles.details}>Token Advance Details</Text>
                  {status.tokenAdvance.details?.length > 0 ? (
                    status.tokenAdvance.details.map((detail, index) => (
                      <View key={index} style={{width: '100%', marginLeft: 10, marginVertical: 5}}>
                        <InfoRow label="Property Name" value={detail?.propertyName || ''}/>
                        <InfoRow label="Property Type" value={detail?.propertyType || ''} />
                        <InfoRow label="Phase Number" value={detail?.phaseNumber || ''} />
                        <InfoRow label="Plot Number" value={detail?.plotNumber || ''} />
                        <InfoRow label="Sq.Ft" value={`${detail?.sqFt}` || ''}/>
                        <InfoRow label="Corner Site" value={detail?.cornerSite || ''} />
                        <InfoRow label="Token Status" value={detail?.status || ''} />
                        <InfoRow label="Token Amount" value={`₹ ${detail?.tokenAmount}` || ''} />
                      </View>
                    ))
                  ) : (
                    <Text style={{marginLeft: 10}}>No details available.</Text>
                  )}
                </View>
                    )}
                <TouchableOpacity onPress={() => toggleDetailsVisibility('tokenAdvance')}>
                    <Text style={styles.detailToggle}>
                      {status.tokenAdvance.detailsVisible ? 'Less Details' : 'More Details >>>'}
                    </Text>
              </TouchableOpacity>
              </>
            )}

        <View style={styles.statusContainer}>
        <View style={[
          styles.statusItem, getStatusItemStyle(status.documentation)] }>
          <Text style={styles.siteText}>Documentation</Text>
          {status.documentation.isProgress && (
            <TouchableOpacity onPress={() => toggleModalVisibility('docverifyModalVisible', true)}  style={styles.button}>
            <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
            )}
            {!status.documentation.isProgress && (
              <Text style={styles.details}>{getStatusText(status.documentation)}</Text>
            )}
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.documentation) }]}>
        <Icon name={getIconName(status.documentation)} size={18} color="white" />
        </View>
        </View>
        {(!status.documentation.isProgress && (status.documentation.isPending || status.documentation.isApproved || status.documentation.isRejected || status.documentation.isCompleted)) 
        && (
          <>
        {status.documentation.detailsVisible && (
          <View style={{width: '100%', marginLeft: 10}}>
            <Text style={styles.details}>Documentation Details</Text>
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
        <TouchableOpacity onPress={() => toggleDetailsVisibility('documentation')}>
          <Text style={styles.detailToggle}>
            {status.documentation.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        </>
         )}
        <View style={styles.statusContainer}>
        <View style={[
          styles.statusItem, getStatusItemStyle(status.payment)] }>
          <Text style={styles.siteText}>Payment</Text>
          {(status.payment.isProgress || status.payment.isPending) && (balanceAmount > 0) && (
            <TouchableOpacity onPress={() => toggleModalVisibility('completePaymentModalVisible', true)}  style={styles.button}>
            <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
            )} 
             {!status.payment.isProgress && !status.payment.isPending && (
              <Text style={styles.details}>{getStatusText(status.payment)}</Text>
            )}
        </View>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.payment) }]}>
        <Icon name={getIconName(status.payment)} size={18} color="white" />
        </View>
        </View>
        {(!status.payment.isProgress && (status.payment.isPending || status.payment.isApproved || status.payment.isRejected || status.payment.isCompleted)) && (
          <>
            {status.payment.detailsVisible && (
              <View style={{width: '100%', marginLeft: 10}}>
                <Text style={styles.details}>Payment Details</Text>
                <InfoRow label="Property name" value={propertyDetails?.name} />
                <InfoRow label="Amount Paid" value={`₹${status.payment.totalAmount?.toFixed(2) || ''}`} />
                <InfoRow label="Modes of Payment" value={status.payment.uniqueModes?.join(', ') || ''} />
                <InfoRow label="Dates" value={status.payment.uniqueDates || ''} />
              </View>
            )}
            <TouchableOpacity onPress={() => toggleDetailsVisibility('payment')}>
              <Text style={styles.detailToggle}>
                {status.payment.detailsVisible ? 'Less Details' : 'More Details >>>'}
              </Text>
            </TouchableOpacity>
          </>
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
                <View style={{width: '80%', marginLeft: 17}}>
                <Text style={styles.siteText}>Upload In Progress</Text>
                </View>
          ) : null}
        {(!status.ddDelivery.isProgress && (status.ddDelivery.isPending || status.ddDelivery.isApproved || status.ddDelivery.isRejected || status.ddDelivery.isCompleted)) 
        && (
          <>
        {status.ddDelivery.detailsVisible && (
          <View style={{width: '100%', marginLeft: 10}}>
            <Text style={styles.details}> Document Delivery Details</Text>
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
        <TouchableOpacity onPress={() => toggleDetailsVisibility('ddDelivery')}>
          <Text style={styles.detailToggle}>
            {status.ddDelivery.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        </>
         )}
      </View>
      </View>
    )}
    <EnquireContainer phoneNumber={fullDetails.assigned_so.mobile_no} email={fullDetails.assigned_so.email}/>
    </ScrollView>
    </View>
  );
};


export default MyPropertiesDetails;