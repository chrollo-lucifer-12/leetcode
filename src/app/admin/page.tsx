import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchAllProblems} from "@/actions/problem";
import {getCurrentSession} from "@/lib/cookie";
import {redirect} from "next/navigation";
import AdminPanel from "@/components/admin-panel";

const Page = async () => {

    const {user} = await getCurrentSession();

    if (!user || user.role !=="ADMIN") {
        redirect("/")
    }

    const query = new  QueryClient();

    await query.prefetchQuery({
        queryKey : ["all-problems"],
        queryFn : () => fetchAllProblems()
    })


    return <HydrationBoundary state={dehydrate(query)}>
        <AdminPanel/>
    </HydrationBoundary>
}

export default Page