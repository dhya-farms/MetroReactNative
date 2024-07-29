import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const fetchPaymentDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const url = `${BASE_URL}/payments/?payment_for=1&crm_lead_id=${crmId}`;
        const response = await axios.get(url);
        console.log("Payment details fetched:", response.data.results);

        if (response.data.results && response.data.results.length > 0) {
            const formattedDetails = response.data.results.map(detail => ({
                propertyName: detail.crm_lead?.property?.name || '',
                propertyType: detail.crm_lead?.property?.property_type?.name_vernacular || '',
                phaseNumber: detail.crm_lead?.phase?.phase_number || '',
                plotNumber: detail.crm_lead?.plot?.plot_number || '',
                sqFt: `${detail.crm_lead?.plot?.area_size} ${detail.crm_lead?.plot?.area_size_unit?.name_vernacular || ''}`,
                cornerSite: detail.crm_lead?.plot?.is_corner_site ? "YES" : "NO",
                status: detail?.crm_lead?.current_approval_status?.name_vernacular || 'Unknown',
                tokenAmount: detail?.amount || ''
            }));

            console.log("Formatted payment details:", formattedDetails);
            setStatus(prevState => ({
                ...prevState,
                tokenAdvance: {
                    ...prevState.tokenAdvance,
                    details: formattedDetails,
                }
            }));
        } else {
            console.log("No payment details available.");
            setStatus(prevState => ({
                ...prevState,
                tokenAdvance: {
                    ...prevState.tokenAdvance,
                    details: [],
                }
            }));
        }
    } catch (error) {
        console.error("Failed to fetch payment details:", error);
        setError("Failed to fetch payment details");
    } finally {
        setLoading(false);
    }
};