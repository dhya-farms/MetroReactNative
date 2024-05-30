import React, { useCallback, useEffect, useMemo, useState} from 'react';
import { View, ScrollView, FlatList, ActivityIndicator, Text} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactCard from '../../components/ContactCard';
import styles from '../../constants/styles/customercontactscreenstyles';
import { useSoCustomers } from '../../contexts/useSoCustomersData';
import { fetchSoCustomers } from '../../apifunctions/fetchSoCustomersApi';
import _ from 'lodash'; 






const CustomerContactScreen = ({route, navigation}) => {

  const [customers, setCustomers] = useState([]);
  const {soCustomers} = useSoCustomers()
  const {nextSoGlobalPageUrl} = useSoCustomers()
  const routeCustomers = route.params?.customers;
  const routeNextPage = route.params?.nextPage
  const unsortedCustomerData = routeCustomers || soCustomers;
  const nextPageData = routeNextPage || nextSoGlobalPageUrl
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
    setCustomers(sortCustomerData([...unsortedCustomerData]));
    setNextPageUrl(nextPageData)
  }, [unsortedCustomerData, sortOrder, nextPageData]);  


  
  const fetchMoreCustomers = useCallback(_.debounce(async () => {
    if (!nextPageUrl || loading) {
      console.log('Fetch more halted:', { nextPageUrl, loading });
      return;
    }
  
    console.log('Fetching more Customers from:', nextPageUrl);
    console.log('Setting loading true');
    setLoading(true);
    try {
      const { customers: newCustomers, nextPageUrl: newNextPageUrl } = await fetchSoCustomers(null, null, nextPageUrl);
      console.log('New properties fetched:', newCustomers.length);
      setCustomers(prevCustomers => sortCustomerData([...prevCustomers, ...newCustomers]));
      setNextPageUrl(newNextPageUrl);
    } catch (error) {
      console.error('Failed to fetch more Customers:', error);
    } finally {
      console.log('Setting loading false');
      setLoading(false);
    }
  }, 300), [nextPageUrl, loading, sortOrder]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ContactCard customerData={item} onCardPress={(customerId) => {
            navigation.navigate("SO Client", { 
              screen: "SO Customer Details",
              params: { customerId: customerId } // Pass customerId to the detail screen
          })
        }}/>
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };


  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Customers" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
       <View style={{ zIndex: 3000, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
         <SortHeader title="Customer List" onSort={setSortOrderExplicitly} />
       </View>
       <>
        {customers.length > 0 ? (
      <FlatList
        data={[customers]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreCustomers}
        onEndReachedThreshold={0.02}
        extraData={loading}
        showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>Customer Not Assigned Yet</Text>
        </View>
        )}
      </>
    </View>
  );
};


export default CustomerContactScreen;