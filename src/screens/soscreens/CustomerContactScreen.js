import React from 'react';
import { View, ScrollView, StyleSheet} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactCard from '../../components/ContactCard';
import styles from '../../constants/styles/customercontactscreenstyles';


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
        <ContactCard customerData={CustomerData} onCardPress={() => {
            navigation.navigate("SO Client", { screen: "SO Customer Details"});
        }}/>
      </View>
    </ScrollView>
  );
};


export default CustomerContactScreen;