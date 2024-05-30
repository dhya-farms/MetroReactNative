import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

// Function to update approval status
export const updateApprovalStatus = async (statusValue, statusChangeRequestId, includeUserId = true) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    
    let payload = {
      approval_status: statusValue,
    };
    if (includeUserId) {
      payload.actioned_by_id = userId;
    }

    const response = await axios.patch(`${BASE_URL}/status-change-requests/${statusChangeRequestId}/`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    console.log("Status update success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
