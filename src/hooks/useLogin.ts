import useZodForm from "@/hooks/useZodForm";
import {SignupFormSchema} from "@/lib/definitions";
import {useMutationData} from "@/hooks/useMutationData";
import {loginUser} from "@/actions/user";

export const useLogin = () => {
    const {mutateAsync, isPending} = useMutationData(["user-login"], (data) => loginUser(data.username, data.password));
    const {onFormSubmit,register,errors, res} = useZodForm(SignupFormSchema, mutateAsync)
    return {isPending, onFormSubmit, register, errors, res};
}