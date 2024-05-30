import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const USER_PROPERTIES_ENDPOINT = `${BASE_URL}/crm-leads/?customer_id=`;

const getAuthHeaders = token => ({
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`,
});

// Function to fetch data with authorization headers
const fetchDataWithAuth = async (url, token) => {
  const response = await axios.get(url, { headers: getAuthHeaders(token) });
  return response.data;
};

function getDisplayInfo(property, phase) {
  const plotCount = phase.no_of_plots;
  const areaSize = phase.area_size_from;
  const unitName = phase.area_size_unit.name_vernacular;
  
  if (areaSize === "No plots or no unsold plots") {
    return "All plots are sold";
  }

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


export const fetchCustomerProperties = async (paramsToken, paramsUserId, pageUrl = null) => {
  let token = paramsToken || await AsyncStorage.getItem('userToken');
  let userId = paramsUserId || await AsyncStorage.getItem('userId');

  if (!token || !userId) {
    console.error('No token or userId found');
    return { properties: [], nextPageUrl: null };
  }

  const url = pageUrl || `${USER_PROPERTIES_ENDPOINT}${userId}`;

  try {
    const propertiesResponse = await fetchDataWithAuth(url, token);
    if (!propertiesResponse.results || !Array.isArray(propertiesResponse.results)) {
      console.error('No properties found or incorrect data format');
      return { properties: [], nextPageUrl: null };
    }

    console.log("customer", propertiesResponse.results)

    const formattedProperties = propertiesResponse.results.map(prop => {

      const thumbnailImages = prop.property.images.filter(image => image.is_thumbnail && !image.is_slider_image);

      // Select the first thumbnail image if available, or default to a local asset
      const displayImage = thumbnailImages.length > 0 ? { uri: thumbnailImages[0].image } : require('../../assets/images/Sarav.png');
      return {
        ...prop,
        id: prop.phase.id,
        propertyId: prop.id,
        name: `${prop.property.name} Phase-${prop.phase.phase_number}`,
        location: prop.property.location,
        phaseDetails: prop.phase,
        displayText: getDisplayInfo(prop.property, prop.phase),
        rating: prop.property.rating,
        source: displayImage
      };
    });

    console.log('Properties data retrieval success:', formattedProperties);
    return {
      properties: formattedProperties,
      nextPageUrl: propertiesResponse.next // Provide the next page URL for pagination
    };
  } catch (error) {
    console.error('Data retrieval error:', error.response ? error.response.data : error.message);
    return { properties: [], nextPageUrl: null };
  }
};



