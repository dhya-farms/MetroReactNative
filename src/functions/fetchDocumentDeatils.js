import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const fetchDocumentationDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/files/files?file_usage_type=3&crm_lead=${crmId}`);
        console.log("Document details fetched:", response.data);

        if (response.data && response.data.length > 0) {
            // Sort documents by upload_finished_at date, newest first
            const sortedDetails = response.data.sort((a, b) => {
                return new Date(b.upload_finished_at) - new Date(a.upload_finished_at);
            });
            console.log("Sorted document details:", sortedDetails);
            setStatus(prevState => ({
                ...prevState,
                documentation: {
                    ...prevState.documentation,
                    details: sortedDetails,
                }
            }));
        } else {
            console.log("No documentation details available.");
            setStatus(prevState => ({
                ...prevState,
                documentation: {
                    ...prevState.documentation,
                    details: [],
                    detailsVisible: false // Manage visibility if no documents
                }
            }));
        }
    } catch (error) {
        console.error("Failed to fetch documentation details:", error);
        setError("Failed to fetch documentation details");
    } finally {
        setLoading(false);
    }
};
