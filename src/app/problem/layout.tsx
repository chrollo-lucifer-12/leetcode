import React from "react";
import Navbar from "@/components/navbar";

const Layout = ({children} : {children : React.ReactNode}) => {
    return <main className={"bg-[#09090b]"}>
        <Navbar/>
        {children}
    </main>
}

export default Layout