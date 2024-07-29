import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const fetchSiteVisitDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/site-visits/?crm_lead_id=${crmId}`);
        console.log("Site visit details fetched:", response.data.results);

        if (response.data.results && response.data.results.length > 0) {
            // Map the results to format details as needed
            const formattedDetails = response.data.results.map(detail => ({
                propertyName: detail.crm_lead?.property?.name || '',
                date: new Date(detail.pickup_date).toLocaleDateString('en-GB'),
                pickupAddress: detail?.pickup_address || 'Pickup Not Needed',
            }));
            console.log("Formatted site visit details:", formattedDetails);
            setStatus(prevState => ({
                ...prevState,
                siteVisit: {
                    ...prevState.siteVisit,
                    details: formattedDetails,
                }
            }));
        } else {
            console.log("No site visit details available.");
            setStatus(prevState => ({
                ...prevState,
                siteVisit: {
                    ...prevState.siteVisit,
                    details: [],
                }
            }));
        }
    } catch (error) {
        console.error("Failed to fetch site visit details:", error);
        setError("Failed to fetch site visit details");
    } finally {
        setLoading(false);
    }
};

