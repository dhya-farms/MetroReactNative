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
export const fetchDocTypes = async (paramsToken = null) => {
  try {
    const headers = await getAuthHeaders(paramsToken);
    const response = await axios.get(ENUM_VALUES_ENDPOINT, { headers });
    const data = response.data.CRMDocumentType.values;
    return data
  } catch (error) {
    console.error('Error fetching property types:', error);
    return []; // Return an empty array in case of error
  }
};