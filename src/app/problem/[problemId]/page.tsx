import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getProblemDetails, getSubmissions} from "@/actions/problem";
import ProblemDisplay from "@/components/problem-display";

type Params = Promise<{problemId : string}>

const Page =  async (props : {params : Params}) => {
    const params = await props.params
    const {problemId} = params

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["problem-details", problemId],
        queryFn : () => getProblemDetails(problemId),
    })

    await query.prefetchQuery({
        queryKey : ["problem-submissions", problemId],
        queryFn : () => getSubmissions(problemId),
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <ProblemDisplay problemId={problemId}/>
    </HydrationBoundary>
}
export default Page