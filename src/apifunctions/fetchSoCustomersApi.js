import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

// Function to get authorization headers
const getAuthData = async (paramsToken, paramsSoId) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    const soId = paramsSoId || await AsyncStorage.getItem('userId');  // Assuming 'userId' is the storage key for SoId
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        soId: soId
    };
};

// Fetch customers for SO by so_id
export const fetchSoCustomers = async (paramsToken, paramsSoId, pageUrl = null) => {
    const { headers, soId } = await getAuthData(paramsToken, paramsSoId);
    const url = pageUrl || `${BASE_URL}/crm-leads/?assigned_so_id=${soId}`;

    try {
        const response = await axios.get(url, { headers });
        const results = response.data.results.map((entry) => {
            const customer = entry.customer;
            const property = entry.property;
            return {
                uniqueId: entry.id,
                customerId: customer.id,
                name: customer.name,
                number: customer.mobile_no,
                mailId: customer.email,
                created_at: entry.created_at,
                personimage: customer.image ? { uri: customer.image } : require('../../assets/images/person.png'),
                progress: entry.current_crm_status.name_vernacular || 'Site Visit', // Dummy progress state
                property: `${property.name} Phase-${entry.phase.phase_number}`,
                currentCRMStatus: entry.current_crm_status,
                currentApprovalStatus: entry.current_approval_status
            };
        });

        return {
            customers: results,
            nextPageUrl: response.data.next,  // Provide the next page URL for pagination
        };
    } catch (error) {
        console.error('Failed to fetch SO customers:', error);
        return { customers: [], nextPageUrl: null };  // Handle errors by returning an empty list and no next page
    }
};