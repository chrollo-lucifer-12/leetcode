interface Bucket {
    count: number;
    refilledAt: number;
}

export class TokenBucketRateLimit<_Key> {
    public max: number;
    public refillIntervalSeconds: number;

    constructor(max: number, refillIntervalSeconds: number) {
        this.max = max;
        this.refillIntervalSeconds = refillIntervalSeconds;
    }

    private storage = new Map<_Key, Bucket>();

    public consume(key: _Key, cost: number): boolean {
        let bucket = this.storage.get(key) ?? null;
        const now = Date.now();
        if (bucket === null) {
            bucket = {
                count: this.max - cost,
                refilledAt: now
            };
            this.storage.set(key, bucket);
            return true;
        }
        const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000));
        bucket.count = Math.min(bucket.count + refill, this.max);
        bucket.refilledAt = bucket.refilledAt + refill * this.refillIntervalSeconds * 1000;
        if (bucket.count < cost) {
            return false;
        }
        bucket.count -= cost;
        this.storage.set(key, bucket);
        return true;
    }
}