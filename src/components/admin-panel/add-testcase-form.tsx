"use client"

import {useAddTestCase} from "@/hooks/useAddTestCase";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import Image from "next/image";
import {PlusIcon} from "lucide-react";

const AddTestcaseForm = ({problemId} : {problemId : string}) => {
    const {isPending, errors, onFormSubmit, register, res} = useAddTestCase()

    return (<Dialog>
            <DialogTrigger className={"cursor-pointer"}>
                <PlusIcon/>
            </DialogTrigger>
            <DialogContent className={"bg-black"}>
                <DialogHeader className={"text-white"}>
                    <DialogTitle>Add a new problem</DialogTitle>
                </DialogHeader>
                <form onSubmit={onFormSubmit}>
                    <FormGenerator inputType={"input"} register={register} name={"input"} errors={errors}
                                   label={"Input"} placeholder={""}/>
                    <FormGenerator inputType={"input"} register={register} name={"output"} errors={errors}
                                   label={"Output"} placeholder={"Description for problem"}/>
                    <input type="hidden" value={problemId} {...register("problemId")} />
                    {
                        res && res?.success ? (<p className={"text-center text-green-600"}>{res.message}</p>) : (
                            <p className={"text-center text-red-600 font-bold p-1 rounded-md"}> {res?.message}</p>)
                    }
                    <Button type={"submit"} className={"w-full bg-white text-black hover:bg-gray-200 mt-4"}
                            disabled={isPending}>
                        {
                            isPending ? (<Image src={"./loader.svg"} width={20} height={20} alt={"loader"}/>) : "Submit"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTestcaseForm