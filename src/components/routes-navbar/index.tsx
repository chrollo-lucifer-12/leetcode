"use client"

import { routes } from "@/lib/definitions";
import React from "react";
import Link from "next/link";

const RoutesNavbar = () => {
    return (
        <nav className="flex flex-wrap justify-center">
            {routes.map((route, i) => (
                <React.Fragment key={i}>
                    <Link
                        className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 font-medium"
                        href={route.href}
                    >
                        {route.name}
                    </Link>
                    {i < routes.length - 1 && (
                        <div className="border-r border-gray-700 mx-2 my-3" />
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}

export default RoutesNavbar