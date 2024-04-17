import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Assuming you have a BASE_URL defined somewhere
const BASE_URL = 'https://splashchemicals.in/metro';

// Function to get authorization headers
const getAuthHeaders = async (token) => {
  const authToken = token || await AsyncStorage.getItem('userToken');
  if (!authToken) {
    throw new Error('No token found');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${authToken}`,
  };
};

// Function to update customer details with userId obtained from params or AsyncStorage
const updateCustomerDetailsApiCall = async (customerId, updateData, paramsToken) => {
  let token = paramsToken;
  let userId = customerId;

  // If no token is provided, try to get it from AsyncStorage
  if (!token) {
    token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
  }

  // If no customerId is provided, try to get the userId from AsyncStorage
  if (!userId) {
    userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
  }

  try {
    const headers = await getAuthHeaders(token);
    const response = await axios.patch(`${BASE_URL}/api/customers/${userId}/`, updateData, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to update customer details:', error.response ? error.response.data : error.message);
    throw new Error(error);
  }
};

export default updateCustomerDetailsApiCall;