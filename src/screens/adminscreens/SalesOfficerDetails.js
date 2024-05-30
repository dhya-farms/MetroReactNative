import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Linking} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import axios from 'axios';
import SoProfileHeader from '../../components/SoProfileHeader';
import { fetchStatusRequests } from '../../apifunctions/fetchStatusRequests';
import { fetchCustomers } from '../../apifunctions/fetchCustomerApi';
import getEnvVars from '../../../config';
const { BASE_URL } = getEnvVars();



const SalesOfficerDetails = ({route, navigation}) => {
    
    const { SoId } = route.params?.params || {};
    const soUsers = route.params?.soUsers
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [soDetails, setSoDetails] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [soRequests, setSoRequests] = useState([]);
    const [backscreen, setBackScreen] = useState('')
    const [bsSoId, setBsSoId ] = useState(null)
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [nextCustomerPageUrl, setNextCustomerPageUrl] = useState(null)

    useEffect(() => {
      const effectiveSoId = SoId || route.params?.SoId;
      setBsSoId(effectiveSoId)
  
      const fetchCustomerDetails = async () => {
          if (!effectiveSoId) {
              console.log("No So ID provided");
              setError("No So ID provided");
              setLoading(false);
              return;
          }

          const nestedBackScreen = route.params?.params?.backScreen;
          const directBackScreen = route.params?.backScreen;
          const effectiveBackScreen = nestedBackScreen || directBackScreen;
          console.log("Effective Back Screen for use:", effectiveBackScreen);
        
            if (effectiveBackScreen) {
              console.log("Navigated from:", effectiveBackScreen);
              setBackScreen(effectiveBackScreen)
            } else {
              console.log("No Back Screen provided in route params.");
            }
  
          setLoading(true);
          try {
              const response = await axios.get(`${BASE_URL}/users/${effectiveSoId}/`);
              console.log("Fetch success for SO details:", response.data);
              setSoDetails(response.data);
          } catch (error) {
              console.error("Fetch error for SO details:", error);
              setError(error.response ? error.response.data.message : error.message);
          }

          try {
            const response = await fetchStatusRequests(null, effectiveSoId);
            setSoRequests(response.soRequests);
            console.log("so" , response.soRequests)
            setNextPageUrl(response.nextPageUrl);
          } catch (error) {
            console.error("Failed to fetch status requests:", error);
            setError(error.response ? error.response.data.message : error.message);
          }

          try {
            const {customers: fetchedCustomers, nextPageUrl: nextPage} = await fetchCustomers(null, effectiveSoId);
            if (!fetchedCustomers.error) {
              setCustomers(fetchedCustomers);
              setNextCustomerPageUrl(nextPage)
            } else {
              console.error('Error fetching customers:', fetchedCustomers.error);
            }
          } catch (error) {
            console.error('Error fetching customers:', error);
          } finally {
              setLoading(false);
          }
      };
  
      fetchCustomerDetails();
  }, [SoId, route.params]);

    const handleWhatsAppPress = () => {
      let whatsappUrl = `https://wa.me/${soDetails.mobile_no}`;
      Linking.openURL(whatsappUrl).catch(err => console.error('An error occurred', err));
    };
  
    const handleCallPress = () => {
      const callLink = `tel:${soDetails.mobile_no}`;
      Linking.openURL(callLink);
    };
  
    const handleMailPress = () => {
      let emailUrl = `mailto:${soDetails.email}`;
      Linking.openURL(emailUrl).catch(err => console.error('An error occurred', err));
    };

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }
  
    if (!soDetails) {
      return <Text>No so details available.</Text>;
    }

    const handleBack = () => {
      if (backscreen==="Home") {
        navigation.navigate("Home", {
          screen: "Admin Home",
        });
      
      } else if(backscreen==="SOList"){
        navigation.navigate("SO", { 
          screen: "SO Officers List" ,
          params: { soUsers: soUsers}
        })  
      }  else if(backscreen==="SOManager"){
        navigation.navigate("SO", { 
          screen: "So Manager" ,
        })
        
      } else {
        navigation.goBack();
      }
    };
    
  return (
    <View style= {styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Sales Officer Details" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>navigation.goBack()}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View
        style={styles.linearGradient}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../../assets/images/gsoperson.jpg')} // Replace with your dummy image path
            style={styles.avatar}
          />
        </View>
        <Text style={styles.nameText}>{soDetails.name}</Text>
      </View>
      <View style={styles.smIconsContainer}>
        <TouchableOpacity style={{marginHorizontal: 20}} onPress={handleWhatsAppPress}>
        <Image source={require("../../../assets/images/wpicon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 20}} onPress={handleCallPress}>
        <Image source={require("../../../assets/images/clicon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 20}} onPress={handleMailPress}>
        <Image source={require("../../../assets/images/mpicon.png")}/>
        </TouchableOpacity>
        </View>
        <SoProfileHeader soDetails={soDetails}/>
        <View style={styles.acContainer}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("SO", { 
                screen: "SO Approvals" ,
                params: {         
                  soRequests: soRequests,
                  nextPage: nextPageUrl,
                  effectiveSoId: bsSoId}
              })}>
                <Text style={styles.btnText}>Approvals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'white',
             borderWidth: 1, borderColor: '#1D9BF0'}]} onPress={()=> navigation.navigate("Client", { 
              screen: "Customer List" ,
              params: { allCustomers: customers, nextPage: nextCustomerPageUrl, effectiveSoId: bsSoId }
           })}>
                <Text style={[styles.btnText, {color: '#1D9BF0'}]}>Customers</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  linearGradient: {
    borderBottomLeftRadius: 99,
    borderBottomRightRadius: 99,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1D9BF0',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 68,
    backgroundColor: 'white', // Placeholder for the image
  },
  nameText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#424242',
  },
  soTextContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5
  },
  smIconsContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    height: 45, // Set the height
    backgroundColor: 'white', // Set the background color
    marginVertical: 5,
    marginRight: 10,
    borderColor: '#1D9BF0',
    // Add a bottom margin
  },
  tiContainer:{
    width: '90%', 
    marginHorizontal: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  acContainer:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  button:{
    width: 110,
    height: 36,
    backgroundColor: '#1D9BF0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF'
  }
});

export default SalesOfficerDetails;