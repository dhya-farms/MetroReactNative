import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();



// Function to get authorization headers
const getAuthData = async (paramsToken, paramsSoId) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    const soId = paramsSoId || await AsyncStorage.getItem('userId');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        soId: soId
    };
};

// Fetch customers for a sales officer by their ID
export const fetchSoCustomersList = async (paramsToken, paramsSoId, pageUrl = null) => {
    const { headers, soId } = await getAuthData(paramsToken, paramsSoId);
    // Use provided pageUrl or construct the initial URL
    const customersEndpoint = pageUrl || `${BASE_URL}/customers/?created_by_id=${soId}`;

    try {
        const response = await axios.get(customersEndpoint, { headers });
        const customersData = response.data.results; 
        const nextPageUrl = response.data.next;
        return {
            customers: customersData,
            nextPage: nextPageUrl
        };
    } catch (error) {
        console.error('Failed to fetch so customers list', error);
        return {
            customers: [],
            nextPage: null
        }; // Return an empty array and no next page URL on error
    }
};
