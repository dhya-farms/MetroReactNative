import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';;
import Icon from 'react-native-vector-icons/FontAwesome5';
import ApproveButton from '../../components/ApproveButton';
import RemarkModal from '../../modals/RemarksModal';




const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.colonText]}>:</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );



const AdminCustomerDetails = ({navigation}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');
  const [tokenDetailsVisible, setTokenDetailsVisible]= useState(false)
  const [docDetailsVisible, setDocDetailsVisible]= useState(false)
  const [paymentDetailsVisible, setPaymentDetailsVisible]= useState(false)
  const [deliveryDetailsVisible, setDeliveryDetailsVisible]= useState(false)
  const [isApproved, setIsApproved] = useState(false);
  const [ismodalVisible, setisModalVisible] = useState(false);
 
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

  const handleApprove = () => {
    setIsApproved(true);
    setDetailsVisible(false)
    // Additional logic if needed
  };
  const handleReject = () => {
    setisModalVisible(true);
  };

  const handleModalClose = () => {
    setisModalVisible(false);
  };

  const handleSubmitRemarks = () => {
    // Your logic to handle submission of remarks
    setisModalVisible(false);
    set
  };

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Customers Details" 
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
          <Icon name="trash-alt" size={9.92} color="#858585" style={styles.icon} />
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
        <View style={[styles.checkicon, { backgroundColor: isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Site Visit</Text>
        <Text style={styles.pcText}>{isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onApprovePress={handleApprove} onRejectPress={handleReject}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={handleSubmitRemarks}

           />
         </View>
        )}
        
        <TouchableOpacity onPress={toggleDetails}>
          <Text style={styles.detailToggle}>
            {detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon]}>
          <Icon name="times" size={20} color="white" />
        </View>
        <View style={[styles.statusItem, {borderColor: isApproved? '#1D9BF0' : '#B8B8B8'}]}>
        <Text style={styles.siteText}>Token Advance</Text>
        {isApproved ? <Text style={styles.pcText}>Progress</Text>: null}
        </View>
       </View>
        {tokenDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Amount paid" value="10,000 ₹" />
           <InfoRow label="Payment Mode" value="GPAY" />
           <InfoRow label="Ref Number" value="Q12347858659" />
           <InfoRow label="Payment Copy" value="Paymentcpy.png" />
           <ApproveButton onPress={()=>{}}/>
         </View>
        )}
        <TouchableOpacity onPress={tokendetails}>
          <Text style={styles.detailToggle}>
            {tokenDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon]}>
          <Icon name="times" size={20} color="white" />
        </View>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
        <Text style={styles.siteText}>Documentation</Text>
        <Text style={styles.pcText}>Progress</Text>
        </View>
       </View>
        {docDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onPress={()=>{}}/>
         </View>
        )}
        <TouchableOpacity onPress={docdetails}>
          <Text style={styles.detailToggle}>
            {docDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon]}>
          <Icon name="times" size={20} color="white" />
        </View>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
        <Text style={styles.siteText}>Payment</Text>
        <Text style={styles.pcText}>Progress</Text>
        </View>
       </View>
        {paymentDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onPress={()=>{}}/>
         </View>
        )}
        <TouchableOpacity onPress={paymentDetails}>
          <Text style={styles.detailToggle}>
            {paymentDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon]}>
          <Icon name="times" size={20} color="white" />
        </View>
        <View style={[styles.statusItem, {borderColor: '#C4C4C4'}]}>
        <Text style={styles.siteText}>Document Delivery</Text>
        <Text style={styles.pcText}>Progress</Text>
        </View>
       </View>
        {deliveryDetailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName:" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date:" value="16-12-2022" />
           <ApproveButton onPress={()=>{}}/>
         </View>
        )}
        <TouchableOpacity onPress={deliveryDetails}>
          <Text style={styles.detailToggle}>
            {deliveryDetailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  customerInfoContainar:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55,
    marginHorizontal: 10,
  },
  imgContainer:{
    margin: 10,
  },
  cusTextContainer:{
    flex: 1,
  },
  deleteContainer:{
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 4,
  },
  nameText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 3,
  },
  numText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
  },
  smIconsContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
separator: {
    height: 1,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 16,
},
progressContainer:{
    width: '95%',
    padding: 10,
    position: 'relative'
  },
  statusText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20, // Adjust as needed for spacing
  },
  statusContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    padding: 10,
  },
  button:{
    backgroundColor: '#1D9BF0',
    padding: 10,
    borderRadius: 4,
  },
  buttonText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
    color: 'white'
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%', // Ensure the row takes full width
    padding: 10,
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 6,
    marginRight: 8,
    // ... (your existing styles)
  },
  completedStatusItem: {
    borderColor: '#80FF00', // Green border color for completed status
  },
  completedStatusCheck:{
    backgroundColor: '#80FF00'
  },
  siteText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 10,
  },
  checkicon: {
    width: 32,
    height: 32,
    backgroundColor: '#1D9BF0',
    borderRadius: 16,
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', 
    marginRight: 10,// Center the icon horizontally
  },
  detailToggle: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 10,
    marginVertical: 10,
  },
  details: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 20, // Add space between rows
  },
  contextText: {
    fontFamily: 'Poppins'
  },
  labelText: {
    fontWeight: '400',
    fontSize: 10,
  },
  colonText: {
    marginRight: 4, // Space after the colon before the value
    // Colon styles if any
  },
  valueText: {
    fontWeight: '600',
    fontSize: 12,
  },
  pcText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 10,
  },
  completedStatusItem: {
    borderColor: '#80FF00', // Green border color for completed status
  },

});

export default AdminCustomerDetails;