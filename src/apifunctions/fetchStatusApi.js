import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();



export const fetchStatus = async (customerId) => {
    try {
        const response = await axios.get(`${BASE_URL}/crm-leads/${customerId}/`);
        console.log("Status fetch success:", response.data);
        return {
            crmStatus: response.data.current_crm_status ? response.data.current_crm_status.name : "No CRM Status",
            approvalStatus: response.data.current_approval_status ? response.data.current_approval_status.name : "Not Booked",
            balanceAmount: response.data? response.data.amount_to_paid: null
        };
    } catch (error) {
        console.error("Failed to fetch status:", error);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};