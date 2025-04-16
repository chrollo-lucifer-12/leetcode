"use server"

import {prisma} from "@/lib/db";
import {hash, compare} from "bcrypt"
import {createSession, generateSessionToken} from "@/lib/session";
import {setSessionCookie} from "@/lib/cookie";

export const createUser = async (username : string, password : string) => {
    try {
        const existingUser = await prisma.user.findUnique({where : {username}})
        if (existingUser) {
            return {
                success : false,
                message : "Username already taken"
            }
        }
        const hashedPassword = await hash(password, 10);
        await prisma.user.create({
            data : {
                password : hashedPassword,
                username
            }
        })
        return {
            success: true,
            message: "User created successfully. Redirecting to login...",
        };
    } catch (e) {
        console.log(e);
        return {
            success : false,
            message : "Cannot create user"
        }
    }
}

export const loginUser = async (username : string, password : string) => {
    try {
        const existingUser = await prisma.user.findUnique({where : {username}})
        if (!existingUser) {
            return {
                success : false,
                message : "User doesn't exist with this username"
            }
        }
        const isCorrectPassword =  await compare(password, existingUser.password);
        if (!isCorrectPassword) {
            return {
                success : false,
                message : "Username or password is incorrect"
            }
        }
        const token = await generateSessionToken();
        const session = await createSession(token, existingUser.id);
        await setSessionCookie(token,session.expiresAt);
        return {
            success: true,
            message: "Login Successful!",
        };
    } catch (e) {
        console.log(e);
        return {
            success : false,
            message : "Cannot Login user"
        }
    }
}