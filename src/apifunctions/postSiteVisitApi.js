import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

// Function to post a site visit
export const postSiteVisit = async (payload) => { // Receive the payload object directly
  const token = await AsyncStorage.getItem('userToken');
  const url = `${BASE_URL}/site-visits/`;

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    console.log('Booking successful:', response.data);
    console.log(payload)
    return response.data;
  } catch (error) {
    console.error('Failed to book site visit:', error);
    console.log(payload)
    throw error;
  }
};
