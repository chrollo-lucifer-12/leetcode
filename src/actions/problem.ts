"use server"

import {prisma} from "@/lib/db";

export const fetchNumberOfProblems = async () => {
    try {
        const problems = await prisma.problem.count();
        return problems;
    } catch (e) {
        console.log(e);
        return 0;
    }
}