import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, StatusBar} 
from 'react-native';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import ShowAllButton from '../../components/ShowAllButton';
import SOcards from '../../components/SOcard';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import CustomerCard from '../../components/CustomerCard';
import SiteDetailsCard from '../../components/SiteDetailsCard';
import styles from '../../constants/styles/sohomestyles';


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


const SOhome = ({navigation}) => {
  

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
      <View style={styles.userContainer}>
        <View style={styles.userNameContainer}>
            <Text style={styles.unText}>Good Morning</Text>
            <Text style={[styles.unText, {fontWeight: '600', fontSize: 20}]}>Mr.Dharshan (SO)</Text>
        </View>
        <View style={styles.imageContainer}>
        <Image
            source={require('../../../assets/images/gsoperson.jpg')}
            style={styles.userImage}
          />
        </View>
      </View>
      <ShowAllButton text="Office Updates"/>
      <View style={{width: '100%'}}>
        <OfficeUpdateView cardData={cardData}
        textContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Customers" onPress={() => {
            navigation.navigate("SO Client", { screen: "Customer Contact Screen"});
        }}/>
      <View style={{width: '100%'}}>
        <CustomerCard customerData={CustomerData} onCardPress={() => {
            navigation.navigate("SO Client", { screen: "SO Customer Details"});
        }}/>
      </View>
      <View style={styles.separator} />
      <ShowAllButton text="Site Details" onPress={()=> navigation.navigate("SO Sites", { 
      screen: "SO Properties" })}/>
      <View style={{width: '100%'}}>
        <SiteDetailsCard siteData={siteData} onCardPress={() => {
            navigation.navigate("SO Sites", { screen: "SO Properties Details"});
        }}/>
      </View>
    </ScrollView>
  );
};

export default SOhome;