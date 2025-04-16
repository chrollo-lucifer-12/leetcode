"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchAllProblems} from "@/actions/problem";
import {ProblemProps} from "@/lib/definitions";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AddProblemForm from "@/components/admin-panel/add-problem-form";


const ProblemsPanel = () => {
    const {data, isFetching} = useQueryData(["all-problems"], () => fetchAllProblems());

    const allProblems = data as ProblemProps[];

    return <div className={"ml-20 mr-20 flex flex-col space-y-2 justify-center items-center"}>
        <div className={"flex gap-x-6 items-center"}>
            <h1 className={"text-white"}>All Problems</h1>
            <AddProblemForm/>
        </div>
        <Table>
            <TableHeader>
                <TableRow >
                    <TableHead className={"text-white"}>Problem name</TableHead>
                    <TableHead className={"text-white"}>Successful submissions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                  !isFetching &&  allProblems.map((problem) => (
                        <TableRow key={problem.id}>
                            <TableCell className={"text-white"}>{problem.title}</TableCell>
                            <TableCell className={"text-white"}>{problem._count.Submission}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default ProblemsPanel