"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { fetchSubmissions } from "@/actions/submissions";
import { SubmissionProps } from "@/lib/definitions";
import RoutesNavbar from "@/components/routes-navbar";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AddTestcaseForm from "@/components/admin-panel/add-testcase-form";
import {DeleteIcon} from "lucide-react";

const SubmissionTable = () => {
    const { data, isFetching } = useQueryData(["submissions"], () => fetchSubmissions());

    const submissions = data as SubmissionProps[];

    if (isFetching) {
        return <p>Loading...</p>;
    }

    return (
        <div className={"w-full flex flex-col justify-center items-center h-full"}>
            <div className={"mt-10 h-full w-[80%]"}>
                <RoutesNavbar/>
                <div className={"border-1 mt-2 border-[#898989]"}></div>
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead className={"text-white"}>Problem</TableHead>
                            <TableHead className={"text-white"}>Language</TableHead>
                            <TableHead className={"text-white"}>User</TableHead>
                            <TableHead className={"text-white"}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            submissions.map((submission,index) => (
                                <TableRow key={index}>
                                    <TableCell className={"text-white"}>{submission.problem.title}</TableCell>
                                    <TableCell className={"text-white"}>{submission.language}</TableCell>
                                    <TableCell className={"text-white"}>{submission.user.username}</TableCell>
                                    <TableCell className={"text-white"}>{submission.status}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default SubmissionTable;
