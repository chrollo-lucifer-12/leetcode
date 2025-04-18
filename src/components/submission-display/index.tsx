"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {getSubmission} from "@/actions/submissions";
import {ProblemSubmissionProps} from "@/lib/definitions";
import TextEditor from "@/components/text-editor";
import {Button} from "@/components/ui/button";

const SubmissionDisplay = ({submissionId} : {submissionId : string}) => {
    const {data,isFetching} = useQueryData(["problem-submission", submissionId], () => getSubmission(submissionId))

    const submission = data as ProblemSubmissionProps

    return <div className={"text-white"}>
        <p>Problem Name : {submission.problem.title}</p>
        <p>USerName : {submission.user.username}</p>
        <p>Status : {submission.status}</p>
        <p>Language : {submission.language}</p>
        <p>Submission Date : {submission.createdAt.toDateString()}</p>
        <Button onClick={() => {
            navigator.clipboard.writeText(submission.code)
        }}>Copy</Button>
        <TextEditor value={submission.code} isDisabled={true}/>
    </div>
}

export default SubmissionDisplay