"use server"
import {prisma} from "@/lib/db";
import axios from "axios"
import {getCurrentSession} from "@/lib/cookie";
import {globalPOSTRateLimit} from "@/lib/request";

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


export const addSubmission = async (code : string, problemId : string, languageCode : number, languageName: string) => {
    console.log(languageName,languageCode);

    if (!await globalPOSTRateLimit()) return;

    try {
        const {user} = await getCurrentSession();

        if (!user) return;
        const findProblem = await prisma.problem.findUnique({where : {id : problemId}});
        if (!findProblem) return;

        const testCases = await prisma.testCase.findMany({
            where : {
                problemId
            }
        })

        const base64 = (str : string) => Buffer.from(str).toString('base64');

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                wait: 'false',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                language_id: languageCode,
                source_code: base64(code),
                stdin: base64(testCases[0].input),
                expected_output : base64(testCases[0].output),
                cpu_time_limit : 2,
            }
        };
        const res = await axios.request(options);
        const token =  res.data.token
        const submission = await prisma.submission.create({
            data : {
                code : code,
                language : languageName,
                problemId,
                status : "PENDING",
                userId : user.id,
                token
            }
        })
        await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL!, {
            token,
            submissionId : submission.id
        })
    } catch (e) {
        console.log(e);
    }
}

export const getSubmission = async (submissionId : string) => {
    try {
        const submission = await prisma.submission.findUnique({
            where : {id : submissionId},
            select : {
                user : true,
                problem : true,
                language : true,
                code : true,
                createdAt : true,
                status : true,
            }
        })
        return submission
    } catch (e) {
        console.log(e)
    }
}

export const getUserSubmission = async (userName : string) => {
    try {
        const submissions = await prisma.submission.findMany({
            where : {
                user : {
                    username : userName
                 }
            }
        })
        return submissions;
    } catch (e) {
        console.log(e)
    }
}