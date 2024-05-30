import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

const USER_DETAILS_ENDPOINT = `${BASE_URL}/status-change-requests/?approval_status=5`;

const getAuthHeaders = async (token) => {
  const authToken = token || await AsyncStorage.getItem('userToken');
  if (!authToken) {
    console.error('Authentication token is not available.');
    throw new Error('Authentication token is not available');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${authToken}`
  };
};

export const fetchStatusRequests = async (paramsToken, requestedById, pageUrl = null) => {
    let headers;
    try {
      headers = await getAuthHeaders(paramsToken);
    } catch (error) {
      console.error('Failed to prepare authorization headers:', error);
      return [];  // Consider how you want to handle this case in your app
    }

    const baseUrl = new URL(pageUrl || USER_DETAILS_ENDPOINT);

    // Check if requestedById is needed and not already included
    if (requestedById && !baseUrl.searchParams.has('requested_by_id')) {
        baseUrl.searchParams.append('requested_by_id', requestedById);
    }

    console.log('url', baseUrl.toString());

    try {
        const response = await axios.get(baseUrl.toString(), { headers });
        
        const formattedData = response.data.results.map((item) => {
          return {
                    id: item.crm_lead.id,
                    name: `${item.requested_by.name}`,
                    customer: item.crm_lead.customer.name,
                    property: `${item.crm_lead.property.name} Phase-${item.crm_lead.phase.phase_number}`,
                    requestDate: new Date(item.date_requested).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }),
                    requestType: item.requested_status.name_vernacular,
                    requested_at: item.date_requested
                  };
                });
        return{ 
            soRequests: formattedData,
            nextPageUrl: response.data.next,
        }
    } catch (error) {
        console.error('Failed to fetch status requested customers:', error);
        return [];  // Handle error cases appropriately in your application context
    }
};

