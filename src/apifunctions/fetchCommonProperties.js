import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

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


  function getDetailInfo(property, phase) {
    const plotCount = phase.no_of_plots;

    const formatPlural = (count, singular, plural) => count === 1 ? singular : plural;

    switch (property.property_type.name) {
        case 'FLAT':
            return `${property.details.flat_type}`;
        case 'VILLA':
            return `${plotCount} ${formatPlural(plotCount, 'villa', 'villas')} available`;
        case 'DTCP_PLOTS':
            return `${plotCount} ${formatPlural(plotCount, 'plot', 'plots')} available`;
        case 'FARMLANDS':
            return `${property.details.farmland_type}`;
        default:
            return 'Details unavailable';
    }
 }


 function formatPropertyDetails(property) {
  let formattedProperties = [];
  if (property.phases && property.phases.length > 0) {
      property.phases.forEach(phase => {
          const filteredImages = property.images.filter(img => img.is_thumbnail && !img.is_slider_image);
          formattedProperties.push({
              ...property,
              id: phase.id, 
              propertyId: property.id, 
              
              name: `${property.name} Phase-${phase.phase_number}`,
              displayText: getDisplayInfo(property, phase),
              detailInfo: getDetailInfo(property, phase),
              sqFtFrom: phase.area_size_from,
              phaseName: phase.area_size_unit.name_vernacular,
              bgimage: filteredImages.length > 0 ? { uri: filteredImages[0].image } : null,
              images: filteredImages, 
              phaseDetails: phase 
          });
      });
  }
  return formattedProperties;
}
  

// Fetch properties for admin by director_id
export const fetchCommonProperties = async (paramsToken, pageUrl= null) => {
  const { headers} = await getAuthData(paramsToken);
  const url = pageUrl || `${BASE_URL}/properties/`;

  try {
    const response = await axios.get(url, { headers });

    const formattedProperties = response.data.results.map(formatPropertyDetails).flat(); 

    return {
      properties: formattedProperties,
      nextPageUrl: response.data.next, // Provide the next page URL for pagination
    };
  } catch (error) {
    console.error('Failed to fetch common properties:', error);
    return { properties: [], nextPageUrl: null }; // Handle errors by returning an empty list and no next page
  }
}
