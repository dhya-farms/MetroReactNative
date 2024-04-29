import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL and endpoint configuration
const BASE_URL = 'https://splashchemicals.in/metro';
const USERS_ENDPOINT = `${BASE_URL}/api/users?role=3`; // Endpoint to fetch users with role 3

// Prepare the authorization headers
const getAuthHeaders = token => ({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,  // Adjusted to "Bearer" based on typical API usage, change if necessary
});

// Fetch users with authorization
export const fetchSoUsers = async (paramsToken) => {
    let token;
    try {
        // Attempt to fetch the token from AsyncStorage
        token = paramsToken || await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');
    } catch (error) {
        // Handle errors related to AsyncStorage or token fetching
        console.error('Token fetch error:', error);
        return { error: 'Failed to fetch token', details: null };
    }

    try {
        const headers = getAuthHeaders(token);
        const response = await axios.get(USERS_ENDPOINT, { headers });
        if (response.status === 200) {
            // If the response is successful, return the users data
            return { error: null, details: response.data };
        } else {
            // Handle responses that are not successful
            return { error: 'Failed to fetch users', details: null };
        }
    } catch (networkError) {
        // Handle errors related to the network or axios
        console.error('Network or Axios error:', networkError);
        return { error: 'Network error', details: null };
    }
};
