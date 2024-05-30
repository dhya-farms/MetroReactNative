import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const DEFAULT_PROPERTIES_ENDPOINT = `${BASE_URL}/properties/`; // Remove `?page=all` to support pagination

// Function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

function getDisplayInfo(property, phase) {
  const plotCount = phase.no_of_plots;
  const areaSize = phase.area_size_from;
  const unitName = phase.area_size_unit.name_vernacular;

  // Helper function to determine the correct noun form
  const formatPlural = (count, singular, plural) => count === 1 ? singular : plural;

  switch (property.property_type.name) {
      case 'FLAT':
          return `${plotCount} ${formatPlural(plotCount, 'Home', 'Homes')} available, starts from ${areaSize} ${unitName}`;
      case 'VILLA':
          return `${plotCount} ${formatPlural(plotCount, 'villa', 'villas')} available, starts from ${areaSize} ${unitName}`;
      case 'DTCP_PLOTS':
          return `${plotCount} ${formatPlural(plotCount, 'plot', 'plots')} available, starts from ${areaSize} ${unitName}`;
      case 'FARMLANDS':
          return `${plotCount} ${formatPlural(plotCount, 'unit', 'units')} available, starts from ${areaSize} ${unitName}`;
      default:
          return 'Details unavailable';
  }
}


export const fetchProperties = async (paramsToken, pageUrl = null) => {
  const url = pageUrl || DEFAULT_PROPERTIES_ENDPOINT; // Use provided pageUrl or default URL
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(url, { headers });
    const properties = response.data.results.map(property => {
      if (property.phases && property.phases.length) {
        const filteredImages = property.images.filter(img => img.is_thumbnail && !img.is_slider_image);
        console.log('properties',)
        return property.phases.map(phase => ({
          ...property,
          id: phase.id, 
          propertyId: property.id,
          name: `${property.name} Phase-${phase.phase_number}`, 
          phaseDetails: phase, // Include detailed phase info
          displayText: getDisplayInfo(property, phase), // Specific to phase
          sqFtFrom: phase.sq_ft_from,
          rating: property.rating, // Specific to phase
          images: filteredImages, // Shared images across phases
        }));
      } else {
        // If no phases, return property as is but with enhanced structure
        return [{
          ...property,
          images: property.images,
        }];
      }
    }).flat(); // Flatten the array since phases produce an array of arrays

    return {
      properties,
      nextPageUrl: response.data.next // Include the next page URL for pagination
    };
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return { properties: [], nextPageUrl: null };
  }
};

// Helper function to determine display text based on property details
