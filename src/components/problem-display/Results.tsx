"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { getSubmissions } from "@/actions/problem";
import { ProblemSubmissionsProps } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import {useEffect} from "react";

const Results = ({ problemId, isSubmitted, setIsSubmitted }: { problemId: string, isSubmitted : boolean, setIsSubmitted :  React.Dispatch<React.SetStateAction<boolean>>  }) => {
    const { isFetching, data, refetch } = useQueryData(["problem-submissions", problemId], () => getSubmissions(problemId));

    const router = useRouter();
    const submissions = data as ProblemSubmissionsProps[];

    useEffect(() => {
        if (!isSubmitted) return;
        const interval = setInterval(() => {
            if (!submissions?.some((s) => s.status === "PENDING")) {
                clearInterval(interval);
                setIsSubmitted(false);
                return;
            }
            console.log("refetching")
            refetch();
        }, 3000);

        return () => clearInterval(interval);
    }, [isSubmitted, submissions, refetch]);

    const getStatusBadge = (status: string) => {
        let bgColor;

        switch (status.toLowerCase()) {
            case "accepted":
                bgColor = "bg-green-600";
                break;
            case "wrong answer":
                bgColor = "bg-red-600";
                break;
            case "time limit exceeded":
                bgColor = "bg-yellow-600";
                break;
            default:
                bgColor = "bg-gray-600";
        }

        return (
            <span className={`${bgColor} text-white px-2 py-1 rounded text-xs font-medium`}>
                {status}
            </span>
        );
    };


    if (!submissions || submissions.length === 0) {
        return (
            <div className="text-center p-12 text-gray-400 h-[500px]">
                No submissions found for this problem yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto h-[800px]">
            <table className="w-full text-sm text-left">
                <thead className="text-gray-400 bg-gray-700">
                <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Language</th>
                    <th className="px-4 py-3">Result</th>
                </tr>
                </thead>
                <tbody>
                {submissions.map((entry, i) => (
                    <tr
                        key={i}
                        className="border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => router.push(`/submission/${entry.id}`)}
                    >
                        <td className="px-4 py-3 text-white font-medium">{entry.user.username}</td>
                        <td className="px-4 py-3 text-gray-300">{entry.createdAt.toDateString()}</td>
                        <td className="px-4 py-3">
                                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                    {entry.language}
                                </span>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(entry.status)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;