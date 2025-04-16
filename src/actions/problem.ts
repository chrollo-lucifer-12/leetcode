"use server"

import {prisma} from "@/lib/db";
import {getCurrentSession} from "@/lib/cookie";

export const fetchNumberOfProblems = async () => {
    try {
        const problems = await prisma.problem.count();
        return problems;
    } catch (e) {
        console.log(e);
        return 0;
    }
}

export const fetchAllProblems = async () => {
    try {
        const problems = await prisma.problem.findMany({
            include: {
                TestCase: true,
                _count: {
                    select: {
                        Submission: {
                            where: {
                                status: "ACCEPTED",
                            },
                        },
                    },
                },
            },
        });
        return problems;
    } catch (e) {
        console.log(e);
    }
}

export const fetchDefaultCode = async () => {
    try {
        const codes = await prisma.defaultCode.findMany();
        return codes;
    } catch (e) {
        console.log(e);
    }
}

export const addNewProblem = async (title : string, description : string) => {
    console.log("Add new problem hit")
    try {
        await prisma.problem.create({
            data : {
                title,
                description
            }
        })
        return {
            success : true,
            message : "Problem added successfully"
        }
    } catch (e) {
        console.log(e);
        return {
            success : false,
            message : "Problem cannot be added"
        }
    }
}

export const deleteProblem = async (problemId : string) => {
    try {
        await prisma.problem.delete({
            where : {
                id : problemId
            },
        })
    } catch (e) {
        console.log(e);
    }
}

export const addTestCase = async ( input : string, output : string, problemId : string,) => {
    try {
         await prisma.testCase.create({
             data : {
                 problemId,
                 input,
                 output
             }
         })
        return {
             success : true,
             message : "Test case added successfully",
        }
    } catch (e) {
        console.log(e);
        return {
            success : false,
            message : "Test case cannot be added",
        }
    }
}

export const getLatestProblems = async () => {
    try {
        const problems = await prisma.problem.findMany({
            take : 10,
            select : {
                title : true
            }
        })
        return problems
    } catch (e) {
        console.log(e);
    }
}

export const getAllProblems = async () => {
    try {
        const {user} = await getCurrentSession();

        const problems = await prisma.problem.findMany({
            include : {
                Submission : {
                    where : {
                        user : {
                            id : user!.id
                        }
                    },
                    select : {
                        status : true
                    }
                }
            }
        });
        return problems;
    } catch (e) {
        console.log(e);
    }
}

