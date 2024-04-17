import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';
import { useCustomers } from '../../contexts/useCustomerdata';




const AdminCustomerList = ({route, navigation}) => {

  const globalCustomers = useCustomers();
  const routeCustomers = route.params?.allCustomers;
  const customerData = routeCustomers || globalCustomers;
  
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
        <CustomerCard customerData={customerData} isHorizontal={false}  onCardPress={() => {
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