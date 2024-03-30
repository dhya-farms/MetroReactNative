import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';;
import Icon from 'react-native-vector-icons/FontAwesome5';
import ApproveButton from '../../components/ApproveButton';
import styles from '../../constants/styles/admincustomerdetailsstyles';
import RemarkModal from '../../modals/RemarksModal';




const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.colonText]}>:</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );



const AdminCustomerDetails = ({navigation}) => {
  const [ismodalVisible, setisModalVisible] = useState(false);
  const [status, setStatus] = useState({
    siteVisit: {
      detailsVisible: false,
      isApproved: false,
    },
    tokenAdvance: {
      detailsVisible: false,
      isApproved: false,
    },
    documentation: {
      detailsVisible: false,
      isApproved: false,
    },
    payment: {
      detailsVisible: false,
      isApproved: false,
    },
    ddDelivery:{
      detailsVisible: false,
      isApproved: false,
    }

    // Add more categories here if needed
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
  
  const handleApproval = (category) => {
    setStatus((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        isApproved: true,
        detailsVisible: false, // Optionally hide details on approval
      },
    }));
    // Handle additional logic if needed
  };
  
  const handleReject = (category) => {
    setStatus((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
      },
    }));
    setisModalVisible(true);
  };

  const handleModalClose = () => {
    setisModalVisible(false);
  };

  const handleSubmitRemarks = (category) => {
    // Close the modal
    setisModalVisible(false);
  
    // Update the status state to make detailsVisible false for the given category
    setStatus((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        detailsVisible: false,
      },
    }));
  };
  

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
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
        <View style={[styles.checkicon, { backgroundColor: status.siteVisit.isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={status.siteVisit.isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, status.siteVisit.isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Site Visit</Text>
        <Text style={styles.pcText}>{status.siteVisit.isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {status.siteVisit.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onApprovePress={()=>handleApproval('siteVisit')} onRejectPress={() => handleReject('siteVisit')}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={() => handleSubmitRemarks('siteVisit')}
            category="siteVisit" 

           />
         </View>
        )}
        
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('siteVisit')}>
          <Text style={styles.detailToggle}>
            {status.siteVisit.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: status.tokenAdvance.isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={status.tokenAdvance.isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, status.tokenAdvance.isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Token Advance</Text>
        <Text style={styles.pcText}>{status.tokenAdvance.isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {status.tokenAdvance.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Amount paid" value="10,000 ₹" />
           <InfoRow label="Payment Mode" value="GPAY" />
           <InfoRow label="Ref Number" value="Q12347858659" />
           <InfoRow label="Payment Copy" value="Paymentcpy.png" />
           <ApproveButton onApprovePress={()=>handleApproval('tokenAdvance')} onRejectPress={() => handleReject('tokenAdvance')}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={() => handleSubmitRemarks('tokenAdvance')}
            category="tokenAdvance" 

           />
         </View>
        )}
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('tokenAdvance')}>
          <Text style={styles.detailToggle}>
            {status.tokenAdvance.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: status.documentation.isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={status.documentation.isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, status.documentation.isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Documentation</Text>
        <Text style={styles.pcText}>{status.documentation.isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {status.documentation.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onApprovePress={()=>handleApproval('documentation')} onRejectPress={() => handleReject('documentation')}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={() => handleSubmitRemarks('documentation')}
            category="documentation" 

           />
         </View>
        )}
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('documentation')}>
          <Text style={styles.detailToggle}>
            {status.documentation.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: status.payment.isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={status.payment.isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, status.payment.isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Payment</Text>
        <Text style={styles.pcText}>{status.payment.isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {status.payment.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date" value="16-12-2022" />
           <ApproveButton onApprovePress={()=>handleApproval('payment')} onRejectPress={() => handleReject('payment')}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={() => handleSubmitRemarks('payment')}
            category="payment" 

           />
         </View>
        )}
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('payment')}>
          <Text style={styles.detailToggle}>
            {status.payment.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: status.ddDelivery.isApproved ? '#80FF00' : '#1D9BF0' }]}>
          <Icon name={status.ddDelivery.isApproved ? 'check' : 'times'} size={20} color="white" />
        </View>
        <View style={[styles.statusItem, status.ddDelivery.isApproved ? styles.completedStatusItem : {}]}>
        <Text style={styles.siteText}>Document Delivery</Text>
        <Text style={styles.pcText}>{status.ddDelivery.isApproved ? 'Completed': 'Progress'}</Text>
        </View>
       </View>
        {status.ddDelivery.detailsVisible && (
           <View style={{width: '100%' , marginLeft: 10,}}>
           <Text style={styles.details}>Details</Text>
           <InfoRow label="PropertyName:" value="Metro Shiva Shakthi Residency" />
           <InfoRow label="Driver Name" value="Pasupathi" />
           <InfoRow label="PickUp Location" value="Ganapathi Office" />
           <InfoRow label="SiteVist Date:" value="16-12-2022" />
           <ApproveButton onApprovePress={()=>handleApproval('ddDelivery')} onRejectPress={() => handleReject('ddDelivery')}/>
           <RemarkModal
            visible={ismodalVisible}
            onClose={handleModalClose}
            onSubmit={() => handleSubmitRemarks('ddDelivery')}
            category="ddDelivery" 

           />
         </View>
        )}
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('ddDelivery')}>
          <Text style={styles.detailToggle}>
            {status.ddDelivery.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        
      </View>
      </View>
    </ScrollView>
  );
};



export default AdminCustomerDetails;