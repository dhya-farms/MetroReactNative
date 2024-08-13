import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const PROPERTIES_ENDPOINT = `${BASE_URL}/phases/my-favourites`;

// Function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

function getDisplayInfo(property, prop) {
  const plotCount = prop.no_of_plots;
  const areaSize = prop.area_size_from;
  const unitName = prop.area_size_unit.name_vernacular;

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

function getDetailInfo(property, phase) {
  const plotCount = phase.no_of_plots;

  const formatPlural = (count, singular, plural) => count === 1 ? singular : plural;

  switch (property.property_type.name) {
      case 'FLAT':
        return `${plotCount} ${formatPlural(plotCount, 'flat', 'flats')} available`;
      case 'VILLA':
          return `${plotCount} ${formatPlural(plotCount, 'villa', 'villas')} available`;
      case 'DTCP_PLOTS':
          return `${plotCount} ${formatPlural(plotCount, 'plot', 'plots')} available`;
      case 'FARMLANDS':
        return `${plotCount} ${formatPlural(plotCount, 'farmlands', 'farmlands')} available`;
      default:
          return 'Details unavailable';
  }
}
export const fetchMyFavourites = async (paramsToken, pageUrl = null) => {
  const endpoint = pageUrl || PROPERTIES_ENDPOINT;
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(endpoint, { headers });
    const formattedProperties = response.data.results.map(prop => {
     return {
        ...prop,
        id: prop.id, // Use phase ID for unique identification
        propertyId: prop.property.id,
        name: `${prop.property.name} Phase-${prop.phase_number}`,
        location: prop.property.location,
        displayText: getDisplayInfo(prop.property, prop),
        detailInfo: getDetailInfo(prop.property, prop),
        sqFtFrom: prop.sq_ft_from,
        rating: prop?.property?.rating,
        bgimage: prop.property.images.length ? { uri: prop.property.images[0].image } : null,
        phaseDetails: prop 
    };
    })
    return {
      properties: formattedProperties,
      nextPageUrl: response.data.next, 
    };
  } catch (error) {
    console.error('Failed to fetch Favourites:', error);
    return { properties: [], nextPageUrl: null }; // Handle errors by returning an empty list and no next page
  }
};