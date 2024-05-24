
import styles from '../constants/styles/socustomerdetailsstyles';

export const getStatusStyle = (status) => {
    switch(status) {
      case 'COMPLETED': return styles.completedStatusItem;
      case 'APPROVED': return styles.approvedStatusItem;
      case 'PENDING': return styles.pendingStatusItem;
      case 'REJECTED': return styles.rejectedStatusItem;
      default: return {};
    }
  };
  
  export const getIconName = (status) => {
    switch (status) {
      case 'COMPLETED':
          return "check-double"
      case 'APPROVED':
          return "check";
      case 'REJECTED':
          return "times";
      case 'PENDING':
          return "hourglass-half";
      default:
          return "question";
    }
  };
  
  export const getStatusStyleCheckBox = (status) => {
    switch(status) {
      case 'COMPLETED': return styles.completedStatusCheck;
      case 'APPROVED': return styles.approvedStatusCheck;
      case 'PENDING': return styles.pendingStatusCheck;
      case 'REJECTED': return styles.rejectedStatusCheck;
      default: return {};
    }
  };
  
  export const getStatusText = (status) => {
    switch(status) {
      case 'COMPLETED': return 'Completed';
      case 'APPROVED': return 'Approval Completed';
      case 'PENDING': return 'Pending Approval';
      case 'REJECTED': return 'Approval Rejected';
      default: return 'Not Booked';
    }
  };
  