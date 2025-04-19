import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../lib/db"
import axios from "axios";

export async function POST(req  : NextRequest) {
    try {
        const {token, submissionId, status, statusId} = await req.json()

        console.log('🔔 Submission Update Received:', { token, submissionId, status });

        if (statusId >= 3) {
            await prisma.submission.update({
                where : {id : submissionId},
                data : {
                    status
                }
            })
            return NextResponse.json({message : "Submission Updated"}, {status : 200});
        }
        else {
            await axios.post(process.env.BACKEND_URL!, {
                token,
                submissionId
            })
            return NextResponse.json({message : "Queueing again"}, {status : 200});
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({message : "Internal Server Error"}, {status : 500});
    }
}