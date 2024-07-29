import axios from 'axios';

const API_BASE_URL = 'https://dhya.app/metro/api/';
const token = '5fe572201a224d600c89ad38382fd2047b36dd75';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
    },
});

export const listCustomers = async () => {
    try {
        const response = await axiosInstance.get('customers/');
        return response.data.results; // Assuming 'results' holds the list of customers
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};