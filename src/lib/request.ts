import {headers} from "next/headers";
import {TokenBucketRateLimit} from "./rate-limit"

export const globalBucket = new TokenBucketRateLimit<string>(100,1);

export async function globalGETRateLimit() {
    const clientIP = (await headers()).get("X-Forwarded-For");
    if (clientIP === null) {
        return true;
    }
    return globalBucket.consume(clientIP, 1);
}

export async function globalPOSTRateLimit() {
    const clientIP = (await headers()).get("X-Forwarded-For");
    if (clientIP === null) {
        return true;
    }
    return globalBucket.consume(clientIP, 3);
}