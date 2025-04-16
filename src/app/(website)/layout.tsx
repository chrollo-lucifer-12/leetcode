import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchNumberOfProblems, getLatestProblems} from "@/actions/problem";
import {countSolvedProblems} from "@/actions/user";

const Layout = async ({children} : {children : React.ReactNode}) => {

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["number-problems"],
        queryFn: () => fetchNumberOfProblems()
    })

    await query.prefetchQuery({
        queryKey: ["solved-problems"],
        queryFn: () => countSolvedProblems()
    })

    await query.prefetchQuery({
        queryKey : ["latest-problems"],
        queryFn : () => getLatestProblems()
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <main className={"bg-[#181818] h-screen"}>
                {children}
            </main>
        </HydrationBoundary>
    )
}

export default Layout