"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { getAllProblems } from "@/actions/problem";
import { ProblemDisplayProps } from "@/lib/definitions";
import Link from "next/link";

const ProblemsPanel = () => {
    const { isFetching, data } = useQueryData(["problems"], () => getAllProblems())
    const problems = data as ProblemDisplayProps[];

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Problem Set</h1>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Header row */}
                <div className="flex items-center bg-gray-700 text-gray-300 text-sm font-medium">
                    <div className="p-4 w-16 flex justify-center">
                        #
                    </div>
                    <div className="py-4 flex-grow">
                        Title
                    </div>
                    <div className="p-4 w-24 text-center">
                        Submissions
                    </div>
                    <div className="p-4 w-24 text-center">
                        Status
                    </div>
                </div>

                {/* Problem rows */}
                {problems && problems.map((problem, index) => (
                    <div
                        key={problem.id}
                        className="flex items-center border-b border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                        <div className="p-4 w-16 flex justify-center text-gray-400">
                            <span>{index + 1}</span>
                        </div>
                        <div className="py-4 flex-grow">
                            <Link
                                href={`/problem/${problem.id}`}
                                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                                {problem.title}
                            </Link>
                        </div>
                        <div className="p-4 w-24 text-center">
                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                                {problem.Submission.length}
                            </span>
                        </div>
                        <div className="p-4 w-24 flex justify-center">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-gray-400">
                                −
                            </span>
                        </div>
                    </div>
                ))}

                {/* Loading and empty states */}
                {isFetching && (
                    <div className="flex justify-center items-center p-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {!isFetching && (!problems || problems.length === 0) && (
                    <div className="text-center p-12 text-gray-400">
                        No problems available yet
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProblemsPanel;