import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createPayment = async (paymentDetails) => {
  const token = await AsyncStorage.getItem('userToken'); // Get the auth token from AsyncStorage
  const url = 'https://splashchemicals.in/metro/api/payments/';

  try {
    const response = await axios.post(url, paymentDetails, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`, // Assuming your API uses Token-based authentication
      }
    });
    console.log('Payment created successfully:', response.data);
    return response.data; // Return the response data for further processing if necessary
  } catch (error) {
    console.error('Failed to create payment:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default createPayment;