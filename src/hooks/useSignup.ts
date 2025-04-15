"use client"

import useZodForm from "@/hooks/useZodForm";
import {SignupFormSchema} from "@/lib/definitions";
import {useMutationData} from "@/hooks/useMutationData";
import {createUser} from "@/actions/user";

export const useSignup = () => {
    const {mutateAsync, isPending} = useMutationData(["user-signup"], (data) => createUser(data.username, data.password))
    const {onFormSubmit,register,errors, res} = useZodForm(SignupFormSchema, mutateAsync)

    return {isPending, onFormSubmit, register, errors, res};
}

