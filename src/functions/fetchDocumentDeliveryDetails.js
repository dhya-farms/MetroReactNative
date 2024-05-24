import axios from 'axios';

export const fetchDocumentationDeliveryDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const response = await axios.get(`https://splashchemicals.in/metro/api/files/files?file_usage_type=2&crm_lead=${crmId}`);
        console.log("Document details fetched:", response.data);

        if (response.data && response.data.length > 0) {
            // Sort documents by upload_finished_at date, newest first
            const sortedDetails = response.data.sort((a, b) => {
                return new Date(b.upload_finished_at) - new Date(a.upload_finished_at);
            });
            console.log("Sorted document details:", sortedDetails);
            setStatus(prevState => ({
                ...prevState,
                ddDelivery: {
                    ...prevState.ddDelivery,
                    details: sortedDetails,
                }
            }));
        } else {
            console.log("No ddDelivery details available.");
            setStatus(prevState => ({
                ...prevState,
                ddDelivery: {
                    ...prevState.ddDelivery,
                    details: [],
                    detailsVisible: false // Manage visibility if no documents
                }
            }));
        }
    } catch (error) {
        console.error("Failed to fetch ddDelivery details:", error);
        setError("Failed to fetch ddDelivery details");
    } finally {
        setLoading(false);
    }
};
