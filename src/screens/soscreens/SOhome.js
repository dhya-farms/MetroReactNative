import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StatusBar, ActivityIndicator} 
from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import ShowAllButton from '../../components/ShowAllButton';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import CustomerCard from '../../components/CustomerCard';
import SiteDetailsCard from '../../components/SiteDetailsCard';
import styles from '../../constants/styles/sohomestyles';
import { fetchSoDetails } from '../../apifunctions/fetchSoDetailsApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSoCustomers } from '../../apifunctions/fetchSoCustomersApi';
import { fetchCommonProperties } from '../../apifunctions/fetchCommonProperties';
import { fetchUpdates } from '../../apifunctions/fetchUpdatesApi';




const SOhome = ({route, navigation}) => {
  const [advisor, setAdvisor] = useState({});
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [soNextPageUrl, setSoNextPageUrl] = useState(null)
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [loadingSo, setLoadingSo] = useState(true)
  const [updates, setUpdates] = useState([])
  const [nextUpdatesPageUrl, setNextUpdatesPageUrl] = useState(null)

  const initializeScreen = async () => {
    const paramsToken = route.params?.token;
    const paramsAdvisorId = route.params?.userId || await AsyncStorage.getItem('userId');

    fetchProperties(paramsToken);
    fetchCustomers(paramsToken, paramsAdvisorId);
    fetchedUpdates(paramsToken);
    fetchAdvisorDetails(paramsAdvisorId, paramsToken);
  };

  useEffect(() => {
    initializeScreen();
  }, []);

  const fetchProperties = async (token) => {
    try {
      const { properties, nextPageUrl } = await fetchCommonProperties(token);
      const sortedProperties = properties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProperties(sortedProperties);
      setNextPageUrl(nextPageUrl);
      setLoadingProperties(false);
    } catch (error) {
      console.error('Error fetching common properties:', error);
    }
  };

  const fetchCustomers = async (token, soId) => {
    setLoadingCustomers(true);
    try {
      const { customers, nextPageUrl } = await fetchSoCustomers(token, soId);
      if (!customers.error) {
        const sortedCustomers = customers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setCustomers(sortedCustomers);
        setSoNextPageUrl(nextPageUrl);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
    setLoadingCustomers(false);
  };

  const fetchedUpdates = async (token) => {
    try {
      const updates = await fetchUpdates(token);
      if (!updates.error) {
        const sortedUpdates = updates.updates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUpdates(sortedUpdates);
        setNextUpdatesPageUrl(updates.nextPageUrl);
        setLoadingUpdates(false);
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const fetchAdvisorDetails = async (advisorId, token) => {
    try {
      const advisorDetails = await fetchSoDetails(advisorId, token);
      setAdvisor(advisorDetails);
      setLoadingSo(false);
    } catch (error) {
      console.error('Failed to fetch advisor details:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const paramsToken = route.params?.token;
      const paramsSoId = route.params?.userId;
      fetchCustomers(paramsToken, paramsSoId);
    }, [route.params?.token, route.params?.userId])
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
      {loadingSo ? (
      <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
        ) : advisor && advisor.name ? (
        <View style={styles.userContainer}>
          <View style={styles.userNameContainer}>
              <Text style={styles.unText}>Good Morning</Text>
              <Text style={[styles.unText, {fontWeight: '600', fontSize: 20}]}>{`Mr. ${advisor.name} (SO)`}</Text>
          </View>
          <View style={styles.imageContainer}>
          <Image
              source={require('../../../assets/images/gsoperson.jpg')}
              style={styles.userImage}
            />
          </View>
        </View>
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>No Sales Officer Data Available</Text>
        </View>
      )}
      <ShowAllButton text="Office Updates" onPress={() => {
            navigation.navigate("SO Home", { screen: "Office Updates", params: { updates: updates, nextPage: nextUpdatesPageUrl}});
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
      <ShowAllButton text="Customers"  onPress={()=> navigation.navigate("SO Client", { 
          screen: "Customer Contact Screen" ,
          params: { customers: customers, nextPage: soNextPageUrl}
        })}/>
      {loadingCustomers ? (
        <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
     ): customers.length > 0 ? (
      <View style={{width: '100%'}}>
        <CustomerCard customerData={customers} onCardPress={(customerId) => {
            navigation.navigate("SO Client", { 
              screen: "SO Customer Details",
              params: { customerId: customerId, backScreen: "Home" } 
          })
        }}/>
      </View>
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>Customers Not Assigned Yet</Text>
        </View>
      )}
      <View style={styles.separator} />
      <ShowAllButton text="Site Details" onPress={()=> navigation.navigate("SO Sites", { 
      screen: "SO Properties" , params: { properties: properties, nextPage: nextPageUrl}})} />
      {loadingProperties ? (
       <ActivityIndicator size="large" color="#1D9BF0" style={styles.loadingIndicator} />
      ) : properties.length > 0 ? (
      <View style={{width: '100%'}}>
        <SiteDetailsCard
        siteData={properties}
        onCardPress={(propertyId, phaseId) => {
          navigation.navigate("SO Sites", {
            screen: "SO Properties Details",
            params: { propertyId: propertyId , phaseId: phaseId, backScreen: "Home"},
          });
        }}
      />
      </View>
       ) : (
        <View style={styles.npContainer}>
            <Text style={styles.nopText}>No New Projects for now</Text>
        </View>
      )}
    </ScrollView>
    </View>
  );
};

export default SOhome;