import {z} from "zod"

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