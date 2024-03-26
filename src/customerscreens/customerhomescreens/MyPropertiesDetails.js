import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Button, StatusBar} 
from 'react-native';
import { SafeAreaView } from 'react-native';
import styles from '../../constants/styles/propertydetailsstyles';
import LayoutHeader from '../../components/LayoutHeader';
import HeaderContainer from '../../components/HeaderContainer';
import SlidingCarousel from '../../components/SlidingCarousel';
import DetailsTab from '../../components/DetailsTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickupModal from '../../modals/PickUpModal';
import DetailsInputModal from '../../modals/DetailsInputModal';
import DropModal from '../../modals/DropModal';
import AddressModal from '../../modals/AddressModal';
import DropAddessConfimModal from '../../modals/DropAddressConfirmModal';
import ConfirmationModal from '../../modals/ConfirmationModal';
import EnquireContainer from '../../components/EnquireContainer';
import PaymentModal from '../../modals/PaymentModal';


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
    { id: '1', text: 'Dam' },
    { id: '2', text: 'mall' },
    { id: '3', text: 'Adhi yogi' },
    { id: '4', text: 'Markets' },
    { id: '5', text: 'Schools' },
    { id: '6', text: 'Bus Stand' },
    { id: '7', text: 'Walking Areas' },
    // ... add other amenities as needed
  ];



const MyPropertiesDetails = ({navigation}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');
  const [tokenDetailsVisible, setTokenDetailsVisible]= useState(false)
  const [docDetailsVisible, setDocDetailsVisible]= useState(false)
  const [paymentDetailsVisible, setPaymentDetailsVisible]= useState(false)
  const [deliveryDetailsVisible, setDeliveryDetailsVisible]= useState(false)
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [detailsInputModalVisible, setDetailsInputModalVisible] = useState(false);
  const [dropModalVisible, setDropModalVisible] = useState(false)
  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [addressConfirmModalVisible, setAddressConfirmModalVisible ] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [cameFromPickupNo, setCameFromPickupNo] = useState(false);

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

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const tokendetails = ()=>{
    setTokenDetailsVisible(!tokenDetailsVisible)
  }
  const docdetails = ()=>{
    setDocDetailsVisible(!docDetailsVisible)
  }

  const paymentDetails = ()=>{
    setPaymentDetailsVisible(!paymentDetailsVisible)
  }

  const deliveryDetails = ()=>{
    setDeliveryDetailsVisible(!deliveryDetailsVisible)
  }

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
            <Text style={styles.nbtext}>{nearby.text}</Text>
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
        {detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="Site Visit Date" value="16-12-2022" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
         </View>
        )}
        <TouchableOpacity onPress={toggleDetails}>
          <Text style={styles.detailToggle}>
            {detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'} ,paymentCompleted ? styles.completedStatusItem : {}]}>
          <Text style={styles.siteText}>Token Advance</Text>
          {bookingCompleted && !paymentCompleted ? (
          <TouchableOpacity onPress={() =>{setPaymentModalVisible(true)}} style={styles.button}>
              <Text style={styles.buttonText}>Payment</Text>
          </TouchableOpacity>
        ) : null}
        {paymentCompleted ? (
          <Text style={styles.completedText}>Completed</Text>
        ) : null}
        <PaymentModal
            modalVisible={paymentModalVisible}
            setModalVisible={setPaymentModalVisible}
            paymentConfirmPress={paymentConfirmPress}
        />
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}]}>
        <Icon name="times" size={20} color="white" />
        </View>
        </View>
        {tokenDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="Site Visit Date" value="16-12-2022" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
         </View>
        )}
        <TouchableOpacity onPress={tokendetails}>
          <Text style={styles.detailToggle}>
            {tokenDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity> 
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Documentation</Text>
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}]}>
        <Icon name="times" size={20} color="white" />
        </View>
        </View>
        {docDetailsVisible && (
          <View style={{width: '100%' , marginLeft: 10,}}>
          <Text style={styles.details}>Details</Text>
          <InfoRow label="Site Visit Date" value="16-12-2022" />
          <InfoRow label="Driver Name" value="Pasupathi" />
          <InfoRow label="PickUp Location" value="Ganapathi Office" />
        </View>
        )}
        <TouchableOpacity onPress={docdetails}>
          <Text style={styles.detailToggle}>
            {docDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>  
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Payment</Text>
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}]}>
        <Icon name="times" size={20} color="white" />
        </View>
        </View>
        {paymentDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="Site Visit Date" value="16-12-2022" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
         </View>
        )}
        <TouchableOpacity onPress={paymentDetails}>
          <Text style={styles.detailToggle}>
            {paymentDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>  
        <View style={styles.statusContainer}>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
          <Text style={styles.siteText}>Document Delivery</Text>
        </View>
        <View style={[styles.checkicon, {backgroundColor: '#C4C4C4'}]}>
        <Icon name="times" size={20} color="white" />
        </View>
        </View>
        {deliveryDetailsVisible && (
          <View style={{width: '100%' , marginLeft: 10,}}>
            <Text style={styles.details}>Details</Text>
            <InfoRow label="Site Visit Date" value="16-12-2022" />
            <InfoRow label="Driver Name" value="Pasupathi" />
            <InfoRow label="PickUp Location" value="Ganapathi Office" />
          </View>
        )}
        <TouchableOpacity onPress={deliveryDetails}>
          <Text style={styles.detailToggle}>
            {deliveryDetailsVisible ? 'Less Details' : 'More Details >>>'}
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