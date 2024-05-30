import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const CUSTOMERS_ENDPOINT = `${BASE_URL}/crm-leads/`;

// Prepare the authorization headers
const getAuthHeaders = token => ({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
});

// Fetch customers with pagination support
export const fetchCustomers = async (paramsToken, assignedSoId, pageUrl = null) => {
    let token;
    try {
        // Attempt to fetch the token from AsyncStorage
        token = paramsToken || await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');
    } catch (error) {
        // Handle errors related to AsyncStorage or token fetching
        console.error('Token fetch error:', error);
        return { error: 'Failed to fetch token', customers: [], nextPageUrl: null };
    }

    try {
        const headers = getAuthHeaders(token);
        const baseUrl = new URL(pageUrl || CUSTOMERS_ENDPOINT);

    // Check if requestedById is needed and not already included
        if (assignedSoId && !baseUrl.searchParams.has('assigned_so_id')) {
                baseUrl.searchParams.append('assigned_so_id', assignedSoId);
        }

        console.log('url', baseUrl.toString());  // Use the pageUrl if provided, else default to the initial endpoint
        const response = await axios.get(baseUrl.toString(), { headers });
        
        const customers = response.data.results.map(entry => {
            return {
                        uniqueId: entry.id,
                        customerId: entry.customer.id,
                        name: entry.customer.name,
                        number: entry.customer.mobile_no,
                        mailId: entry.customer.email,
                        created_at: entry.customer.created_at,
                        personimage: require('../../assets/images/person.png'),
                        property: `${entry.property.name} Phase-${entry.phase.phase_number}`,
                        currentCRMStatus: entry.current_crm_status,
                        currentApprovalStatus: entry.current_approval_status
                    };
            })

        return {
            customers: customers,
            nextPageUrl: response.data.next  // Provide the next page URL for pagination
        };
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        return { error: 'Failed to fetch customers', customers: [], nextPageUrl: null };
    }
};
