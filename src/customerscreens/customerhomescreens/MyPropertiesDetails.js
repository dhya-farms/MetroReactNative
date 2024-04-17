import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator} 
from 'react-native';
import { SafeAreaView } from 'react-native';
import styles from '../../constants/styles/propertydetailsstyles';
import LayoutHeader from '../../components/LayoutHeader';
import HeaderContainer from '../../components/HeaderContainer';
import SlidingCarousel from '../../components/SlidingCarousel';
import DetailsTab from '../../components/DetailsTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import AllModals from '../../components/AllPropertyModals';
import EnquireContainer from '../../components/EnquireContainer';
import LayoutImageModal from '../../modals/LayoutImageModal';
import axios from 'axios';



const amenityIcons = {
  'play ground': require('../../../assets/images/playground.png'),
  'swimming pool': require('../../../assets/images/pool.png'),
  'market': require('../../../assets/images/market.png'),
  'kids park': require('../../../assets/images/kidspark.png'),
  'bus stand': require('../../../assets/images/busstand.png'),
  'walking area': require('../../../assets/images/walkingarea.png'),
  'school': require('../../../assets/images/school.png'),
  'gym': require('../../../assets/images/gym.png'),
  'parking': require('../../../assets/images/parking.png'),
 };

 const defaultIcon = require('../../../assets/images/amenites.png');

const getAmenityIcon = (amenityName) => {
  const lowerCaseAmenityName = amenityName.toLowerCase();
  return Object.keys(amenityIcons).reduce((icon, key) => {
    if (key === lowerCaseAmenityName) {
      return amenityIcons[key];
    }
    return icon;
  }, defaultIcon);
};

  const nearbyIcons = {
    'mall': require('../../../assets/images/mall.png'),
    'yogi': require('../../../assets/images/yogi.png'), 
    'play ground': require('../../../assets/images/playground.png'),
    'swimming pool': require('../../../assets/images/pool.png'),
    'market': require('../../../assets/images/market.png'),
    'kids park': require('../../../assets/images/kidspark.png'),
    'bus stand': require('../../../assets/images/busstand.png'),
    'walking area': require('../../../assets/images/walkingarea.png'),
    'school': require('../../../assets/images/school.png'),
    'gym': require('../../../assets/images/gym.png'),
    'parking': require('../../../assets/images/parking.png'),
    // ... add other amenities as needed
  };

  const getNearByIcon = (nearByName) => {
    const lowerCaseNearByName = nearByName.toLowerCase();
    return Object.keys(nearbyIcons).reduce((icon, key) => {
      if (key === lowerCaseNearByName) {
        return nearbyIcons[key];
      }
      return icon;
    }, defaultIcon);
  };



const MyPropertiesDetails = ({route, navigation}) => {
  const [activeTab, setActiveTab] = useState('Details');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [docUploadCompleted, setDocUploadCompleted] = useState(false)
  const [fullPaymentCompleted, setFullPaymentCompleted] = useState(false)
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [loading, setLoading] = useState(true);
  const [currentPropertyId, setCurrentPropertyId] = useState();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [pickupNeeded, setPickupNeeded] = useState(true);
  const [error, setError] = useState('');
  const [siteVisitDetails, setSiteVisitDetails] = useState({
    propertyName: '',
    date: '',
    pickupAddress: '',
  });
  const [tokenPaymentDetails, setTokenPaymentDetails] = useState({
    tokenPayment: ''
  })
  
  const [status, setStatus] = useState({
    siteVisit: {
      detailsVisible: false,
    },
    tokenAdvance: {
      detailsVisible: false,
    },
    documentation: {
      detailsVisible: false,
    },
    payment: {
      detailsVisible: false,
    },
    ddDelivery:{
      detailsVisible: false,
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

  const { propertyId } = route.params?.params || {};

  useEffect(() => {
    console.log("Initial route.params:", route.params);
    const nestedPropertyId = route.params?.params?.propertyId;
    const directPropertyId = route.params?.propertyId;
    console.log("Directly Extracted Property ID:", directPropertyId);
  
    // Use whichever is available
    const effectivePropertyId = nestedPropertyId || directPropertyId;
    console.log("Effective Property ID for use:", effectivePropertyId);
  
    if (effectivePropertyId) {
      setCurrentPropertyId(effectivePropertyId);
    } else {
      console.log("No Property ID found in route params.");
    }
  }, [route.params]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!currentPropertyId) {
        console.log("Skipping fetch: No currentPropertyId set.");
        setError("No property ID provided");
        setLoading(false);
        return;
      }
  
      console.log("Fetching property details for ID:", currentPropertyId);
      setLoading(true);
      setError('');
  
      try {
        const response = await axios.get(`https://splashchemicals.in/metro/api/properties/${currentPropertyId}/`);
        console.log("Fetch success:", response.data);
        setPropertyDetails(response.data);
      } catch (error) {
        console.error("Fetch error:", error); 
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPropertyDetails();
  }, [currentPropertyId]);

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

  const handleDetailsInputDone = (data) => {
    const { pickupAddress, date, time, property } = data;
    if (!pickupAddress || !date || !time || !property) {
      alert("Please fill all the details.");
      // No need to toggle the modal visibility here since it's already visible
    } else {
      // Update state with the details from the modal
      setSiteVisitDetails({
        propertyName: property,
        date: date,
        pickupAddress: pickupAddress,
      });
  
      // Assuming you handle the completion of booking here or somewhere appropriate
      // setBookingCompleted(true);
  
      // Data is valid, proceed to close DetailsInputModal and open DropModal
      toggleModalVisibility('detailsInputModalVisible', false);
      toggleModalVisibility('dropModalVisible', true);
    }
  };


  const handleYesPress = () => {
    setPickupNeeded(true); 
    toggleModalVisibility('pickupModalVisible', false);
    toggleModalVisibility('detailsInputModalVisible', true);
    setCameFromPickupNo(false);
  };

  const handleNoPress = ()=>{
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
    toggleModalVisibility('dropModalVisible', false);
    if (cameFromPickupNo) {
      toggleModalVisibility('addressModalVisible', true);
    } else {
      toggleModalVisibility('addressConfirmModalVisible', true)
    }
    setCameFromPickupNo(false); 
  };

  
  const confirmationPress = ()=>{
    toggleModalVisibility('dropModalVisible', false);
    toggleModalVisibility('confirmationModalVisible', true);
  }

  const handleDropAddressDone = (data) => {
    const { pickupAddress} = data;
    if (!pickupAddress) {
      toggleModalVisibility('addressModalVisible', true);
    } else {
      // Data is valid, close DetailsInputModal and open DropModal
      toggleModalVisibility('addressModalVisible', false);
    toggleModalVisibility('confirmationModalVisible', true);
    }
  };

  const sameAddressPress = ()=>{
    toggleModalVisibility('addressConfirmModalVisible', false);
    toggleModalVisibility('confirmationModalVisible', true);
  }

  const handleConfirmPress = () => {
    toggleModalVisibility('confirmationModalVisible', false);
    setBookingCompleted(true); // Update the state to indicate booking is completed
  };

  const handleDetailsPaymentDone = (data) => {
    const { payAmount, desc, payType, refno } = data;
    if (!payAmount || !desc || !payType || !refno) {
      alert("Please fill all the details.");
      toggleModalVisibility('paymentModalVisible', true);
    } else {
      setTokenPaymentDetails({
        tokenPayment: payAmount,
      });
      toggleModalVisibility('paymentModalVisible', false);
      setPaymentCompleted(true)
    }
  };

  const handleDetailsFullPaymentDone = (data) => {
    const { payAmount, desc, payType, refno } = data;
    if (!payAmount || !desc || !payType || !refno) {
      alert("Please fill all the details.");
      toggleModalVisibility('completePaymentModalVisible', true);
    } else {
      // Data is valid, close DetailsInputModal and open DropModal
      toggleModalVisibility('completePaymentModalVisible', false);
      setFullPaymentCompleted(true)
    }
  };

  const handleDocVeifyDone = () => {
      toggleModalVisibility('docverifyModalVisible', false);
      setDocUploadCompleted(true)
  };

  const getPropertyTypeSpecificDetails = (propertyDetails) => {
    let details = {
      label: '', // This will display 'DTCP_PLOTS', 'FLAT', 'VILLA', or 'FARMLANDS'
      value: '',
      extraInfoLabel: '',
      extraInfoValue: '',
    };
  
    switch (propertyDetails?.property_type?.name) {
      case 'DTCP_PLOTS':
        details.label = "Phase"
        details.value = propertyDetails?.details?.phase_number || 'N/A'; // Replace with actual API key if different
        details.extraInfoLabel = 'No of Plots';
        details.extraInfoValue = propertyDetails.details.plots_available.toString() || 'N/A';
        break;
      case 'FLAT':
        details.label = "Flat Type"
        details.value = propertyDetails.details.flat_type || 'N/A';
        details.extraInfoLabel = 'Status';
        details.extraInfoValue = propertyDetails.details.property_status || 'N/A';
        break;
      case 'VILLA':
        details.label = "Villa Type"
        details.value = propertyDetails.details.villa_type || 'N/A'; // Assume villa_type is provided in the details
        details.extraInfoLabel = 'Status';
        details.extraInfoValue = propertyDetails.details.property_status || 'N/A';
        break;
      case 'FARMLANDS':
        details.label = "Farmland Type"
        details.value = propertyDetails.details.farmland_type || 'N/A'; // Assume farmland_type is provided in the details
        details.extraInfoLabel = 'Status';
        details.extraInfoValue = propertyDetails.details.property_status || 'N/A';
        break;
    }
  
    return details;
  };
  
  const typeSpecificDetails = getPropertyTypeSpecificDetails(propertyDetails);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }



  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.colonText]}>:</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );

  const getPlotTypeText = (propertyType) => {
    switch(propertyType) {
      case 1:
        return 'DTCP PLOTS';
      case 2:
        return 'Farmlands';
      case 3:
        return 'Flat';
      case 4:
        return 'Villa';
      default:
        return 'Unknown Plot Type'; // Fallback for unrecognized types
    }
  };

  const calculatePricePerSqFt = () => {
    if (propertyDetails && propertyDetails.price && propertyDetails.details.sq_ft_from) {
      const price = parseFloat(propertyDetails.price);
      const sqFtFrom = parseFloat(propertyDetails.details.sq_ft_from);
      return (price / sqFtFrom).toFixed(2); // Keeping two decimal places for the result.
    }
    return "N/A"; // Return "N/A" if the data is not available to perform the calculation.
  };

  const amenitiesArray = propertyDetails?.details?.amenities?.map(item => item.trim()).filter(Boolean) || [];
  const nearByArray = propertyDetails?.details?.nearby_attractions?.map(item => item.trim()).filter(Boolean) || [];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <HeaderContainer title="My Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>{propertyDetails.name}</Text>
      <Text style={styles.cityAmount}>₹ {calculatePricePerSqFt()}/sqft</Text>
    </View>
    <LayoutHeader onPress={ImageToggle}/>
    <LayoutImageModal modalVisible={imageModalVisible} setModalVisible={setImageModalVisible}/>
    <View style={styles.separator} />
    <DetailsTab activeTab={activeTab} setActiveTab={setActiveTab}/>
    {activeTab === 'Details' && (
    <>
    <View style={styles.plotContainer}>
      <Text style={styles.plotHeader}>{`${propertyDetails?.property_type?.name_vernacular} Details:`}</Text>
      <View style={styles.infoContainer}>
       <Text style={styles.infoLabel}>{typeSpecificDetails.label}:</Text>
       <Text style={styles.infoContent}>{typeSpecificDetails.value}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{typeSpecificDetails.extraInfoLabel}:</Text>
        <Text style={styles.infoContent}>{typeSpecificDetails.extraInfoValue}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Type:</Text>
        <Text style={styles.infoContent}>{propertyDetails?.property_type?.name_vernacular}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Property Id:</Text>
        <Text style={styles.infoContent}>{propertyDetails.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Sq.ft:</Text>
        <Text style={styles.infoContent}>{`from ${propertyDetails?.details?.sq_ft_from}sq.ft`}</Text>
      </View>
    </View>
    <View style={styles.amContainer}>
      <Text style={styles.amHeader}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {amenitiesArray.map((amenity, index) => (
          <View key={index} style={styles.amenity}>
            <Image source={getAmenityIcon(amenity)} style={styles.icon} />
            <Text style={styles.text}>{amenity}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.nbContainer}>
      <Text style={styles.nbHeader}>Nearby attractions:</Text>
      <View style={styles.NearbyContainer}>
        {nearByArray.map((nearby, index) => (
          <View key={index} style={styles.nearby}>
          <Image source={getNearByIcon(nearby)} style={styles.icon} />
          <Text style={styles.text}>{nearby}</Text>
        </View>
        ))}
      </View>
    </View>
    </>
    )}
    {activeTab === 'Progress' && (
    <View style={styles.progressContainer}>
      <View style={styles.verticalLine}></View>
      <Text style={styles.statusText}>Progress Status:</Text>
      <View style={styles.itemContainer}>
      <View style={styles.statusContainer}>
          <View style={[styles.statusItem, bookingCompleted ? styles.completedStatusItem : {}]}>
            <Text style={styles.siteText}>Site Visit</Text>
            {!bookingCompleted ? (
              <TouchableOpacity onPress={() => toggleModalVisibility('pickupModalVisible', true)} style={styles.button}>
                <Text style={styles.buttonText}>BOOK</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.completedText}>Completed</Text>
            )}
          </View>
          <View style={[styles.checkicon, bookingCompleted ? styles.completedStatusCheck : {}]}>
            <Icon name="check" size={20} color="white" />
          </View>
        </View>
         <AllModals
          modalVisibility={modalVisibility}
          toggleModalVisibility={toggleModalVisibility}
          handleYesPress={handleYesPress}
          handleNoPress={handleNoPress} 
          handleDetailsInputDone={handleDetailsInputDone}
          dropYesPress={dropYesPress} 
          confirmationPress={confirmationPress} 
          handleDropAddressDone={handleDropAddressDone} 
          sameAddressPress={sameAddressPress} 
          dropNoPress={dropNoPress} 
          handleConfirmPress={handleConfirmPress} 
          handleDetailsPaymentDone={handleDetailsPaymentDone} 
          handleDocVeifyDone={handleDocVeifyDone} 
          handleDetailsFullPaymentDone={handleDetailsFullPaymentDone}   // ... pass all other necessary handlers ...
      />
      {bookingCompleted && (
      <>
        {!pickupNeeded ? (
          <Text style={[styles.details, {marginLeft: 15}]}>Pickup not needed by the customer.</Text>
        ) : (
          <>
            {status.siteVisit.detailsVisible && (
              <View style={{width: '100%', marginLeft: 10}}>
                <Text style={styles.details}>Details</Text>
                <InfoRow label="PropertyName" value={siteVisitDetails.propertyName} />
                <InfoRow label="Site Visit Date" value={siteVisitDetails.date} />
                <InfoRow label="Driver Name" value="Pasupathi" />
                <InfoRow label="PickUp Location" value={siteVisitDetails.pickupAddress} />
              </View>
            )}
            <TouchableOpacity onPress={() => toggleDetailsVisibility('siteVisit')}>
              <Text style={styles.detailToggle}>
                {status.siteVisit.detailsVisible ? 'Less Details' : 'More Details >>>'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </>
    )}
        <View style={styles.statusContainer}>
            <View style={[styles.statusItem, {borderColor: '#C4C4C4'}, paymentCompleted ? styles.completedStatusItem : {}]}>
              <Text style={styles.siteText}>Token Advance</Text>
              
              {bookingCompleted ? ( // Check if booking is completed
                !paymentCompleted ? ( // If booking is completed, check if payment is not completed
                  <TouchableOpacity onPress={() => toggleModalVisibility('paymentModalVisible', true)} style={styles.button}>
                    <Text style={styles.buttonText}>Payment</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.completedText}>Completed</Text> // Show "Completed" only if both booking and payment are completed
                )
              ) : (
                null // Optional: Inform the user to complete the booking first
              )}
            </View>
            <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, paymentCompleted ? styles.completedStatusCheck : {}]}>
              <Icon name={paymentCompleted ? "check" : 'times'} size={20} color="white" />
            </View>
          </View>

        {paymentCompleted && (
            <>
              {status.tokenAdvance.detailsVisible && (
                <View style={{width: '100%' , marginLeft: 10,}}>
                  <Text style={styles.details}>Details</Text>
                  <InfoRow label="Property Name" value= {propertyDetails.name} />
                  <InfoRow label="Property Type" value= {propertyDetails?.property_type?.name_vernacular} />
                  <InfoRow label="Phase Number" value= {propertyDetails.details.phase_number || 'not needed'} />
                  <InfoRow label="Plot Number" value= "8" />
                  <InfoRow label="Sq.Ft:" value={`${propertyDetails.details.sq_ft_from}sq.ft`}/>
                  <InfoRow label="Corner Site" value="No" />
                  <InfoRow label="Site Visit Date" value="16-12-2022" />
                  <InfoRow label="Token Status" value="Completed" />
                  <InfoRow label="Token Amount" value={tokenPaymentDetails.tokenPayment} />
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
          <View style={[styles.statusItem, { borderColor: '#C4C4C4'} , docUploadCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Documentation</Text>
          {bookingCompleted && paymentCompleted ? ( // Check if booking is completed
                !docUploadCompleted ? ( // If booking is completed, check if payment is not completed
                <TouchableOpacity onPress={() => toggleModalVisibility('docverifyModalVisible', true)}  style={styles.button}>
                <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
                ) : (
                  <Text style={styles.completedText}>Completed</Text> // Show "Completed" only if both booking and payment are completed
                )
              ) : (
                null // Optional: Inform the user to complete the booking first
              )}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, docUploadCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {docUploadCompleted ? "check" : 'times'} size={20} color="white" />
        </View>
        </View>
        {docUploadCompleted && (
            <>
              {status.documentation.detailsVisible && (
                <View style={{width: '100%' , marginLeft: 10,}}>
                <Text style={styles.details}>Details</Text>
                <InfoRow label="Site Visit Date" value="16-12-2022" />
                <InfoRow label="Driver Name" value="Pasupathi" />
                <InfoRow label="PickUp Location" value="Ganapathi Office" />
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
        <View style={[styles.statusItem, { borderColor: '#C4C4C4'} , fullPaymentCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Payment</Text>
          {bookingCompleted && paymentCompleted && docUploadCompleted  ? ( // Check if booking is completed
                !fullPaymentCompleted  ? ( // If booking is completed, check if payment is not completed
                <TouchableOpacity onPress={() => toggleModalVisibility('completePaymentModalVisible', true)}  style={styles.button}>
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
                ) : (
                  <Text style={styles.completedText}>Completed</Text> // Show "Completed" only if both booking and payment are completed
                )
              ) : (
                null // Optional: Inform the user to complete the booking first
              )}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, fullPaymentCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {fullPaymentCompleted ? "check" : 'times'} size={20} color="white" />
        </View>
        </View>
        {fullPaymentCompleted && (
            <>
              {status.payment.detailsVisible && (
                <View style={{width: '100%' , marginLeft: 10,}}>
                <Text style={styles.details}>Details</Text>
                <InfoRow label="Site Visit Date" value="16-12-2022" />
                <InfoRow label="Driver Name" value="Pasupathi" />
                <InfoRow label="PickUp Location" value="Ganapathi Office" />
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
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Document Delivery</Text>
          {bookingCompleted && paymentCompleted && docUploadCompleted && fullPaymentCompleted ? (
          <TouchableOpacity onPress={() => {}}  style={[styles.button, {width: 55,height: 24, justifyContent: 'center', alignItems: 'center', padding: 0, } ]}>
              <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
            ) : null}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}]}>
        <Icon name="times" size={20} color="white" />
        </View>
        </View>
        {bookingCompleted && paymentCompleted && docUploadCompleted && fullPaymentCompleted && (
            <>
          {status.ddDelivery.detailsVisible && (
            <View style={{width: '100%' , marginLeft: 10,}}>
              <Text style={styles.details}>Details</Text>
              <InfoRow label="Site Visit Date" value="16-12-2022" />
              <InfoRow label="Driver Name" value="Pasupathi" />
              <InfoRow label="PickUp Location" value="Ganapathi Office" />
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
    <EnquireContainer/>
    </ScrollView>
  );
};


export default MyPropertiesDetails;