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
        console.log(res);
        return {
            token : res.data.token,
            submissionId : submission.id
        }
    } catch (e) {
        console.log(e);
    }
}

export const getSubmission = async (token : string, submissionId : string) => {
    try {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: ''
            },
            headers: {
                'x-rapidapi-key': '3a006de1c3mshaf3de9a222d09a8p17a9ccjsn3e4ea8ace224',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        console.log(response);
        let status;

        switch (response.data.status.id) {
            case 1:
                status = "PENDING"
                break
            case 2:
                status = "PENDING"
                break
            case 3:
                status = "ACCEPTED"
                break
            case 4:
                status = "REJECTED"
                break
            case 5:
                status = "NOTSUBMITTED"
                break
            case 6:
                status = "ERROR"
                break
            default :
                break
        }

        await prisma.submission.update({
            where : {id : submissionId},
            data : {
                status : status,
            }
        })
    } catch (e) {
        console.log(e);
    }
}