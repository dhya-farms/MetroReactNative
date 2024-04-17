import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://splashchemicals.in/metro/api';
const PROPERTIES_ENDPOINT = `${BASE_URL}/properties/my-favourites`;

// Function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

export const fetchMyFavourites = async (paramsToken) => {
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(PROPERTIES_ENDPOINT, { headers });
    return response.data.results.map(property => {
      // Define display text based on the property_type.id
      let displayText = "";
      switch (property.property_type.id) {
        case 1: // DTCP_PLOTS
          console.log('DTCP_PLOTS:', property.details);
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
          displayText = `Details not Entered Correctly`;
      }
      return {
        ...property,
        displayText,
        source: require('../../assets/images/Sarav.png'), // Adjust the path as necessary
      };
    });
  } catch (error) {
    console.error('Failed to fetch Favourites:', error);
    return []; // Return an empty array or handle the error as you see fit
  }
};