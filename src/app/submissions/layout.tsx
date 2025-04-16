import React from "react";

const Layout = ({children} : {children : React.ReactNode}) => {
    return <main className={"bg-[#09090b] h-screen"}>
        {children}
    </main>
}

export default Layout