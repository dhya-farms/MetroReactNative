import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar} 
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



const amenities = [
    { icon: require('../../../assets/images/playground.png'), text: 'Playground' },
    { icon: require('../../../assets/images/pool.png'), text: 'Pool' },
    { icon: require('../../../assets/images/market.png'), text: 'Market' },
    { icon: require('../../../assets/images/kidspark.png'), text: 'Kids Park' },
    { icon: require('../../../assets/images/busstand.png'), text: 'Bus Stand' },
    { icon: require('../../../assets/images/walkingarea.png'), text: 'Walking Area' },
    { icon: require('../../../assets/images/school.png'), text: 'School' },
    // ... add other amenities as needed
  ];

  const nearbyAreas = [
    { id: '1', icon: require('../../../assets/images/dam.png'), text: 'Dam' },
    { id: '1', icon: require('../../../assets/images/mall.png'), text: 'mall' },
    { id: '3', icon: require('../../../assets/images/yogi.png'), text: 'Adhi yogi' },
    { id: '4', icon: require('../../../assets/images/market.png'),text: 'Markets' },
    { id: '5', icon: require('../../../assets/images/school.png'), text: 'Schools' },
    { id: '6', icon: require('../../../assets/images/busstand.png'),text: 'Bus Stand' },
    { id: '7', icon: require('../../../assets/images/walkingarea.png'), text: 'Walking Areas' },
    // ... add other amenities as needed
  ];



const MyPropertiesDetails = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Details');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [docUploadCompleted, setDocUploadCompleted] = useState(false)
  const [fullPaymentCompleted, setFullPaymentCompleted] = useState(false)
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);
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
      toggleModalVisibility('detailsInputModalVisible', true);
    } else {
      // Data is valid, close DetailsInputModal and open DropModal
      toggleModalVisibility('detailsInputModalVisible', false);
      toggleModalVisibility('dropModalVisible', true);
    }
  };


  const handleYesPress = () => {
    toggleModalVisibility('pickupModalVisible', false);
    toggleModalVisibility('detailsInputModalVisible', true);
    setCameFromPickupNo(false);
  };

  const handleNoPress = ()=>{
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
      // Data is valid, close DetailsInputModal and open DropModal
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

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.colonText]}>:</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <StatusBar/>
    <HeaderContainer title="My Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>Sri Shivashakthi Residency</Text>
      <Text style={styles.cityAmount}>₹1800/sqft</Text>
    </View>
    <LayoutHeader/>
    <View style={styles.separator} />
    <DetailsTab activeTab={activeTab} setActiveTab={setActiveTab}/>
    {activeTab === 'Details' && (
    <>
    <View style={styles.plotContainer}>
      <Text style={styles.plotHeader}>Plots Details:</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phase:</Text>
        <Text style={styles.infoContent}>Phase - 1</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Plot No:</Text>
        <Text style={styles.infoContent}>2/20</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Type:</Text>
        <Text style={styles.infoContent}>FarmLand</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Property Id:</Text>
        <Text style={styles.infoContent}>FL1234</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Sq.ft:</Text>
        <Text style={styles.infoContent}>from 2500sq.ft</Text>
      </View>
    </View>
    <View style={styles.amContainer}>
      <Text style={styles.amHeader}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <View key={index} style={styles.amenity}>
            <Image source={amenity.icon} style={styles.icon} />
            <Text style={styles.text}>{amenity.text}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.nbContainer}>
      <Text style={styles.nbHeader}>Nearby attractions:</Text>
      <View style={styles.NearbyContainer}>
        {nearbyAreas.map((nearby, index) => (
          <View key={index} style={styles.nearby}>
          <Image source={nearby.icon} style={styles.icon} />
          <Text style={styles.text}>{nearby.text}</Text>
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
          {bookingCompleted ? (
          <Text style={styles.completedText}>Completed</Text>
        ) : (
          <>
            <TouchableOpacity onPress={() => toggleModalVisibility('pickupModalVisible', true)} style={styles.button}>
              <Text style={styles.buttonText}>BOOK</Text>
            </TouchableOpacity>
          </>
        )}
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
        </View>
       <View style={[styles.checkicon, bookingCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name="check" size={20} color="white" />
        </View>
       </View>
        {status.siteVisit.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="Site Visit Date" value="16-12-2022" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
         </View>
        )}
        <TouchableOpacity onPress={() => toggleDetailsVisibility('siteVisit')}>
          <Text style={styles.detailToggle}>
            {status.siteVisit.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'} ,paymentCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Token Advance</Text>
          {bookingCompleted && !paymentCompleted ? (
          <TouchableOpacity onPress={() => toggleModalVisibility('paymentModalVisible', true)}  style={styles.button}>
              <Text style={styles.buttonText}>Payment</Text>
          </TouchableOpacity>
        ) : null}
        {paymentCompleted ? (
          <Text style={styles.completedText}>Completed</Text>
        ) : null}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, paymentCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {paymentCompleted ? "check" : 'times'} size={20} color="white" />
        </View>
        </View>
        {status.tokenAdvance.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="Site Visit Date" value="16-12-2022" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
         </View>
        )}
        <TouchableOpacity onPress={() => toggleDetailsVisibility('tokenAdvance')}>
          <Text style={styles.detailToggle}>
            {status.tokenAdvance.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity> 
        <View style={styles.statusContainer}>
          <View style={[styles.statusItem, { borderColor: '#C4C4C4'} , docUploadCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Documentation</Text>
          {bookingCompleted && paymentCompleted && !docUploadCompleted ? (
          <TouchableOpacity onPress={() => toggleModalVisibility('docverifyModalVisible', true)}  style={styles.button}>
              <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        ) : null}
        {docUploadCompleted ? (
          <Text style={[styles.completedText]}>Completed</Text>
        ) : null}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, docUploadCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {docUploadCompleted ? "check" : 'times'} size={20} color="white" />
        </View>
        </View>
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
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, { borderColor: '#C4C4C4'} , fullPaymentCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Payment</Text>
          {bookingCompleted && paymentCompleted && docUploadCompleted && !fullPaymentCompleted ? (
          <TouchableOpacity onPress={() => toggleModalVisibility('completePaymentModalVisible', true)}  style={styles.button}>
              <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
            ) : null}
            {fullPaymentCompleted ? (
              <Text style={[styles.completedText]}>Completed</Text>
            ) : null}
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}, fullPaymentCompleted ? styles.completedStatusCheck : {}]}>
        <Icon name= {fullPaymentCompleted ? "check" : 'times'} size={20} color="white" />
        </View>
        </View>
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
      </View>
      </View>
    )}
    <EnquireContainer/>
    </ScrollView>
  );
};


export default MyPropertiesDetails;