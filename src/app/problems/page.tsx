import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getAllProblems} from "@/actions/problem";
import ProblemsPanel from "@/components/problems-panel";

const Page = async () => {
    const query = new QueryClient();


    await query.prefetchQuery({
        queryKey : ["problems"],
        queryFn : () => getAllProblems()
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <ProblemsPanel/>
    </HydrationBoundary>
}

export default Page