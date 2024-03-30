import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';


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




const AdminCustomerList = ({navigation}) => {

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <StatusBar/>
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="Customer List"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <CustomerCard customerData={CustomerData} isHorizontal={false}  onCardPress={() => {
            navigation.navigate("Client", { screen: "List Customer Details"});
        }}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  filterText: {
    color: '#ffffff',
  }
  
});

export default AdminCustomerList;