"use server"
import {prisma} from "@/lib/db";
import axios from "axios"
import {getCurrentSession} from "@/lib/cookie";

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
        void pollSubmission(submission.id);
        return submission.id;
    } catch (e) {
        console.log(e);
    }
}

export const pollSubmission = async (submissionId : string) => {
    try {
        const findSubmission = await prisma.submission.findUnique({where : {id : submissionId}});
        const token = findSubmission!.token;
        const res = await axios.request({
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        });
        console.log(res.data.status.description);
        await prisma.submission.update({
            where : {id : submissionId},
            data : {
                status : res.data.status.description
            }
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