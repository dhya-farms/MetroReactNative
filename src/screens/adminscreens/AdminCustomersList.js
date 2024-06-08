import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar, Text, ActivityIndicator, FlatList} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';
import { useCustomers } from '../../contexts/useCustomerdata';
import { fetchCustomers } from '../../apifunctions/fetchCustomerApi';
import _ from 'lodash'; 
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';


const AdminCustomerList = ({route, navigation}) => {
  const [commonCustomers, setCommonCustomers] = useState([]);
  const routeCustomers = route.params?.allCustomers;
  const routeNextPage = route.params?.nextPage
  const effectiveSoId = route.params?.effectiveSoId || null
  const {customers} = useCustomers();
  const {nextGlobalCustomerPageUrl} = useCustomers();
  const unsortedCustomers = routeCustomers || customers;
  const nextPageData = routeNextPage || nextGlobalCustomerPageUrl
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');


  const setSortOrderExplicitly = (order) => {
    setSortOrder(order);
  };
  

  const sortCustomerData = (customers) => {
    return customers.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };
  

  useEffect(() => {
    setCommonCustomers(sortCustomerData([...unsortedCustomers]));
    setNextPageUrl(nextPageData)
  }, [unsortedCustomers, sortOrder, nextPageData]);  


  
  const fetchMoreCustomers = useCallback(_.debounce(async () => {
    if (!nextPageUrl || loading) {
      console.log('Fetch more halted:', { nextPageUrl, loading });
      return;
    }

    setLoading(true);
    try {
      const { customers: newCustomers, nextPageUrl: newNextPageUrl } = await fetchCustomers(null, effectiveSoId, nextPageUrl);
      console.log('New properties fetched:', newCustomers.length);
      setCommonCustomers(prevCustomers => sortCustomerData([...prevCustomers, ...newCustomers]));
      setNextPageUrl(newNextPageUrl);
    } catch (error) {
      console.error('Failed to fetch more Customers:', error);
    } finally {
      console.log('Setting loading false');
      setLoading(false);
    }
  }, 300), [nextPageUrl, loading]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
         <CustomerCard customerData={item} isHorizontal={false}  onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: 'CustomerList' } // Pass customerId to the detail screen
            });

          }}/>
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color={PRIMARY_COLOR} /> : null;
  };

  

   

  return (
    <View style={styles.mainContainer}>
       <StatusBar/>
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>navigation.goBack()}/>
        <View style={{ zIndex: 3000, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <SortHeader title="Customer List" onSort={setSortOrderExplicitly} />
        </View>
        <>
    {commonCustomers.length > 0 ? (
      <FlatList
        data={[commonCustomers]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreCustomers}
        onEndReachedThreshold={0.04}
        extraData={loading}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No Customers Assigned to the Sales Officer</Text>
      </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  filterText: {
    color: '#ffffff',
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    color: 'grey'
  },
  npContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nopText: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins'
  },
});

export default AdminCustomerList;