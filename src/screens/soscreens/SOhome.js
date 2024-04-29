import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StatusBar, ActivityIndicator} 
from 'react-native';
import ShowAllButton from '../../components/ShowAllButton';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import CustomerCard from '../../components/CustomerCard';
import SiteDetailsCard from '../../components/SiteDetailsCard';
import styles from '../../constants/styles/sohomestyles';
import { fetchSoDetails } from '../../apifunctions/fetchSoDetailsApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSoCustomers } from '../../apifunctions/fetchSoCustomersApi';
import { fetchCommonProperties } from '../../apifunctions/fetchCommonProperties';


const cardData = [
    {
      id: '1',
      name: 'Mr. Muralitharan',
      date: 'Sep 12th, 2022',
      title: 'METRO SHIVA SHAKTHI RESIDENCY',
      description: 'Total 190 plots from 720 sqft to 2500 sqft - Kinathukadavu, Arasampalayam',
      source: require('../../../assets/images/plotimage.png'), 
      personimage: require('../../../assets/images/ceoimage.png')// Replace with your actual image source
    },
    {
        id: '2',
        name: 'Mr. Muralitharan',
        date: 'Sep 12th, 2022',
        title: 'METRO SHIVA SHAKTHI RESIDENCY',
        description: 'Total 190 plots from 720 sqft to 2500 sqft - Kinathukadavu, Arasampalayam',
        source: require('../../../assets/images/plotimage.png'),
        personimage: require('../../../assets/images/ceoimage.png') // Replace with your actual image source
    },
  ]




const SOhome = ({route, navigation}) => {
  const [advisor, setAdvisor] = useState({});
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeScreen = async () => {
      setLoading(true);
      const paramsToken = route.params?.token;
      let paramsAdvisorId = route.params?.userId;
      const paramsSoId = route.params?.userId;

      if (!paramsAdvisorId) {
        // If paramsAdvisorId is not available, get userId from AsyncStorage
        paramsAdvisorId = await AsyncStorage.getItem('userId');
      }

      try {

        const commonProperties = await fetchCommonProperties(paramsToken);
        if (!commonProperties.error) {
          setProperties(commonProperties);
        } else {
          console.error('Error fetching properties:', commonProperties.error);
        }
      } catch (error) {
        console.error('Error fetching admin properties:', error);
      }

      try {
        const fetchedCustomers = await fetchSoCustomers(paramsToken, paramsSoId);
        if (!fetchedCustomers.error) {
          setCustomers(fetchedCustomers);
        } else {
          console.error('Error fetching customers:', fetchedCustomers.error);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }

      try {
        const advisorDetails = await fetchSoDetails(paramsAdvisorId, paramsToken);
        setAdvisor(advisorDetails);
        console.log(advisorDetails)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    initializeScreen();
  }, [route.params?.token, route.params?.userId]);
  
  if (loading) {
    // Return a loader or indicate loading state
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
      <ShowAllButton text="Office Updates"  onPress={() => {
            navigation.navigate("SO Home", { screen: "Office Updates"});
        }}/>
      <View style={{width: '100%'}}>
        <OfficeUpdateView cardData={cardData}
        textContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Customers"  onPress={()=> navigation.navigate("SO Client", { 
          screen: "Customer Contact Screen" ,
          params: { customers: customers }
        })}/>
      <View style={{width: '100%'}}>
        <CustomerCard customerData={customers.slice(0, 3)} onCardPress={(customerId) => {
            navigation.navigate("SO Client", { 
              screen: "SO Customer Details",
              params: { customerId: customerId } // Pass customerId to the detail screen
          })
        }}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Site Details" onPress={()=> navigation.navigate("SO Sites", { 
      screen: "SO Properties" , params: { properties: properties}})} />
      <View style={{width: '100%'}}>
        <SiteDetailsCard
        siteData={properties.slice(0,3)}
        onCardPress={(propertyId) => {
          navigation.navigate("SO Sites", {
            screen: "SO Properties Details",
            params: { propertyId: propertyId },
          });
        }}
      />
      </View>
    </ScrollView>
    </View>
  );
};

export default SOhome;