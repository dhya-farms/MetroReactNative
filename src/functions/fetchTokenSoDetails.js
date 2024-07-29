import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const fetchTokenPaymentDetails = async (crmId, setLoading, setStatus, setError) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/payments/?payment_for=1&crm_lead_id=${crmId}`);
      console.log("token payment" ,response.data)
      if (response.data && response.data.results) {
        const formattedDetails = response.data.results.map(detail => ({
          amountPaid: detail.amount,
          modeOfPay: detail.payment_method.name_vernacular,
          referenceNumber: detail?.reference_number,
          date: new Date(detail.payment_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        }));
        // Update the tokenAdvance section of the status state with new payment details
        setStatus(prevStatus => ({
          ...prevStatus,
          tokenAdvance: {
            ...prevStatus.tokenAdvance,
              details: formattedDetails
          }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
      setError("Failed to fetch documentation details");
    } finally {
        setLoading(false);
    }
  };