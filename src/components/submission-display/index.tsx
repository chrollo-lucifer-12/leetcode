"use client"

import { useQueryData } from "@/hooks/useQueryData";
import { getSubmission } from "@/actions/submissions";
import { ProblemSubmissionProps } from "@/lib/definitions";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SubmissionDisplay = ({ submissionId }: { submissionId: string }) => {
    const { data, isFetching } = useQueryData(["problem-submission", submissionId], () => getSubmission(submissionId));
    const router = useRouter();
    const submission = data as ProblemSubmissionProps;

    const getStatusBadge = (status : string) => {
        let bgColor;

        switch (status?.toLowerCase()) {
            case "accepted":
                bgColor = "bg-green-600";
                break;
            case "wrong answer":
                bgColor = "bg-red-600";
                break;
            case "time limit exceeded":
                bgColor = "bg-yellow-600";
                break;
            default:
                bgColor = "bg-gray-600";
        }

        return (
            <span className={`${bgColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {status}
            </span>
        );
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-xl font-medium text-gray-400">Submission not found</h2>
                <Button
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/submissions')}
                >
                    View All Submissions
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8 h-fit">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-white mb-6">Submission Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">Problem</h3>
                                    <button
                                        className="text-blue-400 hover:text-blue-300 font-medium text-lg transition-colors"
                                        onClick={() => router.push(`/problem/${submission.problem.id}`)}
                                    >
                                        {submission.problem.title}
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">User</h3>
                                    <button
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                        onClick={() => router.push(`/user/${submission.user.username}`)}
                                    >
                                        {submission.user.username}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                                    {getStatusBadge(submission.status)}
                                </div>

                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">Language</h3>
                                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm">
                                        {submission.language}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">Submitted</h3>
                                    <p className="text-gray-300">{submission.createdAt.toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-white">Code</h2>
                        <Button
                            onClick={() => navigator.clipboard.writeText(submission.code)}
                            className="bg-gray-700 hover:bg-gray-600 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy Code
                        </Button>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <TextEditor value={submission.code} isDisabled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmissionDisplay;