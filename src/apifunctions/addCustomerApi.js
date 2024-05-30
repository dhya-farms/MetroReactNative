import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const addCustomerApi = async (paramsToken, customerData, imageData) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
  
    const formData = new FormData();
    formData.append('name', customerData.name);
    formData.append('email', customerData.email);
    formData.append('mobile_no', customerData.mobile_no);
    formData.append('occupation', customerData.occupation);
    formData.append('address', customerData.address);
    formData.append('preferences', JSON.stringify({
        area_of_purpose: customerData.preferences.area_of_purpose,
        property_types: customerData.preferences.property_types,
        budget: customerData.preferences.budget
      }));
  
    if (imageData) {
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: 'photo.jpg' // or derive the name based on the MIME type if needed
      });
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/customers/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data', // This will be set correctly by FormData
        },
      });
      console.log("form data", formData)
      console.log('imageData', imageData)
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error('API call error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  