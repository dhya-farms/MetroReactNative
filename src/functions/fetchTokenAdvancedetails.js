import axios from 'axios';

export const fetchPaymentDetails = async (crmId, paymentFor, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
        const url = `https://splashchemicals.in/metro/api/payments/?payment_for=${paymentFor}&crm_lead_id=${crmId}`;
        const response = await axios.get(url);
        console.log("Payment details fetched:", response.data.results);

        // Assuming you are storing the payment details in the state of tokenAdvance.details
        setStatus(prevStatus => {
            const newStatus = {
                ...prevStatus,
                tokenAdvance: {
                    ...prevStatus.tokenAdvance,
                    details: response.data.results.map(detail => ({
                        propertyName: detail.crm_lead?.property?.name || '',
                        propertyType: detail.crm_lead?.property?.property_type?.name_vernacular || '',
                        phaseNumber: detail.crm_lead?.phase?.phase_number || '',
                        plotNumber: detail.crm_lead?.plot?.plot_number || '',
                        sqFt: `${detail.crm_lead?.plot?.area_size} ${detail.crm_lead?.plot?.area_size_unit?.name_vernacular || ''}`,
                        cornerSite: detail.crm_lead?.plot?.is_corner_site ? "YES" : "NO",
                        status: detail?.crm_lead?.current_approval_status?.name_vernacular || 'Unknown',
                        tokenAmount: detail.amount
                    }))
                }
            };
            console.log("Updating state from:", prevStatus, "to:", newStatus);
            return newStatus;
        });
        setLoading(false);
    } catch (error) {
        console.error("Failed to fetch payment details:", error);
        setError("Failed to fetch payment details");
        setLoading(false);
    }
};