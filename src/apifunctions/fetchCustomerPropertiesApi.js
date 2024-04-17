import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for your API
const BASE_URL = 'https://splashchemicals.in/metro';
const USER_PROPERTIES_ENDPOINT = `${BASE_URL}/api/properties/?current_lead_id=`;

// Function to get authorization headers
const getAuthHeaders = token => ({
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
});

// Function to fetch data with authorization headers
const fetchDataWithAuth = async (url, token) => {
  const response = await axios.get(url, { headers: getAuthHeaders(token) });
  return response.data;
};

// Function to fetch customer properties
export const fetchCustomerProperties = async (paramsToken, paramsUserId) => {
  let token = paramsToken || await AsyncStorage.getItem('userToken');
  let userId = paramsUserId || await AsyncStorage.getItem('userId');

  if (!token || !userId) {
    console.log('No token or userId found');
    return { error: 'No token or userId found' };
  }

  try {
    // Directly fetch properties for the given user
    const propertiesResponse = await fetchDataWithAuth(`${USER_PROPERTIES_ENDPOINT}${userId}`, token);
    // Transform and format the properties data
    const formattedProperties = propertiesResponse.results.map(property => {
      let displayText = "";
      switch (property.property_type.id) {
        case 1: // DTCP_PLOTS
          displayText = `${property.details.plots_available} plots available, starts from ${property.details.sq_ft_from} sqft`;
          break;
        case 3: // FLAT
          displayText = `${property.details.homes_available} homes available, starts from ${property.details.sq_ft_from} sqft`;
          break;
        case 2: // FARMLANDS
          displayText = `${property.details.units_available} units available, starts from ${property.details.sq_ft_from} sqft`;
          break;
        case 4: // VILLA
          displayText = `${property.details.villas_available} villas available, starts from ${property.details.sq_ft_from} sqft`;
          break;
        default:
          displayText = `Details not available`;
      }
      return {
        ...property,
        displayText,
        source: require('../../assets/images/Sarav.png') // This path should be adjusted as necessary
      };
    });
    console.log('Properties data retrieval success:', formattedProperties);
    return formattedProperties; // Return the formatted properties data
  } catch (error) {
    console.error('Data retrieval error:', error.response ? error.response.data : error.message);
    return { error: error.response ? error.response.data : error.message };
  }
};