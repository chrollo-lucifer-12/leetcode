import {z} from "zod"
import {Language} from "@prisma/client"

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

export const routes = [
    {
        name : "Problems",
        href : "/problems"
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

export type ProblemProps = ({     TestCase: {         id: string      ,   input: string  ,       output: string      ,   problemId: string     }[]    , _count: {         Submission: number     } } & {     id: string  ,   title: string   ,  description: string })

export type CodeProps =  {     code: string   ,  id: string   ,  language: Language}

