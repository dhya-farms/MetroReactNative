import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const toggleFavorite = async (propertyId, shouldLike, paramsToken, onFavoriteStatusChange) => {
  // Function to obtain the auth headers
  const getAuthHeaders = async () => {
    // Retrieve token from paramsToken or AsyncStorage
    const token = paramsToken || await AsyncStorage.getItem('userToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    };
  };
  const headers = await getAuthHeaders()
  const endpoint = shouldLike
    ? `https://splashchemicals.in/metro/api/phases/${propertyId}/add-to-favorites/`
    : `https://splashchemicals.in/metro/api/phases/${propertyId}/remove-from-favorites/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
    });

    if (response.ok) {
      await AsyncStorage.setItem(`liked_${propertyId}`, JSON.stringify(shouldLike));
      if (onFavoriteStatusChange) {
        onFavoriteStatusChange(propertyId, shouldLike);
      }
      Toast.show({
        type: 'success',
        text1: shouldLike ? "Added to favorites" : "Removed from favorites",
        visibilityTime: 1200,  
        
      });
    } else {
      Toast.show({
        type: 'error',
        text1: "Failed to update favorites. Please Try Again",
        visibilityTime: 1800,
      });
    }
  } catch (error) {
    console.error('Error toggling favorite', error);
    alert("An error occurred while updating favorites.");
  }
};