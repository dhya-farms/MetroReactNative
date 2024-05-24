import axios from 'axios';


export const fetchStatus = async (customerId) => {
    try {
        const response = await axios.get(`https://splashchemicals.in/metro/api/crm-leads/${customerId}/`);
        console.log("Status fetch success:", response.data);
        return {
            crmStatus: response.data.current_crm_status ? response.data.current_crm_status.name : "No CRM Status",
            approvalStatus: response.data.current_approval_status ? response.data.current_approval_status.name : "Not Booked"
        };
    } catch (error) {
        console.error("Failed to fetch status:", error);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};