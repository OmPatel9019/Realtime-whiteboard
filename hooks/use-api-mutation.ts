import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
    // tracks whether the API call is still pending
    const [pending, setPending] = useState(false);
    // create a Convex mutation instance using the passed function
    const apiMutation = useMutation(mutationFunction);

    // wrapper around the mutation that flips the pending flag
    const mutate = (payload: any) => {
        setPending(true);
        // ensure pending is reset regardless of success/failure
        return apiMutation(payload).finally(() => setPending(false));
    };

    // expose the helper and the pending state
    return {
        mutate,
        pending,
    };
};