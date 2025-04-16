import {userDetails} from "@/actions/user";

const Page = async ({params} : {params : { userName : string}}) => {
    const {userName} = await params

    const userInfo = await userDetails(userName);

    if (!userInfo) {
        return <div className={"text-white flex justify-center items-center h-full text-2xl font-bold"}>
            <p>User not found with the username</p>
        </div>
    }

    return <div className={"text-white ml-[400px] mr-[400px]"}>
        <h1 className={"font-bold text-3xl"}>User {userInfo.username}</h1>
        <div className={"w-full border-1 mt-4"}></div>
    </div>
}

export default Page