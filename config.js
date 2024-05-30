import Constants from 'expo-constants';

// Constant value for API base URL
const BASE_URL = "https://splashchemicals.in/metro/api";

const getEnvVars = () => {
  // The function now simply returns the same base URL for any environment
  return {
    BASE_URL: BASE_URL
  };
};

export default getEnvVars;