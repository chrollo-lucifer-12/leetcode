"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { fetchNumberOfProblems } from "@/actions/problem";
import { countSolvedProblems } from "@/actions/user";

const ProgressBar = () => {
    const { data: problemsData, isFetching: problemsFetching } = useQueryData(["number-problems"], () => fetchNumberOfProblems());
    const { data: solvedData, isFetching: solvedFetching } = useQueryData(["solved-problems"], () => countSolvedProblems());

    const totalProblems = problemsData as number;
    const solvedProblems = solvedData as number;
    const progress = totalProblems ? (solvedProblems / totalProblems) * 100 : 0;

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg text-white h-full">
            <h2 className="font-bold text-xl text-center mb-4">Progress</h2>

            {problemsFetching || solvedFetching ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-green-500 h-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-sm text-gray-300">
                        <div>
                            <span className="font-medium text-green-400">{solvedProblems}</span> solved
                        </div>
                        <div>
                            <span className="font-medium">{totalProblems}</span> total
                        </div>
                    </div>

                    <div className="text-center text-lg font-bold mt-2">
                        {progress.toFixed(1)}%
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProgressBar