import axios from 'axios';

const token = '5fe572201a224d600c89ad38382fd2047b36dd75'; // Your API token

export const addCustomerApi = async (customerData) => {
    try {
        const response = await axios.post('https://splashchemicals.in/metro/api/customers/', customerData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
        console.log(response.data)
        // Axios automatically parses the JSON response, so no need to call response.json()
        return response.data;
         // The API's response data
    } catch (error) {
        console.error('API call error:', error.response ? error.response.data : error.message);
        throw error; // You might want to handle errors more gracefully
    }
};