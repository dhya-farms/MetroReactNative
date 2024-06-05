import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const ENUM_VALUES_ENDPOINT = `${BASE_URL}/get-enum-values/`;

// Function to get authorization headers
const getAuthHeaders = async (paramsToken) => {
  const token = paramsToken || await AsyncStorage.getItem('userToken');
  console.log(token)
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  };
};

// Function to fetch property types with optional token parameter
export const fetchPropertyTypes = async (paramsToken = null) => {
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(ENUM_VALUES_ENDPOINT, { headers });
    const data = response.data;

    const propertyTypes = data.PropertyType.values.map(item => ({
      key: item.id.toString(),
      name: item.name_vernacular,
    }));

    const areaOfPurpose = data.AreaOfPurpose.values.map(item => ({
      key: item.id.toString(),
      name: item.name_vernacular,
    }));

    return { propertyTypes, areaOfPurpose };
  } catch (error) {
    console.error('Error fetching enum values:', error);
    return { propertyTypes: [], areaOfPurpose: [] }; // Return empty arrays in case of error
  }
};
