import React, { useEffect, useState} from 'react';
import { View, ScrollView} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactCard from '../../components/ContactCard';
import styles from '../../constants/styles/customercontactscreenstyles';
import { useSoCustomers } from '../../contexts/useSoCustomersData';


const CustomerData = [
    {
        id: '1',
        name: 'Suraj',
        number: '+91-9486077810',
        mailId: 'suraj@gmail.com', 
        progress: "Site Visit",
        personimage: require('../../../assets/images/person.png'),
    },
    {
        id: '2',
        name: 'Ravi',
        number: '+91-9486077810',
        mailId: 'ravi@gmail.com', 
        progress: "Token Advance",
        personimage: require('../../../assets/images/person.png'),
    },
    {
        id: '3',
        name: 'Darshan',
        number: '+91-9486077810',
        mailId: 'darshan@gmail.com', 
        progress: "Documentation",
        personimage: require('../../../assets/images/person.png'),
    }
]




const CustomerContactScreen = ({route, navigation}) => {
  const [customers, setCustomers] = useState([]);
  const soCustomers = useSoCustomers()
  console.log("global",soCustomers)
  const routeCustomers = route.params?.customers;
  const customerData = routeCustomers || soCustomers;

  useEffect(() => {
    // Check if customers are passed through params, else set dummy data
    if (customerData) {
      // Transform and set the customers passed through navigation params
      setCustomers(customerData.map(customer => ({
        ...customer,
        progress: "Initial Contact", // Dummy progress state
        personimage: require('../../../assets/images/person.png'), // Default image path
      })));
    } else {
      // No customers passed in params, consider fetching here or set dummy data
      setCustomers(CustomerData); // CustomerData from your static list above
    }
  }, [routeCustomers, soCustomers]);


  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="Contact Form"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ContactCard customerData={customers} onCardPress={(customerId) => {
            navigation.navigate("SO Client", { 
              screen: "SO Customer Details",
              params: { customerId: customerId } // Pass customerId to the detail screen
          })
        }}/>
      </View>
    </ScrollView>
    </View>
  );
};


export default CustomerContactScreen;