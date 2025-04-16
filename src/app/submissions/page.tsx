import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchSubmissions} from "@/actions/submissions";
import SubmissionTable from "@/components/submission-table";

const Page = async () =>{
    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["submissions"],
        queryFn : () => fetchSubmissions()
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <SubmissionTable/>
    </HydrationBoundary>
}

export default Page