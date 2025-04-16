import {z} from "zod"
import {Language, SubmissionStatus} from "@prisma/client"

export const SignupFormSchema = z.object({
    username : z.string().min(3, {message : "Username is too short"}),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export const ProblemFormSchema = z.object({
    title : z.string().min(1, {message : "Title cannot be empty"}),
    description : z.string().min(1,{message : "Description cannot be empty"})
})

export const TestCaseSchema = z.object({
    input : z.string().min(1, {message : "Input cannot be empty"}),
    output : z.string().min(1, {message : "Output cannot be empty"}),
    problemId : z.string()
})

export const routes = [
    {
        name : "Home",
        href : "/"
    },
    {
      name : "Problems",
      href : "/problems"
    },
    {
        name : "Submissions",
        href : "/submissions"
    },
    {
        name : "Leaderboard",
        href : "/leaderboard"
    },
    {
        name : "Contests",
        href : "/contests"
    }
]

export type SingleProblemProps =  {     id: string  ,   title: string   ,  description: string ,    Submission: {         problemId: string   ,      id: string ,        userId: string   ,      code: string    ,     language: Language   ,      status: SubmissionStatus   ,      createdAt: Date    ,     updatedAt: Date     }[] }

export type ProblemDisplayProps =  ({     Submission: {         status: SubmissionStatus     }[] } & {     id: string  ,   title: string   ,  description: string })

export type SubmissionProps = {     language: Language  ,   status: SubmissionStatus  ,   problem: {         title: string     }    , user: {         username: string     } }

export type ProblemProps = ({     TestCase: {         id: string      ,   input: string  ,       output: string      ,   problemId: string     }[]    , _count: {         Submission: number     } } & {     id: string  ,   title: string   ,  description: string })

export type CodeProps =  {     code: string   ,  id: string   ,  language: Language}

