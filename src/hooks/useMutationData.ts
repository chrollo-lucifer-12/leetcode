"use client"
import {MutationFunction, MutationKey, useMutation, useQueryClient} from "@tanstack/react-query";

export const useMutationData = (mutationKey : MutationKey, mutationFn: MutationFunction<any,any>, queryKey?: string, onSuccess?: () => void) => {

    const client = useQueryClient();

    const {isPending, mutateAsync} = useMutation({
        mutationKey,
        mutationFn,
        onSuccess(data) {
            if (onSuccess) {
                onSuccess();
            }
        },
        onSettled: async () => {
            return await client.invalidateQueries({queryKey:[queryKey]})
        }
    });

    return {mutateAsync, isPending}
}