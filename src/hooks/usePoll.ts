import {useMutationData} from "@/hooks/useMutationData";
import {getSubmission} from "@/actions/submissions";


export const usePoll = (token : string, submissionId : string) => {
    const {isPending, mutateAsync} = useMutationData(["get-submission"], () => getSubmission(token, submissionId), "problem-details");
    return {mutateAsync};
}