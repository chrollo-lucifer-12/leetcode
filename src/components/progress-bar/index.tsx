"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchNumberOfProblems} from "@/actions/problem";
import {countSolvedProblems} from "@/actions/user";
import Image from "next/image";


const ProgressBar = () => {

    const {data : problemsData, isFetching : problemsFetching} = useQueryData(["number-problems"], () => fetchNumberOfProblems());
    const {data : solvedData, isFetching : solvedFetching} = useQueryData(["solved-problems"], () => countSolvedProblems());

    const totalProblems = problemsData as number;
    const solvedProblems = solvedData as number;
    const progress = totalProblems ? (solvedProblems / totalProblems) * 100 : 0;

    return <div className={"text-white items-center flex flex-col h-[250px] border-1 rounded-md p-2 justify-between"}>
        <h1 >Progress</h1>
        <div>
            {
                problemsFetching || solvedFetching ? (<Image src={"./loader.svg"} width={20} height={20} alt={"loader"}/>) : (
                    <div className={"flex flex-col space-y-2"}>
                        <div className={"w-full h-[5px] flex rounded overflow-hidden"}>
                            <div className={`w-[${progress}%] bg-green-300`}/>
                            <div
                                className="bg-red-300 h-full"
                                style={{width: `${100 - progress}%`}}
                            />
                        </div>
                        <div className={"flex justify-between space-x-2"}>
                            <p className={"text-xs"}>Solved Problems : {solvedProblems}</p>
                            <p className={"text-xs"}>Total Problems : {totalProblems}</p>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
}

export default ProgressBar