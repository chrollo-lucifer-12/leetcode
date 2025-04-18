import { userDetails } from "@/actions/user";
import { getUserSubmission } from "@/actions/submissions";

type Params = Promise<{ userName: string }>;

const Page = async (props: { params: Params }) => {
    const params = await props.params;
    const { userName } = params;

    const userInfo = await userDetails(userName);

    if (!userInfo) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto text-gray-400 mb-4"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-200 mb-2">User Not Found</h2>
                    <p className="text-gray-400">No user exists with username "{userName}"</p>
                </div>
            </div>
        );
    }

    const submissions = await getUserSubmission(userName);

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-200 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                            {userInfo.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl text-white">{userInfo.username}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/*<div className="bg-gray-700 rounded-lg p-4 text-center">*/}
                        {/*    <p className="text-gray-400 text-sm mb-1">Problems Solved</p>*/}
                        {/*    <p className="text-2xl font-bold text-green-400">{userInfo.problemsSolved || 0}</p>*/}
                        {/*</div>*/}

                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <p className="text-gray-400 text-sm mb-1">Total Submissions</p>
                            <p className="text-2xl font-bold text-blue-400">{submissions?.length || 0}</p>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <p className="text-gray-400 text-sm mb-1">Acceptance Rate</p>
                            <p className="text-2xl font-bold text-yellow-400">
                                {submissions?.length
                                    ? Math.round((submissions.filter(s => s.status === "Accepted").length / submissions.length) * 100)
                                    : 0}%
                            </p>
                        </div>
                    </div>
                    <h2 className="text-lg font-medium text-white mb-4">Recent Submissions</h2>
                </div>
            </div>
        </div>
    );
}

export default Page;