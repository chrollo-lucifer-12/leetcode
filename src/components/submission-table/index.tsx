"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { fetchSubmissions } from "@/actions/submissions";
import { SubmissionProps } from "@/lib/definitions";

const SubmissionTable = () => {
    const { data, isFetching } = useQueryData(["submissions"], () => fetchSubmissions());

    const submissions = data as SubmissionProps[];

    if (isFetching) {
        return <p>Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border">User</th>
                    <th className="px-4 py-2 border">Problem</th>
                    <th className="px-4 py-2 border">Language</th>
                    <th className="px-4 py-2 border">Status</th>
                </tr>
                </thead>
                <tbody>
                {submissions?.map((submission, index) => (
                    <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{submission.user.username}</td>
                        <td className="px-4 py-2 border">{submission.problem.title}</td>
                        <td className="px-4 py-2 border">{submission.language}</td>
                        <td className="px-4 py-2 border">{submission.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubmissionTable;
