import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const makeCrmLeadInactive = async (crmId) => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Authorization token not found');
    }

    // Set the authorization headers
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };

    // Make the API request
    const response = await axios.post(`${BASE_URL}/crm-leads/${crmId}/make_inactive/`, null, config);
    return { success: true, message: 'CRM lead successfully made inactive.' };
  } catch (error) {
    // Return error message from API or generic error if something else went wrong
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
};