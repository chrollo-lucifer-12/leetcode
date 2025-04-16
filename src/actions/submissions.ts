"use server"
import {prisma} from "@/lib/db";


export const fetchSubmissions = async () => {
    try {
        const submissions = await prisma.submission.findMany({
            select: {
                status: true,
                language: true,
                problem: {
                    select: {
                        title: true
                    }
                },
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
        return submissions;
    } catch (e) {
        console.log(e);
    }
}