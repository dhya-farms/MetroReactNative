import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();


export const fetchPropertyDetails = async (propertyId, effectivePhaseId, fullResponse = false) => {
  if (!propertyId) {
    console.log("Skipping fetch: No property ID set.");
    throw new Error("No property ID provided");
  }

  console.log("Fetching property details for ID:", propertyId);
  
  try {
    const url = fullResponse ? `/properties/${propertyId}/` : `/crm-leads/${propertyId}/`;
    const response = await axios.get(`${BASE_URL}${url}`);
    console.log("fetch sucess", response.data)
   
    if (fullResponse) {
      const propertyDetails = response.data;
      const phaseDetails = propertyDetails.phases.find(phase => phase.id === effectivePhaseId);
      if (!phaseDetails) {
        console.log("No matching phase found with ID:", effectivePhaseId);
        throw new Error("No matching phase found");
      }

      console.log("Phase details:", phaseDetails);
      return { propertyDetails, phaseDetails };
    } else {
      const propertyDetails = response.data.property;
      const phaseDetails = response.data.phase;
      const fullDetails = response.data;
      if (!phaseDetails) {
        console.log("phase details", phaseDetails)
        console.log("No matching phase found with ID:", effectivePhaseId);
        throw new Error("No matching phase found");
      }

      console.log("Phase details:", phaseDetails);
      return { propertyDetails, phaseDetails, fullDetails };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
