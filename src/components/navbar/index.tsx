import Link from "next/link";

const Navbar = () => {
    return <nav className={"bg-[#292929] p-3 flex justify-between text-white"}>
        <p>cses</p>
        <Link href={"/login"}>Login</Link>
    </nav>
}

export default Navbar