import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, StatusBar} 
from 'react-native';
import ShowAllButton from '../../components/ShowAllButton';
import SOcards from '../../components/SOcard';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import CustomerCard from '../../components/CustomerCard';
import SiteDetailsCard from '../../components/SiteDetailsCard';


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

const CustomerData = [
    {
        id: '1',
        name: 'Suraj',
        number: '+91-9486077810',
        mailId: 'suraj@gmail.com', 
        personimage: require('../../../assets/images/person.png'),
    },
    {
        id: '2',
        name: 'Ravi',
        number: '+91-9486077810',
        mailId: 'ravi@gmail.com', 
        personimage: require('../../../assets/images/person.png'),
    },
    {
        id: '3',
        name: 'Darshan',
        number: '+91-9486077810',
        mailId: 'darshan@gmail.com', 
        personimage: require('../../../assets/images/person.png'),
    }
]

const siteData = [
    {
        id: '1',
        sitename: 'Individuval flats 240 BHK',
        price: 'Starts @ ₹2499/sqft', 
        bgimage: require('../../../assets/images/Sarav.png'),
    },
    {
        id: '2',
        sitename: 'Single flats 240 BHK',
        price: 'Starts @ ₹2499/sqft', 
        bgimage: require('../../../assets/images/Sarav2.png'),
    },
    {
        id: '3',
        sitename: 'Single flats 240 BHK',
        price: 'Starts @ ₹2499/sqft', 
        bgimage: require('../../../assets/images/Sarav2.png'),
    }
]

const SOdata  = [
    {
        id: 1,
        name: 'Hari Kowshick',
        number: '+91-9486077810',
        mailId: 'hari@gmail.com',
        points: '7Metro Points',
        clients: '3 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 2,
        name: 'Ranjith',
        number: '+91-9486077810',
        mailId: 'ranjith@gmail.com',
        points: '6Metro Points',
        clients: '2 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 3,
        name: 'Dinesh',
        number: '+91-9486077810',
        mailId: 'dinesh@gmail.com',
        points: '10Metro Points',
        clients: '5 Clients',
        source: require('../../../assets/images/soperson.png')
    }
]


const AdminHome = ({navigation}) => {
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
      <ShowAllButton text="Office Updates"/>
      <View style={{width: '100%'}}>
        <OfficeUpdateView cardData={cardData}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Customers" onPress={()=> navigation.navigate("Client", { 
      screen: "Customer List" 
    })}/>
      <View style={{width: '100%'}}>
        <CustomerCard customerData={CustomerData} navigation={navigation}/>
      </View>
      <ShowAllButton text="Site Details" onPress={()=> navigation.navigate("Sites", { 
      screen: "Admin Properties" 
    })}/>
      <View style={{width: '100%'}}>
        <SiteDetailsCard siteData={siteData} navigation={navigation}/>
      </View>
      <ShowAllButton text="SO List" onPress={()=> navigation.navigate("SO", { 
      screen: "SO Officers List" 
    })}/>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
        <SOcards data={SOdata} navigation={navigation}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15, // Adjust padding as needed
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins'
  },
  filterButton: {
    // Define if you need specific styles for your button
  },
  bellIcon: {
    width: 34, // Adjust size as needed
    height: 34, // Adjust size as needed
  },
  separator: {
    height: 1,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 16,
  },
});

export default AdminHome;