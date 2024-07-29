import React, { useEffect } from 'react';
import { fetchSiteVisitDetails } from './fetchSiteVisitDetails';
import { fetchPaymentDetails } from './fetchTokenAdvancedetails';
import { fetchDocumentationDetails } from './fetchDocumentDeatils';
import { fetchFullPaymentDetails } from './fetchFullPaymentDeatils';
import { fetchDocumentationDeliveryDetails } from './fetchDocumentDeliveryDetails';

// Map stages to their respective fetch functions
export const stageFetchFunctions = {
    'siteVisit': fetchSiteVisitDetails,
    'tokenAdvance': fetchPaymentDetails,
    'documentation': fetchDocumentationDetails,
    'payment': fetchFullPaymentDetails,
    'ddDelivery': fetchDocumentationDeliveryDetails
};

// Function to fetch details for required stages
export const fetchDetailsForRequiredStages = async (status, crmId, setLoading, setStatus, setError) => {
    const stagesToFetch = [];

    // Determine stages to fetch based on status
    const stageOrder = ['siteVisit', 'tokenAdvance', 'documentation', 'payment', 'ddDelivery'];
    stageOrder.forEach((stage, index) => {
        if (status[stage].isApproved || status[stage].isRejected || status[stage].isCompleted || status[stage].isPending) {
            // Add all previous stages plus the current one
            for (let i = 0; i <= index; i++) {
                stagesToFetch.push(stageOrder[i]);
            }
        }
    });

    [...new Set(stagesToFetch)].forEach(stage => {
        const fetchFunction = stageFetchFunctions[stage];
        if (fetchFunction) {
            fetchFunction(crmId, setLoading, setStatus, setError);
        }
    });
};