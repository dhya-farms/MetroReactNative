import React, { useEffect, useState} from 'react';
import { View, ScrollView} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactCard from '../../components/ContactCard';
import styles from '../../constants/styles/customercontactscreenstyles';
import { listCustomers } from '../../apifunctions/listCustomersApi';


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




const CustomerContactScreen = ({navigation}) => {
  const [apiCustomers, setApiCustomers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        try {
            const customers = await listCustomers();
            // Transform if needed, or directly set the fetched data
            const customerData = customers.map((customer, index) => ({
              id: (index + 1).toString(), // Generate an ID
              name: customer.name,
              number: customer.mobile_no,
              mailId: `${customer.name.toLowerCase()}@example.com`, // Dummy email ID
              progress: "Initial Contact", // Dummy progress state
              personimage: require('../../../assets/images/person.png'), // Default image path
          }));

          setApiCustomers(customerData)
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    loadData();
}, []);

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="Contact Form"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ContactCard customerData={apiCustomers} onCardPress={() => {
            navigation.navigate("SO Client", { screen: "SO Customer Details"});
        }}/>
      </View>
    </ScrollView>
  );
};


export default CustomerContactScreen;