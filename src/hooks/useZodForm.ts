"use client"

import {z, ZodSchema} from "zod";
import {UseMutateAsyncFunction} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

const useZodForm = (schema : ZodSchema, mutation: UseMutateAsyncFunction) => {
    const [res, setRes] =   useState<{success : boolean, message : string} | null>(null)
    const {handleSubmit,register,formState : {errors}} = useForm<z.infer<typeof schema>>({resolver : zodResolver(schema)})
    const onFormSubmit = handleSubmit(async (values) => {
        const res = await mutation({...values})
        setRes(res);
    })
    return {onFormSubmit, register, errors, res};
}

export default useZodForm