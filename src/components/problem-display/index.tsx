"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {getProblemDetails} from "@/actions/problem";
import {routes, SingleProblemProps} from "@/lib/definitions";
import {useState} from "react";
import React from "react"
import Task from "@/components/problem-display/task";
import Results from "@/components/problem-display/Results";
import Submit from "@/components/problem-display/submit";

const tabs = ["TASK", "SUBMIT", "RESULTS"] as const;

const ProblemDisplay = ({problemId} : {problemId : string}) => {
    const {data, isFetching} = useQueryData(["problem-details"], () => getProblemDetails(problemId))

    const problem = data as SingleProblemProps;

    const [tab, setTab] = useState<"TASK" | "SUBMIT" | "RESULTS" >("TASK")
    const [token, setToken] = useState("")
    const [submissionId, setSubmissionId] = useState("")

    if (isFetching) {
        return <div className="text-white text-center mt-10">Loading problem details...</div>;
    }


    return <div className={"ml-32 mr-32 mt-6 "}>
        <p className={"text-white text-2xl font-bold"}>{problem.title}</p>
        <div className="flex space-x-4 mt-2">
            {
                tabs.map((t, i) => (
                    <React.Fragment key={i}>
                        <p className="text-blue-400 cursor-pointer" onClick={() => {
                            setTab(t)
                        }}>
                            {t}
                        </p>
                        {i < routes.length - 1 && (
                            <div className="border-r border-[#3a3939] h-5"/>
                        )}
                    </React.Fragment>
                ))
            }
        </div>
        <div className={"border-1"}/>
        <div className={"mt-4 w-[60%] h-[550px]"}>
            {
                tab === "TASK" &&  <Task description={problem.description}/>
            }
            {
                tab === "RESULTS" && <Results submissionId={submissionId} token={token} Submissions={problem.Submission}/>
            }
            {
                tab === "SUBMIT" && <Submit setSubmissionId={setSubmissionId} setToken={setToken} setTab={setTab} problemId = {problemId} />
            }
        </div>
    </div>
}

export default ProblemDisplay