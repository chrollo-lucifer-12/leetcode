import {getCurrentSession} from "@/lib/cookie";
import Link from "next/link";

const UserButton = async () => {
    const {user} = await getCurrentSession();
    if (!user) return <Link className={"underline"} href={"/auth/login"}>Login</Link>

    return <Link className={"underline"} href={`/user/${user.username}`}>{user.username}</Link>

}

export default UserButton