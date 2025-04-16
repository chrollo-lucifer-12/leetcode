"use client"


import {Language, SubmissionStatus} from "@prisma/client";

interface ResultsProps {
    Submissions : {         problemId: string   ,      id: string  ,       userId: string ,        code: string   ,      language: Language      ,   status: SubmissionStatus     ,    createdAt: Date     ,    updatedAt: Date     }[]
}

const Results = ({Submissions} : ResultsProps) => {
    return <div className="overflow-x-auto text-white p-4 rounded">
        <table className="table-auto w-full text-sm border border-gray-600">
            <thead>
            <tr className="text-center">
                <th className="border border-gray-600 p-2">time</th>
                <th className="border border-gray-600 p-2">lang</th>
                <th className="border border-gray-600 p-2">result</th>
            </tr>
            </thead>
            <tbody>
            {Submissions.map((entry, i) => (
                <tr key={i} className="text-center">
                    <td className="border border-gray-600 p-2">{entry.createdAt.toDateString()}</td>
                    <td className="border border-gray-600 p-2">{entry.language}</td>
                    <td className="border border-gray-600 p-2">
                        {entry.status === "ACCEPTED" ? (
                            <span className="text-green-400">✔</span>
                        ) : (
                            <span className="text-red-400">✘</span>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}

export default Results