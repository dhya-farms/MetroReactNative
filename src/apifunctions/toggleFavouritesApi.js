import AsyncStorage from '@react-native-async-storage/async-storage';

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
    ? `https://splashchemicals.in/metro/api/properties/${propertyId}/add-to-favorites/`
    : `https://splashchemicals.in/metro/api/properties/${propertyId}/remove-from-favorites/`;

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
      alert(shouldLike ? "Added to favorites" : "Removed from favorites");
    } else {
      alert("Failed to update favorites.");
    }
  } catch (error) {
    console.error('Error toggling favorite', error);
    alert("An error occurred while updating favorites.");
  }
};