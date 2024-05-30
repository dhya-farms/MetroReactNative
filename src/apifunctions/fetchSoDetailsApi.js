import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const USER_DETAILS_ENDPOINT = `${BASE_URL}/users/`;

const getAuthHeaders = async (token) => {
  const authToken = token || await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${authToken}`
  };
};

// Function to fetch user details, including from AsyncStorage if needed
export const fetchSoDetails = async (paramsAdvisorId, paramsToken) => {
  const authToken = paramsToken || await AsyncStorage.getItem('userToken');
  const userToFetch = paramsAdvisorId || await AsyncStorage.getItem('createdBy');
  
  if (!authToken || !userToFetch) {
    console.log('No token or user ID available');
    return { error: 'Authentication required or User ID missing' };
  }

  try {
    const url = `${USER_DETAILS_ENDPOINT}${userToFetch}/`;
    const headers = await getAuthHeaders(authToken);
    const response = await axios.get(url, { headers });
    console.log('User data retrieval success:', response.data);
    return response.data; // Return the user data
  } catch (error) {
    console.error('User data retrieval error:', error.response ? error.response.data : error.message);
    return { error: error.response ? error.response.data : error.message };
  }
};