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


export const addSubmission = async (code : string, problemId : string) => {
    try {
        const {user} = await getCurrentSession();

        if (!user) return;
        const findProblem = await prisma.problem.findUnique({where : {id : problemId}});
        if (!findProblem) return;


        console.log("submitting")

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
                language_id: 105,
                source_code: base64(code),
                stdin: base64(testCases[0].input),
                expected_output : base64(testCases[0].output),
                cpu_time_limit : 2,
            }
        };

        const submission = await prisma.submission.create({
            data : {
                code : code,
                language : "CPP",
                problemId,
                status : "PENDING",
                userId : user.id
            }
        })

        const res = await axios.request(options);

        const token =  res.data.token


        let status = "In Queue"
        let result = null;

        for (let i=0; i<10; i++) {
            await new Promise(res => setTimeout(res, 1000));
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

            result = res.data;

            if (result?.status?.id >= 3) {
                status = result.status.description;
                break;
            }
        }

        const submission2 =  await prisma.submission.update({
            where : {id : submission.id},
            data : {
                status
            }
        })
        return submission2;
    } catch (e) {
        console.log(e);
    }
}