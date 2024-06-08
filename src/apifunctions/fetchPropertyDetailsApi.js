import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();


export const fetchPropertyDetails = async (propertyId, effectivePhaseId, fullResponse = false) => {
  if (!propertyId) {
    console.log("Skipping fetch: No property ID set.");
    throw new Error("No property ID provided");
  }

  
  try {
    const url = fullResponse ? `/properties/${propertyId}/` : `/crm-leads/${propertyId}/`;
    const response = await axios.get(`${BASE_URL}${url}`);
   
    if (fullResponse) {
      const propertyDetails = response.data;
      const phaseDetails = propertyDetails.phases.find(phase => phase.id === effectivePhaseId);
      if (!phaseDetails) {
        throw new Error("No matching phase found");
      }

      return { propertyDetails, phaseDetails };
    } else {
      const propertyDetails = response.data.property;
      const phaseDetails = response.data.phase;
      const fullDetails = response.data;
      if (!phaseDetails) {
        throw new Error("No matching phase found");
      }
      return { propertyDetails, phaseDetails, fullDetails };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
