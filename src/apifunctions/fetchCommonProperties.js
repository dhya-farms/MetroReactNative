import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://splashchemicals.in/metro/api';
// Function to get authorization headers
const getAuthData = async (paramsToken) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    };
  };
  

// Fetch properties for admin by director_id
export const fetchCommonProperties = async (paramsToken) => {
  const { headers} = await getAuthData(paramsToken);
  const PROPERTIES_ENDPOINT = `${BASE_URL}/properties/`;

  try {
    const response = await axios.get(PROPERTIES_ENDPOINT, { headers });
    return response.data.results.map(property => {
      let siteDetails;
      switch (property.property_type.name) {
        case 'FLAT':
          siteDetails = {
            siteName: 'Individual Flats',
            detailInfo: `${property.details.flat_type}`,
            displayText: `${property.details.homes_available} homes available, starts from ${property.details.sq_ft_from} sqft`,
            name: property.name,
          };
          break;
        case 'VILLA':
          siteDetails = {
            siteName: property.details.villa_type,
            detailInfo: `${property.details.villas_available} Villas available`,
            displayText: `${property.details.villas_available} villas available, starts from ${property.details.sq_ft_from} sqft`,
            name: property.name,
          };
          break;
        case 'DTCP_PLOTS':
          siteDetails = {
            siteName: property.name,
            detailInfo: `${property.details.plots_available} plots available`,
            displayText: `${property.details.plots_available} plots available, starts from ${property.details.sq_ft_from} sqft`,
            name: property.name,
          };
          break;
        case 'FARMLANDS':
          siteDetails = {
            siteName: property.name,
            detailInfo: `${property.details.farmland_type}`,
            displayText: `${property.details.units_available} units available, starts from ${property.details.sq_ft_from} sqft`,
            name: property.name
          };
          break;
        default:
          siteDetails = {
            siteName: 'Unknown Type',
            detailInfo: 'Details unavailable'
          };
          break;
      }

      return {
        ...property,
        siteName: siteDetails.siteName, // Custom or default property name
        detailInfo: siteDetails.detailInfo,
        name: siteDetails.name,
        displayText: siteDetails.displayText, // Additional details such as availability
        pricePerSqFt: property.details.sq_ft_from ? 
                      (parseFloat(property.price) / parseFloat(property.details.sq_ft_from)).toFixed(2) 
                      : 'N/A', // Calculating price per sq ft here simplifies component logic
        bgimage: property.images.length ? { uri: property.images[0].image } : null // Using an object for the Image source
      };
    });
  } catch (error) {
    console.error('Failed to fetch admin properties:', error);
    return []; // Return an empty array or handle the error as you see fit
  }
};