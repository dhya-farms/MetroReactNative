import axios from 'axios';
import getEnvVars from '../../config';
const { BASE_URL } = getEnvVars();

export const fetchFullPaymentDetails = async (crmId, setLoading, setStatus, setError) => {
    console.log("Called fetchFullPaymentDetails with crmId:", crmId); // Debug log
    setLoading(true);
    try {
      if(crmId){
      const response = await axios.get(`${BASE_URL}/payments/?payment_for=2&crm_lead_id=${crmId}&page=all`);
      if (response.data && response.data.results) {
        const paymentDetails = response.data.results.map((detail, index) => ({
            id: index + 1,
            amountPaid: detail.amount,
            modeOfPay: detail.payment_method.name_vernacular,
            refNumber: detail.reference_number,
            date: new Date(detail.payment_date).toLocaleDateString('en-IN')
          }))
      const totalAmount = paymentDetails.reduce((sum, item) => sum + parseFloat(item.amountPaid), 0);
      const uniqueModes = [...new Set(paymentDetails.map(item => item.modeOfPay))];
      const uniqueDates = [...new Set(paymentDetails.map(item => item.date))].join(', '); // Debug log

      console.log("total amount", totalAmount)

      setStatus(prevStatus => ({
        ...prevStatus,
        payment: {
          ...prevStatus.payment,
          details: paymentDetails,
          totalAmount,
          uniqueModes,
          uniqueDates
        }
      }));
      }
    }
        } catch (error) {
        console.error('Failed to fetch payment details:', error);
        setError("Failed to fetch documentation details");
        } finally {
            setLoading(false);
        }
 };