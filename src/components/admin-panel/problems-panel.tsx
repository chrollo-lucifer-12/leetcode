"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {deleteProblem, fetchAllProblems} from "@/actions/problem";
import {ProblemProps} from "@/lib/definitions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AddProblemForm from "@/components/admin-panel/add-problem-form";
import {DeleteIcon} from "lucide-react";
import {useMutationData} from "@/hooks/useMutationData";
import AddTestcaseForm from "@/components/admin-panel/add-testcase-form";


const ProblemsPanel = () => {
    const {data, isFetching} = useQueryData(["all-problems"], () => fetchAllProblems());
    const {mutateAsync} = useMutationData(["delete-problem"], (data) => deleteProblem(data.problemId), "all-problems");

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
                    <TableHead className={"text-white"}>Add Test Case</TableHead>
                    <TableHead className={"text-white"}>Delete Problem</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                  !isFetching &&  allProblems.map((problem) => (
                        <TableRow key={problem.id}>
                            <TableCell className={"text-white"}>{problem.title}</TableCell>
                            <TableCell className={"text-white"}>{problem._count.Submission}</TableCell>
                            <TableCell className={"text-green-200 cursor-pointer text-center"}>
                                <AddTestcaseForm problemId={problem.id}/>
                            </TableCell>
                            <TableCell onClick={async () => {
                                await mutateAsync({problemId : problem.id})
                            }} className={"text-red-200 cursor-pointer text-center"}><DeleteIcon/></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default ProblemsPanel