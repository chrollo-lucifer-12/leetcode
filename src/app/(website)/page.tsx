import Navbar from "@/components/navbar";
import React from "react"
import ProgressBar from "@/components/progress-bar";
import RoutesNavbar from "@/components/routes-navbar";

const Page = () => {
    return <div className={"w-full flex flex-col justify-center items-center h-full"}>
        <Navbar/>
        <div className={"mt-10 h-full w-[80%]"}>
            <RoutesNavbar/>
            <div className={"border-1 mt-2 border-[#898989]"}></div>
            <div className={"w-[20%]"}>
            <ProgressBar/>
            </div>
        </div>
    </div>
}

export default Page