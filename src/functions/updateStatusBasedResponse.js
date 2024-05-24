export const updateStatusBasedOnResponse = (status, statusName, crmStatusName, plot) => {

    const statusMapping = {
        'SITE_VISIT': 'siteVisit',
        'TOKEN_ADVANCE': 'tokenAdvance',
        'DOCUMENTATION': 'documentation',
        'PAYMENT': 'payment',
        'DOCUMENT_DELIVERY': 'ddDelivery'
      };
      
    let newState = { ...status };
    const allStageKeys = Object.keys(statusMapping); // Get all the keys from the mapping
    const normalizedCrmStatusName = crmStatusName ? crmStatusName.toUpperCase() : "";

    console.log("All stage keys:", allStageKeys); // Display all keys
    console.log("Normalized CRM Status Name:", normalizedCrmStatusName);
    
    if (!normalizedCrmStatusName || !(normalizedCrmStatusName in statusMapping)) {
      allStageKeys.forEach(key => newState[statusMapping[key]] = {
          isPending: false,
          isApproved: false,
          isRejected: false,
          isCompleted: false,
          isProgress: false
      });
      newState[statusMapping[allStageKeys[0]]].isProgress = true; // Set the first stage to in progress
      console.log("No valid CRM status, setting initial stage to progress");
      return newState;
  }

    // Use the keys to find the index
    const currentStageIndex = allStageKeys.indexOf(normalizedCrmStatusName);
    console.log("current stage index", currentStageIndex);


    const currentStage = statusMapping[normalizedCrmStatusName]; // This should now correctly retrieve 'siteVisit', 'tokenAdvance', etc.

    // Initialize all stages to default values
    allStageKeys.forEach(key => {
        newState[statusMapping[key]] = {
            isPending: false,
            isApproved: false,
            isRejected: false,
            isCompleted: false,
            isProgress: false
        };
    });

    // Set the current stage based on the status
    newState[currentStage] = {
        isPending: statusName === "PENDING",
        isApproved: statusName === "APPROVED",
        isRejected: statusName === "REJECTED",
        isCompleted: statusName === "COMPLETED",
        isProgress: statusName === null || statusName === "IN_PROGRESS"
    };

    // Update previous stages to completed
    for (let i = 0; i < currentStageIndex; i++) {
        newState[statusMapping[allStageKeys[i]]].isCompleted = true;
    }

    // Set the next stage to in progress if the current stage is completed
    if (newState[currentStage].isCompleted && plot && currentStageIndex + 1 < allStageKeys.length) {
      newState[statusMapping[allStageKeys[currentStageIndex + 1]]].isProgress = true;
    }

    return newState;
  };
