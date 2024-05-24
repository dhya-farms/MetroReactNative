import axios from 'axios';

export const fetchSiteVisitDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const response = await axios.get(`https://splashchemicals.in/metro/api/site-visits/?crm_lead_id=${crmId}`);
        console.log("Site visit details fetched:", response.data.results);

        if (response.data.results.length > 0) {
            const details = response.data.results[0];
            console.log("Setting site visit details:", details);
            setStatus(prevState => {
                const newState = {
                    ...prevState,
                    siteVisit: {
                        ...prevState.siteVisit,
                        details: [{
                            propertyName: details.crm_lead?.property?.name,
                            date: new Date(details.pickup_date).toLocaleDateString('en-GB'),
                            pickupAddress: details.pickup_address
                        }]
                    }
                };
                console.log("New state after setting site visit:", newState);
                return newState;
            });
        } else {
            console.log("No site visit details available.");
            setStatus(prevState => ({
                ...prevState,
                siteVisit: {
                    ...prevState.siteVisit,
                    details: []
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
