import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://splashchemicals.in/metro/api';
// Function to get authorization headers
const getAuthData = async (paramsToken, paramsSoId) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    const soId = paramsSoId || await AsyncStorage.getItem('userId'); // Assume 'userId' is the storage key for directorId
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      soId: soId
    };
  };
  

// Fetch properties for admin by director_id
export const fetchSoCustomersList = async (paramsToken, paramsSoId) => {
  const { headers, soId } = await getAuthData(paramsToken, paramsSoId);
  const PROPERTIES_ENDPOINT = `${BASE_URL}/customers/?created_by_id=${soId}`;

  try {
    const response = await axios.get(PROPERTIES_ENDPOINT, { headers });
    return response.data.results
  } catch (error) {
    console.error('Failed to fetch so customers list', error);
    return []; // Return an empty array or handle the error as you see fit
  }
};