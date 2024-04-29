import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';
import { useCustomers } from '../../contexts/useCustomerdata';




const AdminCustomerList = ({route, navigation}) => {

  const globalCustomers = useCustomers();
  const routeCustomers = route.params?.allCustomers;
  const customerData = routeCustomers || globalCustomers;
  
  return (
    <View style={styles.mainContainer}>
       <StatusBar/>
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>navigation.goBack()}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      {customerData.length > 0 ? (
        <View style={{ zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <SortHeader title="Customer List" />
        </View>
      ) : null}
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      {customerData.length > 0 ? (
        <CustomerCard customerData={customerData} isHorizontal={false}  onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: 'CustomerList' } // Pass customerId to the detail screen
            });

          }}/> ) : (
            <Text style={styles.noDataText}>No property assigned yet to the Sales Officer</Text>
      )}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  filterText: {
    color: '#ffffff',
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    color: 'grey'
  }
});

export default AdminCustomerList;