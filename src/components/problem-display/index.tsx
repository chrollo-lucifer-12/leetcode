"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { getProblemDetails } from "@/actions/problem";
import {  SingleProblemProps } from "@/lib/definitions";
import { useState } from "react";
import React from "react"
import Task from "@/components/problem-display/task";
import Results from "@/components/problem-display/Results";
import Submit from "@/components/problem-display/submit";

const tabs = ["TASK", "SUBMIT", "RESULTS"] as const;

const ProblemDisplay = ({ problemId }: { problemId: string }) => {
    const { data, isFetching } = useQueryData(["problem-details", problemId], () => getProblemDetails(problemId))
    const problem = data as SingleProblemProps;
    const [tab, setTab] = useState<"TASK" | "SUBMIT" | "RESULTS">("TASK")

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-white text-2xl font-bold">{problem.title}</h1>

                    <div className="flex mt-6 border-b border-gray-700">
                        {tabs.map((t, i) => (
                            <button
                                key={i}
                                className={`px-6 py-3 font-medium transition-colors ${
                                    tab === t
                                        ? "text-blue-400 border-b-2 border-blue-400"
                                        : "text-gray-400 hover:text-gray-300"
                                }`}
                                onClick={() => setTab(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {tab === "TASK" && <Task description={problem.description} />}
                    {tab === "RESULTS" && <Results problemId={problemId} />}
                    {tab === "SUBMIT" && <Submit setTab={setTab} problemId={problemId} />}
                </div>
            </div>
        </div>
    );
}

export default ProblemDisplay;