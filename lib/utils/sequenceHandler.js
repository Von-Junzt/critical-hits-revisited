export class Sequence {
    constructor() {
        this.queue = [];
    }

    add(callback) {
        this.queue.push(callback);
        return this;
    }

    async play() {
        const results = [];
        for (const task of this.queue) {
            results.push(await task());
        }
        return results;
    }
}