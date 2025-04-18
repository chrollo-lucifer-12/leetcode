"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {getSubmissions} from "@/actions/problem";
import {ProblemSubmissionsProps} from "@/lib/definitions";
import Image from "next/image";

const Results = ({problemId} : {problemId : string}) => {

    const {isFetching, data} = useQueryData(["problem-submissions"], () => getSubmissions(problemId));

    if (isFetching) {
        return <Image src={"./loader.svg"} alt={"loader"} width={20} height={20} />
    }

    const submissions = data as ProblemSubmissionsProps[];

    return <div className="overflow-x-auto text-white p-4 rounded">
        <table className="table-auto w-full text-sm border border-gray-600">
            <thead>
            <tr className="text-center">
                <th className="border border-gray-600 p-2">User</th>
                <th className="border border-gray-600 p-2">time</th>
                <th className="border border-gray-600 p-2">lang</th>
                <th className="border border-gray-600 p-2">result</th>
            </tr>
            </thead>
            <tbody>
            {submissions.map((entry, i) => (
                <tr key={i} className="text-center">
                    <td>{entry.user.username}</td>
                    <td className="border border-gray-600 p-2">{entry.createdAt.toDateString()}</td>
                    <td className="border border-gray-600 p-2">{entry.language}</td>
                    <td className="border border-gray-600 p-2">
                        {entry.status}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}

export default Results