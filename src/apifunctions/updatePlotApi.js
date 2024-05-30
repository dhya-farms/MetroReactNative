import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();


const updatePlotId = async (crmLeadId, plotId) => {
  const token = await AsyncStorage.getItem('userToken'); // Retrieve the auth token from AsyncStorage
  const url = `${BASE_URL}/crm-leads/${crmLeadId}/`; // Use dynamic CRM lead ID for flexibility

  try {
    const response = await axios.patch(url, {
      plot_id: plotId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Assuming your API uses Token-based authentication
      }
    });
    console.log('Plot ID updated successfully:', response.data);
    return response.data; // Return data for further processing if necessary
  } catch (error) {
    console.error('Failed to update plot ID:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default updatePlotId;