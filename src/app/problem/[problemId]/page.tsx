import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getProblemDetails} from "@/actions/problem";
import ProblemDisplay from "@/components/problem-display";

type Params = Promise<{problemId : string}>

const Page =  async (props : {params : Params}) => {
    const params = await props.params
    const {problemId} = params

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["problem-details"],
        queryFn : () => getProblemDetails(problemId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <ProblemDisplay problemId={problemId}/>
    </HydrationBoundary>
}


export default Page