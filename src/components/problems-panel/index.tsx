"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {getAllProblems} from "@/actions/problem";
import {ProblemDisplayProps} from "@/lib/definitions";
import Link from "next/link";

const ProblemsPanel = () => {
    const {isFetching, data} = useQueryData(["problems"], () => getAllProblems())
    const problems = data as ProblemDisplayProps[];

    return (
        <div className="ml-20 mr-20">
            <p className="p-6 text-white font-bold text-2xl">Problem Set</p>
            <div className="bg-gray-900 rounded-md">
                {problems && problems.map((problem) => (
                    <div key={problem.id} className="flex items-center border-b border-gray-800 hover:bg-gray-800">
                        <div className="p-4 w-12 flex justify-center text-gray-400">
                            <span className="text-sm">📄</span>
                        </div>
                        <div className="py-4 flex-grow">
                            <Link href={`/problems/${problem.id}`} className="text-blue-400 hover:underline">
                                {problem.title}
                            </Link>
                        </div>
                        <div className="p-4 text-right text-gray-400">
                            {
                                problem.Submission.length
                            }
                        </div>
                        <div className="p-4 w-12 flex justify-center text-gray-500">
                            <span>−</span>
                        </div>
                    </div>
                ))}
                {isFetching && (
                    <div className="text-center p-4 text-gray-400">
                        Loading problems...
                    </div>
                )}
                {!isFetching && (!problems || problems.length === 0) && (
                    <div className="text-center p-4 text-gray-400">
                        No problems available
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProblemsPanel;