import Navbar from "@/components/navbar";
import {routes} from "@/lib/definitions";
import Link from "next/link";
import React from "react"
import ProgressBar from "@/components/progress-bar";

const Page = () => {
    return <div className={"w-full flex flex-col justify-center items-center h-full"}>
        <Navbar/>
        <div className={"mt-10 h-full w-[80%]"}>
            <div className="flex justify-center space-x-10">
                {routes.map((route, i) => (
                    <React.Fragment key={i}>
                        <Link className="text-blue-400" href={route.href}>
                            {route.name}
                        </Link>
                        {i < routes.length - 1 && (
                            <div className="border-r border-[#3a3939] h-5"/>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={"border-1 mt-2 border-[#898989]"}></div>
            <div className={"w-[20%]"}>

            <ProgressBar/>
            </div>
        </div>
    </div>
}

export default Page