"use client"

import React from "react"
import ProgressBar from "@/components/progress-bar";
import RoutesNavbar from "@/components/routes-navbar";
import { useQueryData } from "@/hooks/useQueryData";
import { getLatestProblems } from "@/actions/problem";

const Page = () => {
    const { data, isFetching } = useQueryData(["latest-problems"], () => getLatestProblems())
    const latestProblems = data as { title: string }[]

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <RoutesNavbar />
                <div className="h-px bg-gray-700 my-4"></div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <ProgressBar />
                    </div>
                    <div className="w-full md:w-3/4 bg-gray-800 rounded-lg p-4 shadow-lg">
                        <h2 className="font-bold text-xl text-white mb-4">Latest Problems</h2>
                        {isFetching ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {latestProblems?.map((problem, i) => (
                                    <div
                                        className="text-white p-3 rounded transition-colors hover:bg-gray-700 cursor-pointer"
                                        key={i}
                                    >
                                        {problem.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
