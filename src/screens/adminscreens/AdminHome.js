import React, { useEffect, useState } from 'react';
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



const AdminHome = ({ route, navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [soUsers, setSoUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    setLoading(true);
    const paramsToken = route.params?.token;
    // Fetch customers
    try {
      const fetchedCustomers = await fetchCustomers(paramsToken);
      if (!fetchedCustomers.error) {
        setCustomers(fetchedCustomers);
      } else {
        console.error('Error fetching customers:', fetchedCustomers.error);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }

    // Fetch properties
    try {
      const paramsDirectorId = route.params?.userId;
      const adminProperties = await fetchAdminProperties(paramsToken, paramsDirectorId);
      if (!adminProperties.error) {
        setProperties(adminProperties);
      } else {
        console.error('Error fetching properties:', adminProperties.error);
      }
    } catch (error) {
      console.error('Error fetching admin properties:', error);
    }
    // Fetch SO Users
    try {
      const fetchedSOData = await fetchSoUsers(paramsToken);
      if (fetchedSOData.error) {
        console.error(fetchedSOData.error);
      } else {
        const transformedData = fetchedSOData.details.results.map(user => ({
          id: user.id,
          name: user.name,
          number: user.mobile_no,
          mailId: user.email,
          points: '10Metro Points',  // Dummy data
          clients: '5 Clients',  // Dummy data
          source: require('../../../assets/images/soperson.png')  // Assuming a placeholder image
        }));
        setSoUsers(transformedData);
      }
    } catch (error) {
      console.error('Error fetching SO users:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [route.params?.token]);

  if (loading) {
    // Return a loader or indicate loading state
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  // Rest of your component code goes here...

  

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
      <ShowAllButton text="Office Updates"/>
      <View style={{width: '100%'}}>
        <OfficeUpdateView cardData={cardData}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Customers" onPress={()=> navigation.navigate("Client", { 
      screen: "Customer List" ,
      params: { allCustomers: customers, backScreen: 'Home' }
    })}/>
      <View style={{width: '100%'}}>
          <CustomerCard customerData={customers.slice(0, 3)} onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: 'Home'} // Pass customerId to the detail screen
            });

          }}/>
      </View>
      <ShowAllButton text="Site Details" onPress={()=> 
      navigation.navigate("Sites", { screen: "Admin Properties", 
            params: { properties: properties}
    })}/>
      <View style={{width: '100%'}}>
      <SiteDetailsCard
        siteData={properties}
        onCardPress={(propertyId) => {
          navigation.navigate("Sites", {
            screen: "Admin Properties Details",
            params: {
              propertyId: propertyId,
              backScreen: "Home"  // Indicating that the navigation originated from the Properties screen
            }
          });
        }}
      />
    </View>

    <ShowAllButton text="SO List" onPress={()=> 
         navigation.navigate("SO", { 
          screen: "SO Officers List" ,
          params: { soUsers: soUsers, backScreen: 'Home'}
        })}/>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
        <SOcards data={soUsers} onCardPress={(SoId) => {
           navigation.navigate("SO", {
            screen: "SO Officers Details",
            params: { SoId: SoId, backScreen: 'Home'  },
          });
        }}/>
      </View>
    </ScrollView>
    </View>
  );
};

export default AdminHome;