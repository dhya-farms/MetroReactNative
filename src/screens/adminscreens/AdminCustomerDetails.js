import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator, Linking} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';;
import Icon from 'react-native-vector-icons/FontAwesome5';
import ApproveButton from '../../components/ApproveButton';
import styles from '../../constants/styles/admincustomerdetailsstyles';
import RemarkModal from '../../modals/RemarksModal';
import axios from 'axios';
import { updateApprovalStatus } from '../../apifunctions/updateApprovalStatusApi';
import { getStatusColor, getStatusItemStyle, getStatusText, getIconName } from '../../functions/adminStatusHelpers';
import { fetchPaymentDetails } from '../../functions/fetchTokenAdvancedetails';
import { fetchSiteVisitDetails } from '../../functions/fetchSiteVisitDetails';
import { handleMailPress, handleWhatsAppPress, handleCallPress } from '../../functions/connect';
import downloadAndShareFile from '../../functions/downloadFile';
import { fetchDocumentationDetails } from '../../functions/fetchDocumentDeatils';
import UploadIcon from 'react-native-vector-icons/FontAwesome5'
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import { fetchFullPaymentDetails } from '../../functions/fetchFullPaymentDeatils';
import { fetchDocumentationDeliveryDetails } from '../../functions/fetchDocumentDeliveryDetails';
import { makeCrmLeadInactive } from '../../apifunctions/makeCrmLeadInactive';
import Toast from 'react-native-toast-message';
import { useRefresh } from '../../contexts/useRefreshContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateStatusBasedOnResponse } from '../../functions/adminUpdateStatus';
import { InfoRow } from '../../functions/detailsInfoRow';
import getEnvVars from '../../../config';
const { BASE_URL } = getEnvVars();




const AdminCustomerDetails = ({route, navigation}) => {
  const { customerId } = route.params?.params || {};
  const { triggerDataRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [backscreen, setBackScreen] = useState('')
  const [customerDetails, setCustomerDetails] = useState(null);
  const [ismodalVisible, setisModalVisible] = useState(false);
  const [statusChangeRequestId, setStatusChangeRequestId] = useState(null);
  const [siteVisitReFetch, setSiteVisitRefetch] = useState(false)
  const [tokenRefetch, setTokenRefetch] = useState(false)
  const [documentReFetch, setDocumentRefetch] = useState(false)
  const effectiveCustomerId= customerId || route.params?.customerId
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [status, setStatus] = useState({
    siteVisit: {
      detailsVisible: false,
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: []
    },
    tokenAdvance: {
      detailsVisible: false,
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: []
    },
    documentation: {
      detailsVisible: false,
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: [],
    },
    payment: {
      detailsVisible: false,
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: [],
    },
    ddDelivery:{
      detailsVisible: false,
      isProgress: false,
      isApproved: false,
      isPending: false,
      isRejected: false,
      isCompleted: false,
      details: [],
    }
  });


  const fetchCustomerDetails = async (effectiveCustomerId) => {
    if (!effectiveCustomerId) {
        console.log("No customer ID provided");
        setError("No customer ID provided");
        setLoading(false);
        return;
    }
    
    const nestedBackScreen = route.params?.params?.backScreen;
    const directBackScreen = route.params?.backScreen;
    const effectiveBackScreen = nestedBackScreen || directBackScreen;
    
    console.log("Effective Back Screen for use:", effectiveBackScreen);
    if (effectiveBackScreen) {
        console.log("Navigated from:", effectiveBackScreen);
        setBackScreen(effectiveBackScreen);
    } else {
        console.log("No Back Screen provided in route params.");
    }

    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/crm-leads/${effectiveCustomerId}/`);
        console.log("Fetch success:", response.data);
        setCustomerDetails(response.data);
        setStatusChangeRequestId(response.data.status_change_request?.id);

        const statusName = response.data.current_approval_status ? response.data.current_approval_status.name : null;
        const crmStatusName = response.data.current_crm_status ? response.data.current_crm_status.name : null;


        if (crmStatusName) {
          const updatedStatus = updateStatusBasedOnResponse(statusName, crmStatusName);
          setStatus(updatedStatus);
        } else {
          console.log("No current CRM status available.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        setError(error.response ? error.response.data.message : error.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetails(effectiveCustomerId);
  }, [effectiveCustomerId]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        setUserRole(storedRole);
      } catch (error) {
        console.error('Failed to fetch role from storage', error);
      }
    };
  
    getRole();
  }, []);

  useEffect(() => {
    const relevantStatusChange = status.siteVisit.isApproved || status.siteVisit.isRejected || status.siteVisit.isCompleted || status.siteVisit.isPending;
    if (relevantStatusChange) {
      console.log("Fetching site visit details due to relevant status change.");
      fetchSiteVisitDetails(effectiveCustomerId, setLoading, setStatus, setError);
    }
  }, [
    status.siteVisit.isApproved,
    status.siteVisit.isRejected,
    status.siteVisit.isCompleted,
    status.siteVisit.isPending,
    siteVisitReFetch,
    effectiveCustomerId
  ]);

  useEffect(() => {
    const relevantStatusChange = status.tokenAdvance.isApproved || status.tokenAdvance.isRejected || status.tokenAdvance.isCompleted || status.tokenAdvance.isPending;
  
    if (relevantStatusChange) {
      console.log("Fetching payment details due to status change in tokenAdvance.");
      fetchPaymentDetails(effectiveCustomerId, 1, setLoading, setStatus, setError);  // `1` is the enum value for token advance
    }
  }, [
      status.tokenAdvance.isApproved,
      status.tokenAdvance.isRejected,
      status.tokenAdvance.isCompleted,
      status.tokenAdvance.isPending,
      tokenRefetch,
      effectiveCustomerId
  ]);

  useEffect(() => {
    const relevantStatusChange = status.documentation.isApproved || status.documentation.isRejected || status.documentation.isCompleted || status.documentation.isPending

    if (relevantStatusChange) {
      console.log("Fetching documentation details due to status change in tokenAdvance.");
      fetchDocumentationDetails(effectiveCustomerId, setLoading, setStatus, setError);  // `1` is the enum value for token advance
    }
  }, [
    status.documentation.isApproved,
    status.documentation.isRejected,
    status.documentation.isCompleted,
    status.documentation.isPending,
    documentReFetch,
    effectiveCustomerId
  ]);

  useEffect(() => {
    const relevantStatusChange = status.payment.isApproved || status.payment.isRejected || status.payment.isCompleted || status.payment.isPending;
    if (relevantStatusChange) {
      console.log("Fetching full payment details due to status change in payment.");
      fetchFullPaymentDetails(effectiveCustomerId, setLoading, setStatus, setError); 
    }
  }, [effectiveCustomerId, status.payment.isApproved ,status.payment.isRejected, 
    status.payment.isCompleted, status.payment.isPending]);

  useEffect(() => {
    const relevantStatusChange = status.ddDelivery.isCompleted ;
    if (relevantStatusChange) {
      console.log("Fetching  dd delivery details due to status change in payment.");
      fetchDocumentationDeliveryDetails(effectiveCustomerId, setLoading, setStatus, setError); 
    }
  }, [effectiveCustomerId, status.ddDelivery.isCompleted ]);


 


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
    updateApprovalStatus(2, statusChangeRequestId) // 2 for approved
      .then(() => {
        if (category === 'tokenAdvance') {
          setSiteVisitRefetch(prev => !prev);
        } else if (category === 'documentation') {
          setSiteVisitRefetch(prev => !prev);
          setTokenRefetch(prev => !prev);
        } else if (category === 'payment') {
          setSiteVisitRefetch(prev => !prev);
          setTokenRefetch(prev => !prev);
          setDocumentRefetch(prev=>!prev)
        } 
        setStatus((prevState) => ({
          ...prevState,
          [category]: {
            ...prevState[category],
            isApproved: true,
            isRejected: false,
          },
        }));
        setButtonsDisabled(true);
      })
      
      .catch(error => console.error("Error handling approval:", error));
  };
  
  const handleReject = (category) => {
    updateApprovalStatus(3, statusChangeRequestId) // 3 for rejected
      .then(() => {
        console.log('Before status update:', status);
        if (category === 'tokenAdvance') {
          setSiteVisitRefetch(prev => !prev);
        } else if (category === 'documentation') {
          setSiteVisitRefetch(prev => !prev);
          setTokenRefetch(prev => !prev);
        } else if (category === 'payment') {
          setSiteVisitRefetch(prev => !prev);
          setTokenRefetch(prev => !prev);
          setDocumentRefetch(prev=>!prev)
        } 
        setStatus((prevState) => {
          const newState = {
            ...prevState,
            [category]: {
              ...prevState[category],
              isPending: false,
              isApproved: false,
              isRejected: true,
            },
          };
          console.log('After status update:', newState);
          return newState;
        });
        setisModalVisible(false);
        setButtonsDisabled(true);
      })
      
      .catch(error => console.error("Error handling rejection:", error));
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
        triggerDataRefresh();
        navigation.navigate("Home", {
          screen: "Admin home",
        });
      }, 2000); // Wait for 2 seconds to show the toast, then navigate
    } else {
      Toast.show({
        type: 'error',
        text1: result.message,
        visibilityTime: 1800,
      });
    }
  };

  const handleModalClose = () => {
    setisModalVisible(false);
  };

  const handleEdit = () => {
    setButtonsDisabled(false); // Enable buttons when edit is clicked
  };

 

  const handleBack = () => {
    if (backscreen==="Home") {
      navigation.navigate("Home", {
        screen: "Admin Home",
      });
    
    } else if(backscreen==="CustomerList"){
      navigation.navigate("Client", {
        screen: "Customer List",
      });
    } else if(backscreen==="soManager"){
      navigation.navigate("SO", {
        screen: "So Manager",
      });
    } else {
      navigation.goBack();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!customerDetails) {
    return <Text>No customer details available.</Text>;
  }
  

  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Customers Details" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={handleBack}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.customerInfoContainar}>
        <View style={styles.imgContainer}>
            <Image source={require('../../../assets/images/person.png')} style={styles.personImage}/>
        </View>
        <View style={styles.cusTextContainer}>
            <Text style={styles.nameText}>{customerDetails.customer.name}</Text>
            <Text style={styles.numText}>{customerDetails.customer.mobile_no}</Text>
        </View>
        <TouchableOpacity style={styles.deleteContainer}  onPress={() => handleDelete(effectiveCustomerId)}>
          <Icon name="trash-alt" size={9.92} color="#858585" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.smIconsContainer}>
      <TouchableOpacity onPress={()=> handleWhatsAppPress(customerDetails)}>
          <Image source={require("../../../assets/images/wpicon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleCallPress(customerDetails)}>
          <Image source={require("../../../assets/images/clicon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleMailPress(customerDetails)}>
          <Image source={require("../../../assets/images/mpicon.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.progressContainer}>
      <View style={styles.verticalLine}></View>
      <Text style={styles.statusText}>Progress Status:</Text>
      <View style={styles.itemContainer}>
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.siteVisit) }]}>
          <Icon name={getIconName(status.siteVisit)} size={18} color="white" />
        </View>
        <View style={[
          styles.statusItem, getStatusItemStyle(status.siteVisit)] }>
        <Text style={styles.siteText}>Site Visit</Text>
          <Text style={styles.pcText}>{getStatusText(status.siteVisit)}
        </Text>
        </View>
       </View>
       {(status.siteVisit.isProgress || status.siteVisit.isPending || status.siteVisit.isApproved || status.siteVisit.isRejected || status.siteVisit.isCompleted) && (
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
                <InfoRow label="PickUp Location" value={detail?.pickupAddress || ''} />
              </View>
            ))
          ) : (
            <Text style={{marginLeft: 10}}>No site visit details available.</Text>
          )}
          {!status.siteVisit.isCompleted && userRole === '1' && (
          <>
            <ApproveButton onApprovePress={() => handleApproval('siteVisit')} onRejectPress={() => setisModalVisible(true)} disabled={buttonsDisabled} handleEdit={handleEdit}/>
            <RemarkModal
              visible={ismodalVisible}
              onClose={handleModalClose}
              onSubmit={() => handleReject('siteVisit')}
              category="siteVisit" 
            />
          </>
        )}
        </View>
      )} 
        </>
        )} 
       {status.siteVisit.isPending || status.siteVisit.isApproved || status. siteVisit.isCompleted || status. siteVisit.isRejected ?  
         <TouchableOpacity onPress={()=> toggleDetailsVisibility('siteVisit')}>
          <Text style={styles.detailToggle}>
            {status.siteVisit.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>: null}
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.tokenAdvance) }]}>
          <Icon name={getIconName(status.tokenAdvance)} size={18} color="white" />
        </View>
        <View style={[styles.statusItem, getStatusItemStyle(status.tokenAdvance)]}>
        <Text style={styles.siteText}>Token Advance</Text>
        <Text style={styles.pcText}>{getStatusText(status.tokenAdvance)}</Text>
        </View>
       </View>
       {(!status.tokenAdvance.isProgress && (status.tokenAdvance.isPending || status.tokenAdvance.isApproved || status.tokenAdvance.isRejected || 
       status.tokenAdvance.isCompleted)) && (
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
             {!status.tokenAdvance.isCompleted && userRole === '1' && (
              <>
                  <ApproveButton onApprovePress={()=>handleApproval('tokenAdvance')} onRejectPress={() => setisModalVisible(true)} disabled={buttonsDisabled} handleEdit={handleEdit}/>
                  <RemarkModal
                  visible={ismodalVisible}
                  onClose={handleModalClose}
                  onSubmit={() => handleReject('tokenAdvance')}
                  category="tokenAdvance" 
                />
              </>
             )}
          </View>
              )}
        </>
  
        )}
         {status.tokenAdvance.isPending || status.tokenAdvance.isApproved || status.tokenAdvance.isCompleted || status.tokenAdvance.isRejected ?  
          <TouchableOpacity onPress={()=> toggleDetailsVisibility('tokenAdvance')}>
          <Text style={styles.detailToggle}>
            {status.tokenAdvance.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>: null}
       
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.documentation) }]}>
          <Icon name={getIconName(status.documentation)} size={18} color="white" />
        </View>
        <View style={[styles.statusItem, getStatusItemStyle(status.documentation)]}>
        <Text style={styles.siteText}>Documentation</Text>
          <Text style={styles.pcText}>{getStatusText(status.documentation)}
        </Text>
        </View>
       </View>
       {(!status.documentation.isProgress && (status.documentation.isPending || status.documentation.isApproved || status.documentation.isRejected || 
       status.documentation.isCompleted)) 
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
            {!status.documentation.isCompleted && userRole === '1' && (
            <>
            <ApproveButton onApprovePress={()=>handleApproval('documentation')} onRejectPress={() => setisModalVisible(true)} disabled={buttonsDisabled} handleEdit={handleEdit}/>
            <RemarkModal
              visible={ismodalVisible}
              onClose={handleModalClose}
              onSubmit={() => handleReject('documentation')}
              category="documentation" 
            />
              </>
              )}
            </View>
            )}
          </>
        )}
        {status.documentation.isPending || status.documentation.isApproved || status.documentation.isCompleted || status.documentation.isRejected ?  
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('documentation')}>
          <Text style={styles.detailToggle}>
            {status.documentation.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>: null }
        <View style={styles.statusContainer}>
        <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.payment) }]}>
          <Icon name={getIconName(status.payment)} size={18} color="white" />
        </View>
        <View style={[styles.statusItem, getStatusItemStyle(status.payment)]}>
        <Text style={styles.siteText}>Payment</Text>
        <Text style={styles.pcText}>{getStatusText(status.payment)}</Text>
        </View>
       </View>
       {(!status.payment.isProgress && (status.payment.isPending || status.payment.isApproved || status.payment.isRejected || 
       status.payment.isCompleted)) 
        && (
          <>
            {status.payment.detailsVisible && (
              <View style={{width: '100%', marginLeft: 10}}>
                <Text style={styles.details}>Payment Details</Text>
                <InfoRow label="Amount Paid" value={`₹${status.payment.totalAmount?.toFixed(2) || ''}`} />
                <InfoRow label="Modes of Payment" value={status.payment.uniqueModes?.join(', ') || ''} />
                <InfoRow label="Dates" value={status.payment.uniqueDates || ''} />
                {(!status.payment.isCompleted && statusChangeRequestId  && userRole === '1') && (
              <>
                <ApproveButton onApprovePress={() => handleApproval('payment')} onRejectPress={() => setisModalVisible(true)} disabled={buttonsDisabled} handleEdit={handleEdit}/>
                <RemarkModal
                  visible={ismodalVisible}
                  onClose={handleModalClose}
                  onSubmit={() => handleReject('payment')}
                  category="payment" 
                />
              </>
              )}
              </View>
            )}
          </>
        )}
        {status.payment.isPending || status.payment.isApproved || status.payment.isCompleted || status.payment.isRejected ?  
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('payment')}>
          <Text style={styles.detailToggle}>
            {status.payment.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>: null }
        <View style={styles.statusContainer}>
          <View style={[styles.checkicon, { backgroundColor: getStatusColor(status.ddDelivery) }]}>
            <Icon name={getIconName(status.ddDelivery)} size={18} color="white" />
          </View>
        <View style={[styles.statusItem, getStatusItemStyle(status.ddDelivery)]}>
        <Text style={styles.siteText}>Document Delivery</Text>
          <Text style={styles.pcText}>{getStatusText(status.ddDelivery)}</Text>
        </View>
       </View>
        {(!status.ddDelivery.isProgress && (status.ddDelivery.isPending || status.ddDelivery.isApproved || status.ddDelivery.isRejected || 
       status.ddDelivery.isCompleted)) 
        && (
          <>
          {status.ddDelivery.detailsVisible && (
          <View style={{width: '100%', marginLeft: 10}}>
            <Text style={styles.details}>Document Delivery Details</Text>
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
        {status.ddDelivery.isProgress ? (
                 <View style={{width: '80%', marginLeft: 20}}>
                <Text style={styles.pcText}>Upload In Progress</Text>
                </View>
          ) : null}
        {status.ddDelivery.isPending || status.ddDelivery.isCompleted || status.ddDelivery.isRejected || status.ddDelivery.isApproved ?
        <TouchableOpacity onPress={()=> toggleDetailsVisibility('ddDelivery')}>
          <Text style={styles.detailToggle}>
            {status.ddDelivery.detailsVisible ? 'Less Details' : 'More Details >>>'}
          </Text>
        </TouchableOpacity>
        : null
        } 
      </View>
      </View>
    </ScrollView>
    </View>
  );
};



export default AdminCustomerDetails;