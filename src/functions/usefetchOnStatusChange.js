import { useEffect } from 'react';

const useFetchOnStatusChange = (status, fetchDetailsFunc, crmId, refetchFlag, setLoading, setStatus, setError, condition = () => true, additionalDeps = []) => {
    useEffect(() => {
        const hasStatusChanged = status.isApproved || status.isRejected || status.isCompleted || status.isPending;
        if ((hasStatusChanged || refetchFlag) && condition(status, refetchFlag)) {
            console.log(`Fetching details due to status change or refetch flag.`);
            fetchDetailsFunc(crmId, setLoading, setStatus, setError);
        }
    }, [status.isApproved, status.isRejected, status.isCompleted, status.isPending, refetchFlag, crmId, setLoading, setStatus, setError, ...additionalDeps]);
};

export default useFetchOnStatusChange;