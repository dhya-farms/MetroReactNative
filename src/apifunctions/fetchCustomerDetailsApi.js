import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://splashchemicals.in/metro';
const CUSTOMER_DETAILS_ENDPOINT = `${BASE_URL}/api/customers/`;

// Using the existing getAuthHeaders function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  if (!token) {
    console.log('No token found');
    return { error: 'No token found' };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};


// New function to fetch customer details
export const fetchCustomerDetails = async (paramsToken, paramsUserId = null) => {
  try {
    const headers = await getAuthHeaders(paramsToken);
    const userId = paramsUserId || await AsyncStorage.getItem('userId');
    if (!userId) {
      console.log('No userId found');
      return { error: 'No userId found' };
    }

    const response = await axios.get(`${CUSTOMER_DETAILS_ENDPOINT}${userId}/`, { headers });
    return response.data; // This should match the structure of the API response you provided.
  } catch (error) {
    console.error('Failed to fetch customer details:', error);
    throw new Error(error);
  }
};
