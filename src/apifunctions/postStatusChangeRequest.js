import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();
 // Ensure this is imported to use AsyncStorage

export const postStatusChangeRequest = async (crmLeadId, requestedById) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
        console.error("No token found");
        throw new Error("Authentication required. Please log in.");
    }
    const url = `${BASE_URL}/status-change-requests/`;
    try {
        const response = await axios.post(url, {
            crm_lead_id: crmLeadId,
            requested_by_id: requestedById,
            requested_status: 4, 
            approval_status: 1   
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
        console.log("Request successful:", response.data);
        return response.data; // Return the response data for further processing
    } catch (error) {
        console.error("Request failed:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};