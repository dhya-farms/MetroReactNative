import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL and endpoint configuration
const BASE_URL = 'https://splashchemicals.in/metro';
const CUSTOMERS_ENDPOINT = `${BASE_URL}/api/crm-leads/`;

// Prepare the authorization headers
const getAuthHeaders = token => ({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
});

// Fetch customers with authorization
export const fetchCustomers = async (paramsToken) => {
    let token;
    try {
        // Attempt to fetch the token from AsyncStorage
        token = paramsToken || await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');
    } catch (error) {
        // Handle errors related to AsyncStorage or token fetching
        console.error('Token fetch error:', error);
        return { error: 'Failed to fetch token' };
    }

    try {
        const headers = getAuthHeaders(token);
        const response = await axios.get(CUSTOMERS_ENDPOINT, { headers });
        
        return response.data.results.map((entry) => {
            const customer = entry.customer;
            const property = entry.property;
            return {
                uniqueId: entry.id, // Use results.id as the unique id
                customerId: customer.id,
                name: customer.name,
                number: customer.mobile_no,
                mailId: customer.email,
                personimage: require('../../assets/images/person.png'),
                property: property.name, // Include property name
            };
        });
    } catch (error) {
        // Handle HTTP or Axios errors
        console.error('Failed to fetch customers:', error);
        return { error: 'Failed to fetch customers' };
    }
};