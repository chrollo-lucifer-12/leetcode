import {useMutationData} from "@/hooks/useMutationData";
import {addNewProblem} from "@/actions/problem";
import useZodForm from "@/hooks/useZodForm";
import {ProblemFormSchema} from "@/lib/definitions";

export const useAddProblem = () => {
    const {isPending, mutateAsync} = useMutationData(["add-problem"], (data) => addNewProblem(data.title, data.description), "all-problems")

    const {res,onFormSubmit,errors,register} = useZodForm(ProblemFormSchema, mutateAsync);

    return {res, onFormSubmit, errors, register, isPending}
}