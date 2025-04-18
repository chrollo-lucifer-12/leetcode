import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getSubmission} from "@/actions/submissions";
import SubmissionDisplay from "@/components/submission-display";

type Params = Promise<{submissionId : string}>

const Page = async (props : {params : Params}) => {
    const params = await props.params
    const {submissionId} = params

    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey : ["problem-submission", submissionId],
        queryFn : () => getSubmission(submissionId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
            <SubmissionDisplay submissionId={submissionId}/>
    </HydrationBoundary>
}

export default Page