import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const USERS_ENDPOINT = `${BASE_URL}/users?role=3`; // Adjusted endpoint

// Prepare the authorization headers
const getAuthHeaders = token => ({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`, // Ensure this matches the expected header for your API
});

// Fetch users with pagination support
export const fetchSoUsers = async (paramsToken, pageUrl = null) => {
    let token;
    try {
        // Attempt to fetch the token from AsyncStorage
        token = paramsToken || await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');
    } catch (error) {
        console.error('Token fetch error:', error);
        return { error: 'Failed to fetch token', data: null, nextPageUrl: null };
    }

    try {
        const headers = getAuthHeaders(token);
        const url = pageUrl || USERS_ENDPOINT; // Use the pageUrl if provided, else default to the initial endpoint
        const response = await axios.get(url, { headers });

        // Return the full data object and pagination details
        return {
            data: response.data,
            nextPageUrl: response.data.next // Provide the next page URL for pagination
        };
    } catch (error) {
        console.error('Failed to fetch SO users:', error);
        return { error: 'Failed to fetch SO users', data: null, nextPageUrl: null };
    }
};

