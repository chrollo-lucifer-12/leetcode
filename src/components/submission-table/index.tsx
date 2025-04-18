"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { fetchSubmissions } from "@/actions/submissions";
import { SubmissionProps } from "@/lib/definitions";
import RoutesNavbar from "@/components/routes-navbar";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SubmissionTable = () => {
    const { data, isFetching } = useQueryData(["submissions"], () => fetchSubmissions());
    const submissions = data as SubmissionProps[];

    const getStatusBadge = (status : string) => {
        let bgColor;
        const textColor = "text-white";

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
            case "runtime error":
                bgColor = "bg-orange-600";
                break;
            default:
                bgColor = "bg-gray-600";
        }

        return (
            <span className={`${bgColor} ${textColor} px-2 py-1 rounded-md text-xs font-medium`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <RoutesNavbar />
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-white">Recent Submissions</h1>
                    </div>

                    {isFetching ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : submissions && submissions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-700 border-none">
                                        <TableHead className="text-gray-300 font-medium">Problem</TableHead>
                                        <TableHead className="text-gray-300 font-medium">Language</TableHead>
                                        <TableHead className="text-gray-300 font-medium">User</TableHead>
                                        <TableHead className="text-gray-300 font-medium">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.map((submission, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                                        >
                                            <TableCell className="text-blue-400 font-medium">
                                                {submission.problem.title}
                                            </TableCell>
                                            <TableCell>
                                                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                                    {submission.language}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-300">
                                                {submission.user.username}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(submission.status)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center p-12 text-gray-400">
                            No submissions found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmissionTable;