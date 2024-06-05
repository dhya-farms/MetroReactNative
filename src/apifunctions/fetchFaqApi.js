import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const FAQS_ENDPOINT = `${BASE_URL}/faqs/?page=all`;

// Function to get authorization headers
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  console.log('Using token:', token); // Optional: for debugging purposes
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

// Function to fetch FAQs with optional token parameter
export const fetchFAQs = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(FAQS_ENDPOINT, { headers });
    const data = response.data;
    return data.results; // Assuming 'results' contains the list of FAQs
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return []; // Return an empty array in case of error
  }
};