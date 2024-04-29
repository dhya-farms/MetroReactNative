import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addCustomerApi = async (paramsToken, customerData) => {
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    try {
        const response = await axios.post('https://splashchemicals.in/metro/api/customers/', customerData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
        console.log(customerData)
        console.log(response.data)
        // Axios automatically parses the JSON response, so no need to call response.json()
        return response.data;
         // The API's response data
    } catch (error) {
        console.log(customerData)
        console.error('API call error:', error.response ? error.response.data : error.message);
        throw error; // You might want to handle errors more gracefully
    }
};