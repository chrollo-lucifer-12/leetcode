"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {useAddProblem} from "@/hooks/useAddProblem";
import FormGenerator from "@/components/form-generator";
import Image from "next/image";

const AddProblemForm = () => {

    const {isPending,errors,onFormSubmit,register,res} = useAddProblem()

    return <Dialog>
        <DialogTrigger>
            <Button className={"bg-white text-black hover:bg-gray-200"}>Add Problem</Button>
        </DialogTrigger>
        <DialogContent className={"bg-black"}>
            <DialogHeader  className={"text-white"}>
                <DialogTitle>Add a new problem</DialogTitle>
            </DialogHeader>
            <form onSubmit={onFormSubmit}>
                <FormGenerator inputType={"input"} register={register} name={"title"} errors={errors} label={"Title"} placeholder={"Title for problem"}/>
                <FormGenerator inputType={"input"} register={register} name={"description"} errors={errors} label={"Description"} placeholder={"Description for problem"}/>
                {
                    res && res?.success ? (<p className={"text-center text-green-600"}>{res.message}</p>) : (
                        <p className={"text-center text-red-600 font-bold p-1 rounded-md"}> {res?.message}</p>)
                }
                <Button type={"submit"} className={"w-full bg-white text-black hover:bg-gray-200 mt-4"} disabled={isPending}>
                    {
                        isPending ? (<Image src={"./loader.svg"} width={20} height={20} alt={"loader"}/>) : "Submit"
                    }
                </Button>
            </form>
        </DialogContent>
    </Dialog>


}

export default AddProblemForm