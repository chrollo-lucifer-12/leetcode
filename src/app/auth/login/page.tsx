"use client"
import {useLogin} from "@/hooks/useLogin";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Link from "next/link";
import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const Page = () => {

    const {register,onFormSubmit,errors,isPending,res} = useLogin()

    const router = useRouter();

    useEffect(() => {
        if (res && res.success) {
            router.push("/")
        }
    },[res])


    return (
        <form onSubmit={onFormSubmit} className={"w-[30%] flex flex-col gap-y-4 "}>
            <p className={"text-center text-white font-bold text-2xl"}>Welcome To CSES</p>
            <span
                className={"flex gap-x-2 text-white items-center justify-center text-sm"}> <p>Don&apos;t have an account?</p> <Link
                className={"underline"} href={"/auth/signup"}>Signup</Link>  </span>
            <div>
                <FormGenerator inputType={"input"} register={register} name={"username"} errors={errors}
                               placeholder={"Username"} label={"Username"}/>
                <FormGenerator inputType={"input"} register={register} name={"password"} errors={errors}
                               placeholder={"Password"} label={"Password"}/>
            </div>

            {
                res && res?.success ? (<p className={"text-center text-green-600"}>{res.message}</p>) : (
                    <p className={"text-center text-red-600 font-bold p-1 rounded-md"}> {res?.message}</p>)
            }

            <Button disabled={isPending}
                    className={"w-full bg-white text-black hover:bg-gray-100 transition duration-150"}>
                {
                    isPending ? (<Image src={"/loader.svg"} width={20} height={20} alt={"loader"}/>) : "Login"
                }
            </Button>
        </form>
    )
}

export default Page