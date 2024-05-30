import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();


const DEFAULT_UPDATES_ENDPOINT = `${BASE_URL}/updates/`;

// Function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  if (!token) throw new Error("Authorization token is missing");
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

export const fetchUpdates = async (paramsToken, pageUrl = null) => {
  const url = pageUrl || DEFAULT_UPDATES_ENDPOINT; // Use provided pageUrl or default URL
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(url, { headers });
    const updates = response.data.results.map(update => {
      return {
        id: update.id.toString(),
        name: update.posted_by.name,
        date: moment(update.date_posted).format('MMM Do, YYYY'), // Formatting date
        title: update.title,
        description: update.description,
        source: { uri: update.images[0].image},
        personimage: require('../../assets/images/ceoimage.png'), // Dummy person image
        created_at: update.date_posted,
      };
    });
    return {
      updates,
      nextPageUrl: response.data.next // Provide the next page URL for pagination
    };
  } catch (error) {
    console.error("Failed to fetch updates:", error);
    return { updates: [], nextPageUrl: null }; // Return empty array on error
  }
};