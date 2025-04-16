"use client"

import {routes} from "@/lib/definitions";
import React from "react";
import Link from "next/link";

const RoutesNavbar = () => {
    return <div className="flex justify-center space-x-10">
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
}

export default RoutesNavbar