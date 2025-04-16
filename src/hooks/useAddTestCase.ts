import {useMutationData} from "@/hooks/useMutationData";
import {addTestCase} from "@/actions/problem";
import useZodForm from "@/hooks/useZodForm";
import {TestCaseSchema} from "@/lib/definitions";

export const useAddTestCase = () => {
    const {isPending,mutateAsync} = useMutationData(["add-testcase"], (data) => addTestCase(data.input,data.output, data.problemId))
    const {res,onFormSubmit,register,errors} = useZodForm(TestCaseSchema,mutateAsync);
    return {isPending, res, onFormSubmit, register, errors};
}