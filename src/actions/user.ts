"use server"

import {prisma} from "@/lib/db";
import {hash, compare} from "bcrypt"
import {createSession, generateSessionToken} from "@/lib/session";
import {deleteSessionTokenCookie, setSessionCookie} from "@/lib/cookie";
import {globalPOSTRateLimit} from "@/lib/request";

export const createUser = async (username : string, password : string) => {

    if (!await globalPOSTRateLimit()) {
        return {
            success : false,
            message : "Too many requests"
        }
    }

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
        await deleteSessionTokenCookie();
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
    if (!await globalPOSTRateLimit()) {
        return {
            success : false,
            message : "Too many requests"
        }
    }
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
        await deleteSessionTokenCookie();
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

export const userDetails = async (username : string) => {
    try {
        const userDetails = await prisma.user.findUnique({
            where : {username},
            select : {
                username : true
            }
        })
        return userDetails;
    } catch (e) {
        console.log(e);
    }
}