import React from "react";

const Layout = ({children} : {children : React.ReactNode}) => {
    return <main className={"bg-[#181818] h-screen"}>
        {children}
    </main>
}

export default Layout