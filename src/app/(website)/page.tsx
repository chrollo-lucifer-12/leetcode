"use client"

import Navbar from "@/components/navbar";
import React from "react"
import ProgressBar from "@/components/progress-bar";
import RoutesNavbar from "@/components/routes-navbar";
import {useQueryData} from "@/hooks/useQueryData";
import {getLatestProblems} from "@/actions/problem";

const Page = () => {

    const {data,isFetching} = useQueryData(["latest-problems"], () => getLatestProblems())

    const latestProblems = data as {title : string}[]

    return <div className={"w-full flex flex-col justify-center items-center h-full"}>
        <Navbar/>
        <div className={"mt-10 h-full w-[80%]"}>
            <RoutesNavbar/>
            <div className={"border-1 mt-2 border-[#898989]"}></div>
            <div className={"flex gap-x-2"}>
                <div className={"w-[20%] justify-center items-center"}>
                    <ProgressBar/>
                </div>
                <div className={"w-[60%] border-1 rounded p-2"}>
                    <p className={"font-bold text-white"}>Latest Problems</p>
                    {
                      !isFetching &&  latestProblems.map((problem,i) => (
                            <p className={"text-white p-3 hover:bg-gray-200"} key={i}>{problem.title}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Page