import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    // ✅ Skip for known safe paths (like server-to-server API calls)
    if (request.nextUrl.pathname.startsWith("/api/update-submission") || request.nextUrl.pathname.startsWith("http://localhost:5000")) {
        return NextResponse.next();
    }

    // ✅ Allow GETs
    if (request.method === "GET") {
        return NextResponse.next();
    }

    const originHeader = request.headers.get("Origin");
    const hostHeader = request.headers.get("Host");

    if (originHeader === null || hostHeader === null) {
        return new NextResponse(null, {
            status: 403
        });
    }

    let origin: URL;
    try {
        origin = new URL(originHeader);
    } catch {
        return new NextResponse(null, {
            status: 403
        });
    }

    if (origin.host !== hostHeader) {
        return new NextResponse(null, {
            status: 403
        });
    }

    return NextResponse.next();
}
