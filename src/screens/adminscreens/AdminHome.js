import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StatusBar, ActivityIndicator} 
from 'react-native';
import ShowAllButton from '../../components/ShowAllButton';
import SOcards from '../../components/SOcard';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import CustomerCard from '../../components/CustomerCard';
import SiteDetailsCard from '../../components/SiteDetailsCard';
import styles from '../../constants/styles/adminhomestyles';
import { fetchCustomers } from '../../apifunctions/fetchCustomerApi';
import { fetchAdminProperties } from '../../apifunctions/fetchAdminPropertiesApi';
import { fetchSoUsers } from '../../apifunctions/fetchSoApi';
import { fetchUpdates } from '../../apifunctions/fetchUpdatesApi';
import { useFocusEffect } from '@react-navigation/native';




const AdminHome = ({ route, navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [soUsers, setSoUsers] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [nextCustomerPageUrl, setNextCustomerPageUrl] = useState(null)
  const [nextSoPageUrl, setNextSoPageUrl] = useState(null)
  const [updates, setUpdates] = useState([])
  const [nextUpdatesPageUrl, setNextUpdatesPageUrl] = useState(null)
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingAdminProperties, setLoadingAdminProperties] = useState(true); 
  const [loadingSoUsers, setLoadingSoUsers]= useState(true)


  const initializeScreen = async () => {
    const paramsToken = route.params?.token;
    const paramsDirectorId = route.params?.userId;

    fetchAdminCustomers(paramsToken);
    fetchedAdminUpdates(paramsToken);
    fetchProperties(paramsToken, paramsDirectorId);
    fetchSoDetails(paramsToken);
  };

  useEffect(() => {
    initializeScreen();
  }, []);

  const fetchProperties = async (token, paramsDirectorId) => {
    try {
      const { properties: fetchedProperties, nextPageUrl: nextPage } = await fetchAdminProperties(token, paramsDirectorId);
      if (fetchedProperties.length > 0) {
        const sortedProperties = fetchedProperties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProperties(sortedProperties);
        setNextPageUrl(nextPage)
        setLoadingAdminProperties(false)
      } else {
        console.log('No properties fetched, array is empty');
      }
    } catch (error) {
      console.error('Error fetching admin properties:', error);
    }
  };

  const fetchAdminCustomers = async (token) => {
    setLoadingCustomers(true)
    try {
      const {customers: fetchedCustomers, nextPageUrl: nextPage} = await fetchCustomers(token);
      if (!fetchedCustomers.error) {
        const sortedCustomers = fetchedCustomers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setCustomers(sortedCustomers);
        setNextCustomerPageUrl(nextPage)
        
      } else {
        console.error('Error fetching customers:', fetchedCustomers.error);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
    setLoadingCustomers(false)
  };

  const fetchedAdminUpdates = async (token) => {
    try {
      const {updates: fetchedUpdates, nextPageUrl: nextPage} = await fetchUpdates(token);
      if (!fetchedUpdates.error) {
        const sortedUpdates = fetchedUpdates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUpdates(sortedUpdates);
        setNextUpdatesPageUrl(nextPage)
        setLoadingUpdates(false)
      } else {
        console.error('Error fetching customers:', fetchedUpdates.error);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchSoDetails = async (token) => {
    try {
      const {data: fetchedSOData, nextPageUrl: nextPage} = await fetchSoUsers(token);
      if (fetchedSOData.error) {
        console.error(fetchedSOData.error);
      } else {
        console.log(fetchedSOData)
        const transformedData = fetchedSOData.results.map(user => ({
          id: user.id,
          name: user.name,
          number: user.mobile_no,
          mailId: user.email,
          created_at: user.created_at,
          points: `${user.points} Metro Points`,  // Dummy data
          clients: `${user.clients} Clients`,  // Dummy data
          source: require('../../../assets/images/soperson.png')  // Assuming a placeholder image
        }));

        transformedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setSoUsers(transformedData);
        setNextSoPageUrl(nextPage)
        setLoadingSoUsers(false)
      }
    } catch (error) {
      console.error('Error fetching SO users:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const paramsToken = route.params?.token;
      fetchAdminCustomers(paramsToken);
    }, [route.params?.token])
  );


  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
        <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require('../../../assets/images/belliconblue.png')}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ShowAllButton text="Office Updates" onPress={() => {
            navigation.navigate("Home", { screen: "Admin Office Updates", params: { updates: updates, nextPage: nextUpdatesPageUrl}});
        }}/>
      {loadingUpdates ? (
        <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
      ): updates.length ? (
      <View style={{width: '100%'}}>
        <OfficeUpdateView cardData={updates} textContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}/>
      </View>
      ) : (
        <View style={styles.npContainer}>
            <Text style={styles.nopText}>No New Updates for now</Text>
        </View>
     )}
      <View style={styles.separator} />
      <ShowAllButton text="Customers" onPress={()=> navigation.navigate("Client", { 
      screen: "Customer List" ,
      params: { allCustomers: customers, nextPage: nextCustomerPageUrl, backScreen: 'Home' }
    })}/>
    {loadingCustomers ? (
        <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
    ): customers.length > 0 ? (
      <View style={{width: '100%'}}>
          <CustomerCard customerData={customers.slice(0, 3)} onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: 'Home'} // Pass customerId to the detail screen
            });

          }}/>
      </View>
    ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>Error Occurred. Please Try Again</Text>
      </View>
    )}
      <ShowAllButton text="Site Details" onPress={()=> 
      navigation.navigate("Sites", { screen: "Admin Properties", 
            params: { properties: properties, nextPage: nextPageUrl}
    })}/>
    {loadingAdminProperties ? (
        <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
    ): properties.length > 0 ? (
      <View style={{width: '100%'}}>
      <SiteDetailsCard
        siteData={properties}
        onCardPress={(propertyId, phaseId) => {
          navigation.navigate("Sites", {
            screen: "Admin Properties Details",
            params: {
              propertyId: propertyId,
              phaseId: phaseId,
              backScreen: "Home"  // Indicating that the navigation originated from the Properties screen
            }
          });
        }}
      />
    </View>
     ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No New Projects For Now</Text>
      </View>
    )}

    <ShowAllButton text="SO List" onPress={()=> 
         navigation.navigate("SO", { 
          screen: "SO Officers List" ,
          params: { soUsers: soUsers, nextPage: nextSoPageUrl, backScreen: 'Home'}
        })}/>
    {loadingSoUsers ? (
        <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
    ): soUsers.length > 0 ? (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
        <SOcards data={soUsers} onCardPress={(SoId) => {
           navigation.navigate("SO", {
            screen: "SO Officers Details",
            params: { SoId: SoId, backScreen: 'Home'  },
          });
        }}/>
      </View>
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>No SO Officers Assigned Yet</Text>
        </View>
      )}
    </ScrollView>
    </View>
  );
};

export default AdminHome;