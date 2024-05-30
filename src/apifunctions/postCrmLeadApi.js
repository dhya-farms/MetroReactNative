import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const postCrmLead = async (paramsToken, propertyId, phaseId, customerId, assignedSoId) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  const url = `${BASE_URL}/crm-leads/`;
  const data = {
    property_id: propertyId,
    customer_id: customerId,
    assigned_so_id: assignedSoId,
    phase_id: phaseId,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    });
    console.log('CRM Lead created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating CRM Lead:', error);
    throw error;
  }
};