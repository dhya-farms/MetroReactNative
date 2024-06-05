import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const postQueries = async (question) => {
  const token = await AsyncStorage.getItem('userToken');

  try {
     const response = await axios.post(`${BASE_URL}/user_queries/`, { question }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });

    console.log('Question Uploaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting FAQ question:', error);
    throw error;
  }
};