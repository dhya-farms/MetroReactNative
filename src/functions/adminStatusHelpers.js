import styles from '../constants/styles/admincustomerdetailsstyles';

export const getStatusColor = (status) => {
    if (status.isApproved) {
      return '#1D9BF0';
    } else if (status.isPending) {
      return '#FDF525'; 
    } else if (status.isRejected) {
      return '#FF0000'; 
    } else if (status.isCompleted) {
      return '#80FF00'; 
    } else if (status.isProgress) {
      return '#1D9BF0'; 
    } else {
      return '#C4C4C4'; 
    }
  };

export const getIconName = (Status) => {
    if (Status.isCompleted) {
        return "check-double";
    } else if (Status.isApproved) {
        return "check";
    } else if (Status.isRejected) {
        return "times";
    } else if (Status.isPending) {
        return "hourglass-half";
    } else {
        return "times"; // Default icon when no status is true
    }
   };

export   const getStatusItemStyle = (Status) => {
    if (Status.isCompleted) {
        return styles.completedStatusItem;
    } else if (Status.isApproved) {
        return styles.approvedStatusItem;
    } else if (Status.isRejected) {
        return styles.rejectedStatusItem;
    } else if (Status.isPending) {
        return styles.pendingStatusItem;
    } else if (Status.isProgress) {
      return styles.progressStatusItem;
  } else {
        return styles.defaultStatusItem; // Default icon when no status is true
    }
   };

export   const getStatusText = (Status)=>{
    if (Status.isCompleted) {
      return 'Completed';
      } else if (Status.isApproved) {
          return 'Approved';
      } else if (Status.isRejected) {
          return 'Rejected';
      } else if (Status.isPending) {
          return 'Pending';
      } else if (Status.isProgress) {
        return  'Progress';
      } else {
            return null; // Default icon when no status is true
      } 
   }