import {z} from "zod"
import {ROLE} from "@prisma/client";

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

export type ProblemSubmissionProps =  {     code: string  ,   language: string  ,   status: string ,    createdAt: Date,     problem: {         id: string   ,      title: string   ,      description: string     }  ,   user: {         id: string    ,     username: string    ,     password: string   ,      role: ROLE     } }

export type SingleProblemProps =   {     id: string ,   title: string   ,  description: string }

export type  ProblemSubmissionsProps = {     status: string   , id : string,  language: string  ,   user: {         username: string     }   ,  createdAt: Date }

export type ProblemDisplayProps =  ({     Submission: {         status: string     }[] } & {     id: string  ,   title: string   ,  description: string })

export type SubmissionProps = {     language: string  ,   status: string  ,   problem: {         title: string     }    , user: {         username: string     } }

export type ProblemProps = ({     TestCase: {         id: string      ,   input: string  ,       output: string      ,   problemId: string     }[]    , _count: {         Submission: number     } } & {     id: string  ,   title: string   ,  description: string })


